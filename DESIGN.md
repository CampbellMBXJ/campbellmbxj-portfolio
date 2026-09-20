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

## Physical television frame

The cabinet, bevelled metal surround, and dark rubber gasket form three distinct
layers around the glass. Their highlights sit above and to the left, with darker
recesses below and to the right. The narrow-screen frame keeps all three layers.

The power and mute buttons have dark Bakelite collars, domed ivory caps, recessed
indicator lenses, and separate momentary and latched depths. Power is slightly
larger; its green indicator and mute's amber indicator follow their pressed state.
Printed legends sit directly on the panel, with a raised CMB manufacturer badge.

The tuner retains a native range input for pointer, touch, and keyboard operation.
Its ridged thumb has a centre index line above a narrow recessed slot. The printed
scale is inset by half the thumb width so its four ticks align with the actual
stopping positions, including both ends. Keep those dimensions coupled.

Both hardware panels use the same finish and edge treatment as the bezel. Small
recessed screw heads have varied slot angles. The speaker's twelve openings clip
a continuous dark cone and woven cloth backing; neither crosses the metal face.

`public/images/hardware-walnut.webp` and `hardware-satin-metal.webp` are generated
material swatches, downscaled to 1024×1024 and compressed as WebP (about 242 KiB
combined). The walnut uses quiet vertical grain; the satin metal uses fine
horizontal brushing. They replace the old frame texture references. Source PNGs
were retained outside the repository. CSS repeats the walnut at 680px and metal
at 320px to keep grain scale stable across viewports; lighting and bevels are
separate CSS layers. Avoid stretching either texture to cover the entire frame.

All controls retain keyboard operation. The channel guide and detail panels share
focus trapping, background isolation, and focus restoration. Gallery images have
a dedicated keyboard-accessible full-size action so offscreen carousel clones do
not add invisible tab stops.

Use [QA.md](QA.md) for verification evidence. When changing the design, inspect both
desktop and mobile screenshots as well as interactions; a passing browser test
alone does not establish that the result still feels like a CRT television.
