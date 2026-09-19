# QA — 2026-09-18

## Architectural rework

Reorganized application code into route entry points, project/work features,
the persistent TV shell, shared UI, routing utilities, and global styles under
`src/`. See [ARCHITECTURE.md](ARCHITECTURE.md) for ownership and extension rules.
pnpm 12.4.2 and TypeScript 7.0.2 remain in use; dependency versions and the lockfile
are unchanged by this refactor.

| Check | Result |
| --- | --- |
| `pnpm install --frozen-lockfile` | Passed |
| `pnpm exec tsc --version` | 7.0.2 |
| `pnpm lint` | Passed, zero warnings |
| `pnpm typecheck` | Passed |
| `pnpm build` | Passed, all routes prerendered |
| `pnpm test:e2e --workers=2` | 39 passed, 1 intentionally skipped |
| `pnpm audit --json` | Zero reported vulnerabilities |
| Import-boundary probes | All six representative forbidden imports rejected by ESLint |
| Extracted project/work content | Exact match with the previous commit, excluding added explicit slugs |
| Development smoke checks | Passed in Chromium and WebKit, with no runtime/console errors |
| Audio instrumentation | Decoded audio starts on active transitions, remains suppressed during muted/powered-off transitions, resumes after power-on |
| `git diff --check` | Passed |

The production suite runs the original regression cases plus checks for all 11
published modal URLs, preserved query strings, keyboard channel/carousel
controls, focus trapping/restoration, inert background controls, backdrop
dismissal, and cancellation of an old modal's delayed close after the selection
changes. It runs in Chromium, Firefox, desktop WebKit, and iPhone-sized WebKit.
The one skipped case exercises the TV control panel that is intentionally hidden
on mobile; all desktop engines exercise it.

Development checks cover the four main routes, both modal deep links, Strict
Mode cleanup, focus restoration, and subsequent client-side navigation. Audio
checks instrument Web Audio source starts in Chromium rather than assessing
sound by ear.

Captured the pre-refactor and final production app at 1440×1000 and 390×844 on
the four main routes, both modal views, and the 404 page. All 228 measured
elements across 14 views match within 0.5px. Inspected desktop/mobile screenshots
of the home and modal layouts. Animated CRT noise varies between captures, so
this is a layout comparison, not a pixel-identical assertion.

Intentional behavior improvements include native keyboard-operable controls,
visible focus, modal focus isolation/restoration, and an explicit UNKNOWN label
on the 404 channel. Existing route paths, modal hashes, content, and TV styling
are preserved. No regressions were detected in the tested workflows. Physical
mobile devices, subjective audio quality, and screen-reader interaction were
not tested; the video autoplay-policy limitation below still applies.

## Earlier dependency upgrade and pnpm migration

All retained direct dependencies were checked against the npm registry's stable
`latest` tags. The original dependency upgrade refreshed the Yarn lockfile within
transitive dependency constraints. The subsequent pnpm migration imported those
resolutions into `pnpm-lock.yaml` and removed `yarn.lock`. The unused `file-loader`
dependency and Webpack rule were removed.

Major upgrades include Next.js 16.3.5, React 19.3.0, Framer Motion 13.4.0,
ESLint 10.11.0, Sass 1.104.1, and the TypeScript 7.0.2 compiler. See README.md
for the TypeScript compiler-API alias and ESLint compatibility configuration.

### Results

| Check | Result |
| --- | --- |
| Original app build, lint, and type check | Passed before the upgrade |
| Clean `pnpm install --frozen-lockfile` | Passed with the old install/build moved aside |
| `pnpm exec tsc --version` | 7.0.2 |
| `pnpm lint` | Passed, zero warnings |
| `pnpm typecheck` | Passed using TypeScript 7 |
| `pnpm build` | Passed, all routes prerendered |
| `pnpm test:e2e --workers=2` | 23 passed, 1 intentionally skipped |
| `pnpm audit --json` | Zero reported vulnerabilities |
| Development-mode browser smoke check during the dependency upgrade | No runtime or console errors across the four main routes and modal deep links |
| `git diff --check` | Passed |

The browser suite runs in Chromium, Firefox, desktop WebKit, and iPhone-sized
WebKit. It covers channel navigation and wraparound, browser history, project
and work modal deep links/reloads, native hash changes, carousel navigation and
image loading, Escape/close-button dismissal, power and mute state, the channel
slider, video playback, media/resume delivery, responsive overflow, and 404
recovery. Every test also checks for browser runtime/console errors. The mobile
TV-controls test is skipped because that panel is intentionally hidden at the
mobile breakpoint; all three desktop engines test those controls.

Video checks assert the autoplay, muted, and inline-playback configuration and
explicitly start playback to verify decoding. Automatic startup timing is not
asserted because headless WebKit applied its autoplay policy inconsistently.

### Visual comparison

Captured the original and upgraded production app at 1440×1000 and 390×844 on
the four main routes, project/work modal deep links, and the 404 page. Compared
element bounds across all 14 views and inspected desktop/mobile modal captures.
The measured layout matches, except carousel images now fit their positioned
30rem wrapper: the original image extended into the enclosing list item's
0.8rem padding. Modal and surrounding content bounds are unchanged. Animated
CRT noise varies between captures, so this was not a pixel-identical comparison.

No functional regressions were detected in the tested workflows. These checks
use browser emulation, not physical mobile devices or subjective audio playback.

### Compatibility notes

- Node.js 24 or newer is required; `.nvmrc` selects Node 24.
- Next's older ESLint plugin peer ranges still produce installation warnings;
  the compatibility utility and parser configuration pass the full lint check.
- The Next 16.3.5 development route indicator is disabled to avoid its Pages
  Router initialization race. Compile/runtime error reporting remains active.
- Added `playsInline` for muted video autoplay on mobile Safari.
- pnpm 12.4.2 is now pinned in `package.json`; `pnpm-lock.yaml` and
  `pnpm-workspace.yaml` are tracked as part of the separate package-manager migration.
