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
  expect(runtimeErrors.get(page), "browser runtime and console errors").toEqual([]);
});

test("all channels navigate and wrap through the header", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "CAMPBELL MERCER" })).toBeVisible();
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
  await expect(page.getByRole("heading", { name: "CAMPBELL MERCER" })).toBeVisible();
});

test("project modal, images, carousel and browser history", async ({ page }) => {
  await page.goto("/projects");
  await page.getByRole("heading", { name: "My Moola", exact: true }).click();
  await expect(page).toHaveURL(/#my-moola$/);
  await expect(page.getByText("PRESS [ESC] TO CLOSE")).toBeVisible();
  const image = page.locator(".slide.selected img").first();
  await expect.poll(() => image.evaluate((node: HTMLImageElement) => node.complete && node.naturalWidth > 0)).toBe(true);
  await expect(image).toHaveAttribute("src", /accounts/);
  await page.getByTitle("next slide / item").click();
  await expect(image).toHaveAttribute("src", /account-transactions/);
  await page.getByTitle("previous slide / item").click();
  await expect(image).toHaveAttribute("src", /accounts/);
  await page.keyboard.press("Escape");
  await expect(page.getByText("PRESS [ESC] TO CLOSE")).toHaveCount(0);
  await expect(page).toHaveURL(/\/projects$/);
  await page.goBack();
  await expect(page.getByText("PRESS [ESC] TO CLOSE")).toBeVisible();
  await page.locator('[class*="close-btn"]').first().click();
  await expect(page.getByText("PRESS [ESC] TO CLOSE")).toHaveCount(0);
});

test("project and work deep links open after reload", async ({ page }) => {
  await page.goto("/projects#logicraft");
  await expect(page.getByText("PRESS [ESC] TO CLOSE")).toBeVisible();
  await expect(page.locator(".slide.selected img").first()).toHaveAttribute("src", /uc_hackathon/);
  await page.reload();
  await expect(page.getByText("PRESS [ESC] TO CLOSE")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page).toHaveURL(/\/projects$/);
  await page.goto("/work#senior-associate-software-engineer");
  await expect(page.getByText("PRESS [ESC] TO CLOSE")).toBeVisible();
  await expect(page.getByText("Delivered end-to-end features", { exact: false })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByText("PRESS [ESC] TO CLOSE")).toHaveCount(0);
  await page.getByRole("heading", { name: "MetaSwitch - Software Engineer Intern", exact: true }).click();
  await expect(page).toHaveURL(/#software-engineer-intern$/);
  await expect(page.getByText("At MetaSwitch", { exact: false })).toBeVisible();
  await page.evaluate(() => { window.location.hash = "unknown-work"; });
  await expect(page.getByText("PRESS [ESC] TO CLOSE")).toHaveCount(0);
  await page.goBack();
  await expect(page.getByText("At MetaSwitch", { exact: false })).toBeVisible();
});

test("power, mute and channel slider preserve state during navigation", async ({ page, isMobile }) => {
  test.skip(isMobile, "TV control panel is intentionally hidden on small screens.");
  await page.goto("/");
  const controls = page.locator('input[type="button"]');
  const screen = page.locator('[class*="screen__animated"]').first();
  const muteIcon = page.locator("header svg");
  await controls.nth(1).click();
  await expect(muteIcon).toHaveCount(1);
  const slider = page.getByRole("slider");
  await slider.focus();
  await slider.press("ArrowRight");
  await expect(page).toHaveURL(/\/who$/);
  await expect(slider).toHaveValue("2");
  await expect(muteIcon).toHaveCount(1);
  await controls.nth(0).click();
  await expect(screen).toHaveClass(/screen__animated--off/);
  await expect.poll(() => screen.evaluate((node) => getComputedStyle(node).transform)).toBe("matrix(0, 0, 0, 0.02, 0, 0)");
  await controls.nth(0).click();
  await expect(screen).not.toHaveClass(/screen__animated--off/);
  await expect.poll(() => screen.evaluate((node) => getComputedStyle(node).transform)).toBe("matrix(1, 0, 0, 1, 0, 0)");
  await controls.nth(1).click();
  await expect(muteIcon).toHaveCount(0);
});

test("direct routes, media, resume and responsive layout", async ({ page, request }) => {
  for (const route of ["/", "/who", "/projects", "/work"]) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("footer").getByText("RESUME", { exact: true })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await expect.poll(() => page.locator('[class*="screen__rainbow"]').evaluate((node) => Number(getComputedStyle(node).opacity))).toBeCloseTo(0.04, 2);
  }
  for (const path of ["/documents/resume.pdf", "/audio/crt_static.wav", "/images/headshot.webm", "/images/cmb-logo.svg"]) {
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    expect((await response.body()).length).toBeGreaterThan(0);
  }
  await page.goto("/who");
  // WebKit pauses autoplay video when it is outside the visible viewport.
  await page.locator("video").scrollIntoViewIfNeeded();
  await expect.poll(() => page.locator("video").evaluate((video: HTMLVideoElement) => video.readyState)).toBeGreaterThanOrEqual(2);
  await expect.poll(() => page.locator("video").evaluate((video: HTMLVideoElement) => video.currentTime)).toBeGreaterThan(0);
});

test("404 offers a working route home", async ({ page }) => {
  const response = await page.goto("/missing-channel");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "404 - CHANNEL NOT FOUND" })).toBeVisible();
  await page.getByText("CHANNEL 01", { exact: true }).click();
  await expect(page.getByRole("heading", { name: "CAMPBELL MERCER" })).toBeVisible();
});
