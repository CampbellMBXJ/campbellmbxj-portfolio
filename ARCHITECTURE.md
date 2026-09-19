# Application architecture

The app retains Next.js Pages Router and its existing public routes. Application
code lives in `src/`; static assets stay in `public/`. Tests and tool configuration
remain at the repository root.

```text
src/
  pages/                   Route entry points and page composition
  features/
    projects/              Project model, content, tiles, modal, gallery
    work/                  Work model, content, tiles, modal
  components/
    tv-shell/              Persistent television frame and its behavior
    ui/                    Shared visual controls and modal mechanics
  routing/                 URL synchronization used by route entry points
  styles/                  Global tokens, base styles, shared Sass mixins
```

## Responsibilities

| Area | Owns | Does not own |
| --- | --- | --- |
| `pages` | Route composition, URL selection, browser history | Feature data/models, reusable controls |
| `features/projects` and `features/work` | Their content, types, and presentation | Routing, TV state, other features |
| `components/tv-shell` | Frame, channel registry/navigation, power/mute state, transition audio, header/footer | Project/work content |
| `components/ui` | Reusable controls and their styling/interaction | Routes, feature content, TV state |
| `routing` | Shared browser URL subscription | Feature rendering |

A **page** is a Next route entry point. It selects content from the URL and
composes components. A **feature component** presents one domain's content and
receives data and callbacks through props. A **shared UI component** is reusable
without knowing which page or feature uses it. A component does not become
shared merely because it renders HTML: the project gallery belongs to projects,
and the channel header belongs to the TV shell.

Home and biography markup remain in their pages because they are small,
route-specific compositions. Extract them only when a separate responsibility
or actual reuse emerges.

## Dependencies and state

Imports flow from pages to features/shared UI, and from the shell to shared UI.
ESLint rejects imports back into pages, feature-to-feature imports, routing in
feature/shared components, and feature imports in the shell. Use `@/` for imports
across areas and relative paths for neighboring files. Import the owning file
directly; avoid barrel files that obscure boundaries.

`_app.tsx` installs one persistent `TvShell`. Its provider owns power and mute
state, which survives client-side navigation. The ordered `channels.ts` registry
defines labels, URLs, slider bounds, and next/previous navigation. Audio is
created lazily on the client and released when its owning screen unmounts.

Project/work selection lives in the URL hash. Pages use `useUrlHash` to subscribe
to both Next navigation and native history changes, then pass the selected item
and an `onClose` callback to their feature modal. Explicit slugs are public URL
identifiers: changing display titles must not change those slugs. Unknown hashes
leave the page visible without a modal. Opening/closing preserves query strings.

`CrtModal` owns focus entry/restoration, keyboard trapping, background `inert`
state, and the closing animation. It stays inside the TV's transformed frame to
preserve positioning. It cancels delayed close callbacks when unmounted, so an
old selection cannot dismiss a newer one. Feature modals supply accessible
heading IDs, titles, and content; they do not implement modal mechanics. The TV
shell's channel guide uses the same modal and remains outside the header's DOM
element so its own header/footer have valid structure. Screen stacking rules keep
both kinds of panel above the sticky channel header.

## Styling and extension

Keep component styles beside their component in a CSS module. Global styles
contain base typography, resets, common text treatments, and design tokens.
Range-input rules belong to the range slider; work list spacing belongs to work
content; carousel slide spacing belongs to the project gallery. Vendor carousel
CSS is loaded once by `_app.tsx`, as required for global CSS in Pages Router.

- Add a project or job in its feature's data file with a unique, permanent slug.
- Add a channel by creating its page and updating the ordered channel registry.
  Navigation and slider bounds then use the same source of truth.
- Put domain-specific components with their feature. Promote a control to `ui`
  when it has an independent, reusable interface.
- Preserve native link/button/input semantics and visible keyboard focus when
  extending the CRT styling.

Run `pnpm lint`, `pnpm typecheck`, `pnpm build`, then `pnpm test:e2e`. The browser
suite covers all published modal URLs, history, keyboard/focus behavior, channel
controls, media, and responsive layout in four browser configurations. See
[QA.md](QA.md) for the latest verification evidence and limits.
