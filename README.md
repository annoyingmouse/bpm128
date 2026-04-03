# bpm-glyph

A web component that renders characters on a **16-segment alphanumeric display** — the next step up from the 7-segment displays found on basic calculators. 7-segment can only render digits and a handful of letters convincingly; 16-segment can render the full alphabet legibly.

## Display type

The 16 segments break down as:

| Segments | Labels | Role |
|---|---|---|
| 2 top bars (left/right) | `a1`, `a2` | top bar |
| 2 bottom bars (left/right) | `d1`, `d2` | bottom bar |
| 2 middle bars (left/right) | `g1`, `g2` | middle bar |
| 4 outer verticals | `f`, `e`, `b`, `c` | upper/lower on each side |
| 2 center verticals | `i`, `l` | upper/lower center |
| 4 diagonal braces | `h`, `j`, `k`, `m` | inner diagonals |

It is also sometimes called a **starburst display** or **Union Jack display** — the diagonals resemble a Union Jack when all segments are lit.

What makes this design distinctive is the **angled chevron shape** of the top and bottom bars, and the way the outer columns taper — rather than uniform rectangular bars, the segments have a diamond/hexagonal geometry. That style is characteristic of **vacuum fluorescent displays (VFDs)** from the late 1970s and 80s, found on hi-fi equipment, car dashboards, VCRs, and early computer terminals. The cyan-on-black colour scheme reinforces that — VFDs glowed blue-green by nature.

The closest real-world equivalent is the display style used on vintage Casio keyboards, Roland synthesizers, and Pioneer stereo receivers from that era.

## Usage

```html
<script type="module" src="bpm-glyph.js"></script>

<bpm-glyph char="A"></bpm-glyph>
```

The `char` attribute accepts A–Z, 0–9, and the punctuation `: - _ . space`.

The component sizes itself to `1.5em × 1.125em` (4:3 ratio) by default and can be scaled with CSS:

```css
bpm-glyph {
  width: 48px;
}
```

## Accessibility

Each glyph is exposed as `role="img"` with an `aria-label` set to the character it displays. Symbol characters use readable names (`colon`, `hyphen`, `underscore`, `period`, `space`). The inner SVG is marked `aria-hidden="true"` so screen readers do not traverse the paths.

You can override the label:

```html
<bpm-glyph char=":" aria-label="separator"></bpm-glyph>
```
