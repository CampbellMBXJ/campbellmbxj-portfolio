import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error" && !message.text().includes("404")) {
      errors.push(message.text());
    }
  });
  // Register before navigation so hydration errors are included.
  runtimeErrors.set(page, errors);
});

const runtimeErrors = new WeakMap<object, string[]>();

test.afterEach(async ({ page }) => {
  expect(runtimeErrors.get(page), "browser runtime and console errors").toEqual(
    [],
  );
});

test("all channels navigate and wrap through the header", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "CAMPBELL MERCER" }),
  ).toBeVisible();
  await page.getByText("ABOUT ME", { exact: true }).click();
  await expect(page).toHaveURL(/\/who$/);
  await expect(page.getByText("CHANNEL: 02 WHO")).toBeVisible();
  await page.getByText("Projects", { exact: true }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await page.locator("header").getByText("▲", { exact: true }).click();
  await expect(page).toHaveURL(/\/work$/);
  await expect(page.getByText("CHANNEL: 04 WORK")).toBeVisible();
  await page.locator("header").getByText("▲", { exact: true }).click();
  await expect(page).toHaveURL(/:\d+\/$/);
  await page.locator("header").getByText("▼", { exact: true }).click();
  await expect(page).toHaveURL(/\/work$/);
  await page.goBack();
  await expect(
    page.getByRole("heading", { name: "CAMPBELL MERCER" }),
  ).toBeVisible();
});

test("project modal, images, carousel and browser history", async ({
  page,
}) => {
  await page.goto("/projects");
  await page.getByRole("heading", { name: "My Moola", exact: true }).click();
  await expect(page).toHaveURL(/#my-moola$/);
  await expect(page.getByRole("dialog")).toBeVisible();
  const image = page.locator(".slide.selected img").first();
  await expect
    .poll(() =>
      image.evaluate(
        (node: HTMLImageElement) => node.complete && node.naturalWidth > 0,
      ),
    )
    .toBe(true);
  await expect(image).toHaveAttribute("src", /accounts/);
  await page.getByTitle("next slide / item").click();
  await expect(image).toHaveAttribute("src", /account-transactions/);
  await page.getByTitle("previous slide / item").click();
  await expect(image).toHaveAttribute("src", /accounts/);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page).toHaveURL(/\/projects$/);
  await page.goBack();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.locator('[class*="close-btn"]').first().click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("project and work deep links open after reload", async ({ page }) => {
  await page.goto("/projects#logicraft");
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.locator(".slide.selected img").first()).toHaveAttribute(
    "src",
    /uc_hackathon/,
  );
  await page.reload();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page).toHaveURL(/\/projects$/);
  await page.goto("/work#senior-associate-software-engineer");
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(
    page.getByText("Delivered end-to-end features", { exact: false }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page
    .getByRole("link", { name: "View Software Engineer Intern", exact: true })
    .click();
  await expect(page).toHaveURL(/#software-engineer-intern$/);
  await expect(page.getByText("At MetaSwitch", { exact: false })).toBeVisible();
  await page.evaluate(() => {
    window.location.hash = "unknown-work";
  });
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.goBack();
  await expect(page.getByText("At MetaSwitch", { exact: false })).toBeVisible();
});

test("power, mute and channel slider preserve state during navigation", async ({
  page,
  isMobile,
}) => {
  test.skip(
    isMobile,
    "TV control panel is intentionally hidden on small screens.",
  );
  await page.goto("/");
  const controls = page.locator('input[type="button"]');
  const screen = page.locator('[class*="screen__animated"]').first();
  const muteIcon = page.locator("header svg");
  await expect(controls.nth(0)).toHaveAttribute("aria-pressed", "true");
  await controls.nth(1).click();
  await expect(controls.nth(1)).toHaveAttribute("aria-pressed", "true");
  await expect(muteIcon).toHaveCount(1);
  const slider = page.getByRole("slider");
  await slider.focus();
  await slider.press("ArrowRight");
  await expect(page).toHaveURL(/\/who$/);
  await expect(slider).toHaveValue("2");
  await expect(muteIcon).toHaveCount(1);
  await controls.nth(0).click();
  await expect(controls.nth(0)).toHaveAttribute("aria-pressed", "false");
  await expect(screen).toHaveClass(/screen__animated--off/);
  await expect
    .poll(() => screen.evaluate((node) => getComputedStyle(node).transform))
    .toBe("matrix(0, 0, 0, 0.02, 0, 0)");
  await controls.nth(0).click();
  await expect(screen).not.toHaveClass(/screen__animated--off/);
  await expect
    .poll(() => screen.evaluate((node) => getComputedStyle(node).transform))
    .toBe("matrix(1, 0, 0, 1, 0, 0)");
  await controls.nth(1).click();
  await expect(muteIcon).toHaveCount(0);
  await expect(controls.nth(1)).toHaveAttribute("aria-pressed", "false");

  // Aim at the printed scale, not an arbitrary fraction of the track. The
  // end marks must account for the thumb's width in every browser engine.
  const stops = page.locator('[class*="range-slider__stop"][data-selected]');
  for (const channel of [1, 2, 3, 4, 2]) {
    const mark = await stops.nth(channel - 1).boundingBox();
    const track = await slider.boundingBox();
    if (!mark || !track) throw new Error("Channel tuner is not visible");
    await page.mouse.click(mark.x + mark.width / 2, track.y + track.height / 2);
    await expect(slider).toHaveValue(String(channel));
    await expect(page).toHaveURL(
      new RegExp(`/${["", "who", "projects", "work"][channel - 1]}$`),
    );
  }
  await slider.press("End");
  await expect(slider).toHaveValue("4");
  await slider.press("ArrowRight");
  await expect(slider).toHaveValue("4");
  await slider.press("Home");
  await expect(slider).toHaveValue("1");
  await slider.press("ArrowLeft");
  await expect(slider).toHaveValue("1");
  await expect(page).toHaveURL(/:\d+\/$/);
});

test("direct routes, media, resume and responsive layout", async ({
  page,
  request,
}) => {
  for (const route of ["/", "/who", "/projects", "/work"]) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("main")).toBeVisible();
    await expect(
      page.locator("footer").getByText("RESUME", { exact: true }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await expect
      .poll(() =>
        page
          .locator('[class*="screen__rainbow"]')
          .evaluate((node) => Number(getComputedStyle(node).opacity)),
      )
      .toBeCloseTo(0.04, 2);
  }
  for (const path of [
    "/documents/resume.pdf",
    "/audio/crt_static.wav",
    "/images/headshot.webm",
    "/images/cmb-logo.svg",
    "/images/hardware-walnut.webp",
    "/images/hardware-satin-metal.webp",
  ]) {
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    expect((await response.body()).length).toBeGreaterThan(0);
  }
  await page.goto("/who");
  const video = page.locator("video");
  await video.scrollIntoViewIfNeeded();
  await expect(video).toHaveJSProperty("autoplay", true);
  await expect(video).toHaveJSProperty("muted", true);
  await expect(video).toHaveAttribute("playsinline", "");
  await expect
    .poll(() => video.evaluate((node: HTMLVideoElement) => node.readyState))
    .toBeGreaterThanOrEqual(2);
  // Autoplay policy varies in headless WebKit. Verify decoding/playback explicitly
  // after checking the autoplay configuration, rather than relying on its timing.
  await video.evaluate((node: HTMLVideoElement) => node.play());
  await expect
    .poll(() => video.evaluate((node: HTMLVideoElement) => node.currentTime))
    .toBeGreaterThan(0);
});

test("404 offers a working route home", async ({ page }) => {
  const response = await page.goto("/missing-channel");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "404 - CHANNEL NOT FOUND" }),
  ).toBeVisible();
  await page.getByText("CHANNEL 01", { exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "CAMPBELL MERCER" }),
  ).toBeVisible();
});

test("all published modal URLs retain their content", async ({ page }) => {
  const links = [
    ["projects", "my-moola", "My Moola"],
    ["projects", "logicraft", "LogiCraft"],
    ["projects", "travelea", "TravelEA"],
    ["projects", "sm-compiler", "Sm Compiler"],
    [
      "projects",
      "enriched-text-grafana-plugin",
      "Enriched Text Grafana Plugin",
    ],
    [
      "work",
      "senior-software-engineer-(tech-lead)",
      "Senior software engineer (Tech lead)",
    ],
    [
      "work",
      "senior-associate-software-engineer",
      "Senior Associate Software Engineer",
    ],
    [
      "work",
      "development-team-lead-and-director",
      "Development Team Lead and Director",
    ],
    ["work", "associate-software-engineer", "Associate Software Engineer"],
    ["work", "software-engineer-intern", "Software Engineer Intern"],
    ["work", "scrum-master-and-tutor", "Scrum Master and Tutor"],
  ];
  for (const [route, slug, title] of links) {
    await page.goto(`/${route}#${slug}`);
    await expect(
      page.getByRole("dialog", { name: title, exact: true }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
});

test("modal keyboard focus stays inside and returns to its trigger", async ({
  page,
}) => {
  await page.goto("/projects?source=keyboard");
  const trigger = page.getByRole("link", {
    name: "View My Moola",
    exact: true,
  });
  await trigger.focus();
  await trigger.press("Enter");
  const dialog = page.getByRole("dialog", { name: "My Moola", exact: true });
  await expect(dialog).toBeFocused();
  await expect(page).toHaveURL(/\/projects\?source=keyboard#my-moola$/);
  // Background navigation is unavailable while the dialog is active.
  const nextChannel = page.getByRole("button", { name: "Next channel" });
  await nextChannel.evaluate((node: HTMLButtonElement) => node.focus());
  await expect(dialog).toBeFocused();
  expect(
    await nextChannel.evaluate((node) => node.closest("[inert]") !== null),
  ).toBe(true);
  await page.keyboard.press("Tab");
  const close = dialog.getByRole("button", { name: "Close dialog" });
  await expect(close).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect
    .poll(() =>
      dialog.evaluate((node) => node.contains(document.activeElement)),
    )
    .toBe(true);
  await expect(close).not.toBeFocused();
  await page.keyboard.press("Tab");
  await expect(close).toBeFocused();
  await dialog
    .getByRole("button", { name: "slide item 2", exact: true })
    .press("Space");
  await expect(dialog.locator(".slide.selected img").first()).toHaveAttribute(
    "src",
    /account-transactions/,
  );
  await dialog
    .getByRole("button", { name: "next slide / item", exact: true })
    .press("Enter");
  await expect(dialog.locator(".slide.selected img").first()).toHaveAttribute(
    "src",
    /insights/,
  );
  await page.keyboard.press("Escape");
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await expect(page).toHaveURL(/\/projects\?source=keyboard$/);
  await expect(
    page.getByRole("button", { name: "Next channel" }),
  ).toBeVisible();

  await page.goto("/work");
  const workTrigger = page.getByRole("link", {
    name: "View Software Engineer Intern",
    exact: true,
  });
  await workTrigger.click();
  await expect(
    page.getByRole("dialog", { name: "Software Engineer Intern", exact: true }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Close dialog" }).click();
  await expect(workTrigger).toBeFocused();
});

test("backdrop dismissal and history changes clean up closing modals", async ({
  page,
}) => {
  await page.goto("/projects");
  await page.getByRole("link", { name: "View My Moola", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  const backdrop = dialog.locator("..");
  const bounds = await backdrop.boundingBox();
  // The CRT backdrop has curved corners. Click its visible top edge rather
  // than a point outside the rounded screen's hit area.
  await backdrop.click({ position: { x: bounds!.width / 2, y: 2 } });
  await expect(dialog).toHaveCount(0);
  await expect(page).toHaveURL(/\/projects$/);
  await page.goBack();
  await expect(dialog).toBeVisible();
  // Change the selection during the old modal's closing animation. Its delayed
  // close must be cancelled when it unmounts, leaving the new selection intact.
  await page.keyboard.press("Escape");
  await page.evaluate(() => {
    window.location.hash = "logicraft";
  });
  await expect(
    page.getByRole("dialog", { name: "LogiCraft", exact: true }),
  ).toBeVisible();
  await page.waitForTimeout(1200);
  await expect(page).toHaveURL(/#logicraft$/);
  await expect(
    page.getByRole("dialog", { name: "LogiCraft", exact: true }),
  ).toBeVisible();
  await page.evaluate(() => {
    window.location.hash = "unknown-project";
  });
  await expect(dialog).toHaveCount(0);
  await page.getByRole("button", { name: "Next channel" }).click();
  await expect(page).toHaveURL(/\/work$/);
});

test("channel buttons support keyboard navigation and unknown routes", async ({
  page,
  isMobile,
}) => {
  await page.goto("/missing-channel");
  await expect(
    page.getByText("CHANNEL: UNKNOWN", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Previous channel" }).press("Enter");
  await expect(page).toHaveURL(/\/work$/);
  await page.getByRole("button", { name: "Next channel" }).press("Space");
  await expect(page).toHaveURL(/:\d+\/$/);
  if (!isMobile) {
    await expect(page.getByRole("slider", { name: "Channel" })).toHaveAttribute(
      "aria-valuetext",
      "01 HOME",
    );
    await expect(
      page.getByRole("button", { name: "POWER", exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    const mute = page.getByRole("button", { name: "MUTE", exact: true });
    await mute.press("Space");
    await expect(mute).toHaveAttribute("aria-pressed", "true");
    await page.getByRole("button", { name: "Next channel" }).press("Enter");
    await expect(page).toHaveURL(/\/who$/);
    await expect(mute).toHaveAttribute("aria-pressed", "true");
    await expect(
      page.getByRole("img", { name: "Muted", exact: true }),
    ).toBeVisible();
  }
});

test("channel guide selects routes, restores focus and stays reachable after scrolling", async ({
  page,
}) => {
  await page.goto("/");
  const guideButton = page.getByRole("button", { name: "Open channel guide" });
  await guideButton.press("Enter");
  const guide = page.getByRole("dialog", {
    name: "Channel guide",
    exact: true,
  });
  await expect(guide).toBeFocused();
  await expect(guide.locator('a[aria-current="page"]')).toContainText("HOME");
  await guide.getByRole("link").filter({ hasText: "PROJECTS" }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(guide).toHaveCount(0);
  const top = await guideButton.evaluate(
    (node) => node.getBoundingClientRect().top,
  );
  await page.locator('[class*="screen__container"]').evaluate((node) => {
    node.scrollTop = node.scrollHeight;
  });
  await expect(guideButton).toBeInViewport();
  expect(
    Math.abs(
      (await guideButton.evaluate((node) => node.getBoundingClientRect().top)) -
        top,
    ),
  ).toBeLessThan(2);
  await guideButton.click();
  await expect(guide).toBeVisible();
  await expect(guide.locator('a[aria-current="page"]')).toContainText(
    "PROJECTS",
  );
  await page.keyboard.press("Escape");
  await expect(guide).toHaveCount(0);
  await expect(guideButton).toBeFocused();
  await guideButton.click();
  await guide.getByRole("link").filter({ hasText: "ABOUT" }).press("Enter");
  await expect(page).toHaveURL(/\/who$/);
  await expect(guide).toHaveCount(0);
  await expect
    .poll(() =>
      page
        .locator('[class*="screen__container"]')
        .evaluate((node) => node.scrollTop),
    )
    .toBe(0);
});

test("gallery counter and full-size link follow the selected screenshot", async ({
  page,
}) => {
  await page.goto("/projects#my-moola");
  const dialog = page.getByRole("dialog", { name: "My Moola", exact: true });
  await expect(dialog.getByText("01 / 06", { exact: true })).toBeVisible();
  await dialog
    .getByRole("button", { name: "next slide / item", exact: true })
    .click();
  await expect(dialog.getByText("02 / 06", { exact: true })).toBeVisible();
  const fullSize = dialog.getByRole("link", {
    name: "View screenshot full size in a new tab",
  });
  await expect(fullSize).toHaveAttribute("href", /account-transactions\.png$/);
  const popupPromise = page.waitForEvent("popup");
  await fullSize.press("Enter");
  const popup = await popupPromise;
  await popup.waitForLoadState();
  await expect(popup).toHaveURL(
    /\/images\/projects\/my-moola\/account-transactions\.png$/,
  );
  await expect
    .poll(() =>
      popup
        .locator("img")
        .first()
        .evaluate(
          (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
        ),
    )
    .toBe(true);
  await popup.close();
  await expect(dialog).toBeVisible();
});

test("detail panel keeps its title visible and offers a mobile close action", async ({
  page,
  isMobile,
}) => {
  await page.goto("/work#senior-associate-software-engineer");
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  const title = dialog.getByRole("heading", {
    name: "Senior Associate Software Engineer",
    exact: true,
  });
  await dialog.locator('[class*="crt-modal__body"]').evaluate((node) => {
    node.scrollTop = node.scrollHeight;
  });
  await expect(title).toBeInViewport();
  await expect(
    dialog.getByRole("button", { name: "Close dialog", exact: true }),
  ).toBeInViewport();
  if (isMobile) {
    await expect(dialog.getByText("PRESS [ESC] TO CLOSE")).toBeHidden();
    await dialog.getByRole("button", { name: "BACK TO CHANNEL" }).click();
    await expect(dialog).toHaveCount(0);
    await expect(page).toHaveURL(/\/work$/);
  }
});
