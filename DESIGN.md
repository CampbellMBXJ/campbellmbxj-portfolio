# CRT design direction

The television character takes priority over making this a conventional portfolio.
Keep the wood cabinet, brushed-metal surround, curved screen, broadcast font,
chromatic edges, scanlines, interference, and physical controls. Readability
improvements should tune these effects, not remove the visual identity.

## Current treatment

- Headings and channel labels retain strong colour separation. Reading copy uses
  slightly softer RGB shadows, tighter tracking, and more generous line spacing.
- Detail panels use dark scanlined surfaces, phosphor-green headings, cyan rules,
  pink close controls, and small television colour bars. Their title and close
  control stay visible while the body scrolls.
- Project cards use existing screenshots or typographic test-card graphics.
  Work experience uses a chronological broadcast-schedule treatment with company,
  role, date, and technologies at different visual levels.
- The channel label opens a four-channel guide. The header stays visible during
  scrolling; selecting another channel resets the shared screen's scroll position.
  Modal hash changes preserve the underlying scroll position.
- Galleries provide a readable frame counter and a full-size image link that
  opens in a new tab. Portrait project galleries can sit beside the description
  on larger screens via the feature data's `imageLayout` field.
- Power and mute controls have illuminated indicators and depressed states.
  The shell supplies their colours to the shared button component.
- The cabinet is slightly slimmer on narrow screens. Mobile detail panels offer
  a visible “BACK TO CHANNEL” action instead of the desktop Escape instruction.
- Power-on/off retains its cinematic 1.5-second CRT collapse/unfold. Routine channel
  transitions take 400ms; detail panels open in 400ms and close in 240ms.

All controls retain keyboard operation. The channel guide and detail panels share
focus trapping, background isolation, and focus restoration. Gallery images have
a dedicated keyboard-accessible full-size action so offscreen carousel clones do
not add invisible tab stops.

Use [QA.md](QA.md) for verification evidence. When changing the design, inspect both
desktop and mobile screenshots as well as interactions; a passing browser test
alone does not establish that the result still feels like a CRT television.
