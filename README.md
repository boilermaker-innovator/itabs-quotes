# iTabs Quotes

Config-driven interactive quote estimator widgets for trades businesses.

**One engine. Infinite trades.** Write a config file, get a branded quote widget with educational hints, live pricing, and lead capture.

## How It Works

```
configs/fencing.js  ──┐
                      ├──▶  engine.js + engine.css  ──▶  Interactive widget
configs/gateworld.js ─┘
```

The engine reads a `WIDGET_CONFIG` object and renders everything: accordion sections, input controls, tabbed hints, live pricing with breakdown, and a lead capture form.

## Quick Start

1. Copy an existing config from `configs/`
2. Edit the business info, steps, hints, and pricing
3. Create an HTML file that loads your config then the engine:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Quote Widget</title>
  <link rel="stylesheet" href="engine.css">
</head>
<body>
  <div class="container" id="app"></div>
  <script src="configs/my-trade.js"></script>
  <script src="engine.js"></script>
</body>
</html>
```

4. Open in browser. Done.

## Repo Structure

```
itabs-quotes/
├── engine.js          ← Universal engine (never edit per client)
├── engine.css         ← Styles (themed via CSS variables from config)
├── configs/
│   ├── fencing.js     ← Perth fencing — sliders, toggles, per-metre pricing
│   └── gateworld.js   ← Perth gates — multi-select, per-unit pricing
├── examples/
│   ├── fencing.html   ← Working demo (open in browser)
│   └── gateworld.html ← Working demo
└── README.md
```

## Config Features

### Input Types
- **select** — Card grid (1, 2, or 3 columns) with icons, descriptions, price hints, tags
- **multi_select** — Same as select but allows multiple choices
- **slider_group** — Range sliders with value mapping (e.g. 0–3 maps to 0.9m–2.1m)
- **toggle_group** — On/off switches for extras/add-ons

### Hint Types (the differentiator)
- **comparison_table** — Side-by-side feature comparison with colour coding
- **tips** — Icon + title + text cards (e.g. Perth-specific advice)
- **mixed** — Paragraphs, key points, and tips combined
- **custom_html** — Raw HTML for anything else

### Pricing Engine
- Base price from primary selection (low/high range)
- **preAdjustments** — Additive modifiers before multipliers (e.g. style +$200)
- **Multipliers** — From sliders (`value_map`) or selects (`select_map`)
- **Quantity** — Optional (per-metre fencing vs per-unit gates)
- **postAdjustments** — Additive modifiers after multipliers (e.g. job type -$800)
- **Extras** — Fixed, per-unit, or percentage add-ons from toggles
- Minimum price floor, rounding, itemised breakdown

### Lead Capture
- Configurable form fields
- Web3Forms delivery (email to tradie)
- Quote summary included in submission
- Success screen (no customer email on free plan)

### Branding
- Full colour theming via CSS variables
- Custom Google Fonts
- Dark/light mode support
- Border radius, glow effects

## Examples

### Fencing (per-metre pricing)
- 3 steps: fence type → size (sliders) → extras (toggles)
- Height multiplier from slider value map
- Per-unit and percentage extras
- Pool fencing height warning

### Gateworld (per-unit pricing)
- 10 steps: all select-based
- Pre-adjustments: style (+$200–400), colour (+$300 for custom)
- 4 multipliers: height, width, slope, property type
- Post-adjustments: job type (negative values for motor-only jobs)
- Social proof bar enabled

## Tech Stack
- Vanilla HTML/CSS/JS — no dependencies, no build step
- Web3Forms for lead delivery
- GitHub Pages for hosting
- Works on any static host

## What's Next
- [ ] Config generator (form/AI that produces configs)
- [ ] Third trade config (square-metre pricing — patios/decking)
- [ ] Embeddable iframe/web component version
- [ ] Analytics (which steps get completed, drop-off points)

---

Built with [iTabs](https://itabs.ai) · Interactive tools that convert
