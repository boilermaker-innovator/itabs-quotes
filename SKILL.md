# Trade Quote Estimator Skill

## name: trade-quote-estimator
**description:** Generate interactive quote estimator widgets for trade and service businesses. Use this skill when someone wants to build a quote calculator, price estimator, cost guide, or interactive pricing tool for any trade — fencing, plumbing, painting, landscaping, electrical, roofing, concreting, or any service business. Also triggers on requests like 'build a quote widget', 'create a pricing tool for my client', 'interactive estimator', 'embed a quote calculator', or 'replace the contact form with a quote tool'. Works for any trade, any region, any pricing model.

---

## What This Skill Does

Generate config-driven interactive quote estimator widgets for trade and service businesses. One config file produces a complete widget with step-by-step guided quoting, educational content, live pricing, and lead capture — ready to embed on any website via a floating button.

## What Makes This Different

This is not a dumb calculator. The widget **educates the customer while they quote**. Each step includes contextual hints — comparisons between options, regional tips, regulatory info, and practical advice. By the time a customer submits, they understand what they're getting and can describe exactly what they want.

**Pricing is a sales tool, not a quote.** The tradie sets their own price ranges as a marketing hook — just like putting "From $95/m" on their website. It keeps customers engaged, sets expectations, and filters unrealistic budgets. But the quote summary that gets sent to the tradie is always a **clean spec sheet** — no dollar figures. The actual quote comes from the tradie after a site visit.

## How It Works

The widget is a single self-contained HTML file powered by a `WIDGET_CONFIG` JavaScript object. Change the config, change the trade. The rendering engine never changes.

```
WIDGET_CONFIG (your trade's config)
        │
        ▼
   engine.js + engine.css
        │
        ▼
   Interactive quote widget
```

## Workflow

When someone asks you to build a quote estimator:

1. **Ask about the trade** — What trade/service? What region? What are the main options a customer chooses between?
2. **Design the steps** — Map out 3-6 decision steps the customer walks through (see Step Design below)
3. **Write the educational content** — This is the differentiator. Write helpful hints for each step (see Educational Content below)
4. **Set up pricing** — Base prices, multipliers, extras (see Pricing Engine below)
5. **Configure branding** — Business name, colours, fonts
6. **Generate the complete HTML file** — Single file with config + engine, ready to deploy
7. **Add the floating button embed code** — So it can be added to any existing website

## Step Design

Each step is an accordion section the customer opens in sequence. Good estimators have 3-6 steps. More than 6 feels like a chore.

**Step types available:**

| Type | Use for | Example |
|------|---------|---------|
| `select` | Choose one option from a card grid | Fence type: Colorbond / Timber / Aluminium |
| `multi_select` | Choose multiple options | Extras: Gate / Removal / Plinth / Lattice |
| `slider_group` | Numeric ranges with mapped values | Height: 0.9m / 1.2m / 1.8m / 2.1m |
| `toggle_group` | On/off switches for add-ons | Includes: Old fence removal? Asbestos? |

**Each step has:**

- `id` — Unique identifier used by the pricing engine
- `title` — Customer-facing question ("What type of fence?")
- `type` — One of the types above
- `options` — Array of choices with id, label, optional description, icon, price hint
- `hints` — Educational content shown via the i-button (see below)

**Design principles:**

- Start with the biggest decision (material/type)
- Move to specifics (size, quantity, style)
- End with extras and add-ons
- Each step title should be a plain-English question
- Options should have short labels (1-3 words) with descriptions for detail

## Educational Content (The Differentiator)

Every step has an i-button that opens a hint panel. This is what separates a good estimator from a contact form. The customer learns while they decide.

**Hint types:**

| Type | When to use | Example |
|------|------------|---------|
| `comparison_table` | Comparing options side by side | Colorbond vs Timber vs Aluminium — durability, maintenance, cost |
| `tips` | Practical advice cards with icons | "Most Perth homes use Colorbond for low maintenance" |
| `key_point` | Single important fact | "Pool fencing must comply with AS1926.1" |
| `mixed` | Combination of paragraphs, tips, key points | General guidance with highlighted specifics |

**Writing good educational content:**

- Explain differences between options in plain language
- Mention region-specific factors (climate, soil, regulations)
- Tell the customer WHY this information matters
- Help them measure or estimate if they're unsure ("Walk along your fence line heel-to-toe — each step is roughly 0.75m")
- Reference local regulations where relevant
- Keep it conversational, not technical

**Research the trade and region.** Use web search to find current pricing guides, local regulations, common materials, and regional considerations. Sources like HiPages cost guides, trade association websites, and council planning pages are useful. Prices should be GST inclusive for Australian consumer-facing widgets.

## Pricing Engine (Tradie's Price Guide)

Pricing defaults to **ON**. The prices shown in the widget are the tradie's own numbers — set by them (via the web designer) as a marketing tool to attract and engage customers. This is no different to a tradie putting "Fencing from $95/m" on their website. The widget just makes that sales pitch interactive.

**Why tradies show prices:** It keeps customers on the page. A visitor who sees ballpark pricing engages with the tool instead of bouncing to the next Google result. The prices set expectations, filter out unrealistic budgets, and guide the customer through their options. It's a sales funnel, not a quote.

**The one hard rule:** The quote summary that gets sent to the tradie **NEVER includes pricing**. The summary is always the clean spec — selections, measurements, extras, and notes only. On-screen pricing is a marketing tool. The actual quote comes from the tradie after a site visit.

When building the config, ask the web designer (or their tradie client) what price ranges they want to show. These are their numbers — not researched averages. If they don't have pricing, fall back to regional averages as a starting point they can adjust.

**Price hints on option cards** help customers understand relative cost between options (e.g. "From $95/m" vs "From $180/m"). These are set per option in the config.

### Pricing calculation order (when enabled)

```
base price → preAdjustments → multipliers → quantity → postAdjustments → extras → minimum → rounding
```

**Components:**

- **basePrices** — Set by the primary step (e.g., fence type). Each option has a `low` and `high` price.
- **preAdjustments** — Flat amounts added before multipliers (e.g., style upgrade +$200)
- **multipliers** — Factors from sliders (`value_map`: height 1.8m = 1.0x, 2.1m = 1.15x) or selects (`select_map`)
- **quantity** — Optional. Per-metre (fencing), per-unit (gates), per-room (painting), or omitted
- **postAdjustments** — Flat amounts added after multipliers
- **extras** — Fixed costs (gate: $350-$600), per-unit costs (removal: $15-$30/m), or percentage uplifts (sloping block: +10-20%)
- **minimumPrice** — Floor price (e.g., $500 minimum for any fence job)
- **roundTo** — Round to nearest value (0 = whole dollars)

**Pricing display modes:**

- `range` — Shows "$2,400 – $3,800"
- `from` — Shows "From $2,400"

Always label pricing as a "price guide" — not a quote or estimate. Include a disclaimer: "Prices are a guide only. Your actual quote is confirmed after a site visit."

## Config Structure

Generate the complete `WIDGET_CONFIG` object following this structure:

```javascript
const WIDGET_CONFIG = {
  business: {
    name: "",           // Business name
    tagline: "",        // Short descriptor
    phone: "",          // Optional
    email: "",          // Optional
    website: "",        // Optional
    location: "",       // Region shown in header/footer
  },

  branding: {
    mode: "dark",       // "dark" or "light"
    primaryColor: "",   // Brand accent colour (hex)
    secondaryColor: "", // Gradient pair
    backgroundColor: "",
    cardBackground: "",
    textColor: "",
    mutedText: "",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    monoFont: "'JetBrains Mono', monospace",
    borderRadius: "14px",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500&display=swap",
  },

  header: {
    icon: "",           // Emoji or image URL
    headline: "",       // Customer-facing question ("How much will my fence cost?")
    subtitle: "",       // Brief description of what they'll get
    badge: "",          // Context badge ("Free estimator · Perth metro · Updated 2026")
  },

  steps: [
    // Array of step objects — see Step Design above
  ],

  estimate: {
    title: "Your ballpark price",
    preview: "Based on your selections",
    note: "Supply & install • incl. GST • Prices based on 2026 averages",
    hints: [
      // Accuracy disclaimer and pro tips for the summary screen
    ]
  },

  pricing: {
    showPricing: true,          // ON by default — tradie's own price guide
    priceLabel: "Price guide",  // Label shown above pricing (not "quote" or "estimate")
    unit: "metre",              // or "unit", "room", "sqm"
    unitLabel: "per metre",
    basePriceStep: "",          // id of the step that sets the base price
    basePrices: {},             // keyed by option id: { low: X, high: Y } — tradie sets these
    quantitySource: "",         // id of the step/slider that provides quantity
    multipliers: [],            // array of multiplier rules
    extras: [],                 // array of extra cost rules
    showBreakdown: true,
    displayMode: "range",       // or "from"
    roundTo: 0,
    minimumPrice: 0,
    disclaimer: "Prices are a guide only. Your actual quote is confirmed after a site visit."
  },

  leadCapture: {
    enabled: true,
    title: "Ready to quote?",
    subtitle: "Send your selections to a local tradie for an accurate quote",
    fields: ["name", "email", "phone", "address", "message"],
    // Integration options: Web3Forms, email, webhook, or "copy summary" button
    // IMPORTANT: The copied/sent summary NEVER includes pricing — just the clean spec
    // On-screen pricing is a sales tool. The tradie quotes after a site visit.
  }
};
```

## Example Config — Perth Fencing

This is a trimmed working example showing the pattern. Use this as your reference when building configs for other trades.

```javascript
const WIDGET_CONFIG = {
  business: {
    name: "Perth Fencing Price Guide",
    tagline: "Colorbond, Timber & Aluminium Fencing",
    phone: "",
    email: "",
    website: "",
    location: "Perth, WA",
  },

  branding: {
    mode: "dark",
    primaryColor: "#f59e0b",
    secondaryColor: "#d97706",
    backgroundColor: "#0c1117",
    cardBackground: "#151c25",
    hoverBackground: "#1a2332",
    textColor: "#e8ecf1",
    mutedText: "#8896a7",
    successColor: "#22c55e",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    monoFont: "'JetBrains Mono', monospace",
    borderRadius: "14px",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500&display=swap",
  },

  header: {
    icon: "🏗️",
    headline: "How much will my fence cost?",
    subtitle: "Answer a few questions and get a ballpark price in 60 seconds. No login. No spam. Just numbers.",
    badge: "Free estimator · Perth metro · Updated 2026",
  },

  steps: [
    {
      id: "fence_type",
      title: "What type of fence?",
      type: "select",
      columns: 2,
      options: [
        {
          id: "colorbond",
          label: "Colorbond",
          icon: "🛡️",
          description: "Steel panels. Low maintenance, long lasting.",
          priceHint: "From $95/m",
          tags: ["Most Popular"]
        },
        {
          id: "timber",
          label: "Timber",
          icon: "🪵",
          description: "Classic look. Needs staining every 2-3 years.",
          priceHint: "From $120/m"
        },
        {
          id: "aluminium",
          label: "Aluminium Slat",
          icon: "✨",
          description: "Modern look. Won't rust or rot.",
          priceHint: "From $180/m"
        },
        {
          id: "pool",
          label: "Pool Fencing",
          icon: "🏊",
          description: "Glass, aluminium or steel. Must meet AS1926.1.",
          priceHint: "From $200/m",
          tags: ["Compliance Required"]
        }
      ],
      hints: {
        type: "comparison_table",
        title: "Which fence type is right for you?",
        headers: ["Feature", "Colorbond", "Timber", "Aluminium"],
        rows: [
          ["Durability", "⭐⭐⭐⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐⭐"],
          ["Maintenance", "Almost none", "Stain every 2-3 yrs", "Almost none"],
          ["Privacy", "Full privacy", "Full privacy", "Partial (slats)"],
          ["Wind resistance", "Excellent", "Good", "Excellent (gaps)"],
          ["Cost", "$$", "$$$", "$$$$"],
          ["Lifespan", "20-30 years", "15-20 years", "25+ years"]
        ],
        footer: "Most Perth homes go with Colorbond for the low maintenance and full privacy. Timber suits heritage areas or if you want a natural look."
      }
    },
    {
      id: "height_m",
      title: "How high?",
      type: "slider_group",
      sliders: [
        {
          id: "height_m",
          label: "Fence height",
          min: 0,
          max: 3,
          step: 1,
          defaultValue: 2,
          valueMap: [0.9, 1.2, 1.8, 2.1],
          displayFormat: "{value}m",
          labels: ["0.9m", "1.2m", "1.8m", "2.1m"]
        }
      ],
      hints: {
        type: "mixed",
        items: [
          {
            type: "tip",
            icon: "📏",
            title: "Standard height",
            text: "1.8m is the most common fence height in Perth. It provides full privacy and meets most council requirements without needing a permit."
          },
          {
            type: "key_point",
            label: "⚠️ Over 2.1m?",
            text: "Fences over 2.1m in most Perth councils need a building permit. Check with your local council before committing to extra height."
          },
          {
            type: "tip",
            icon: "💡",
            title: "Dividing Fences Act",
            text: "In WA, neighbours typically split the cost of a standard dividing fence (1.8m Colorbond). If you want something taller or fancier, you pay the difference."
          }
        ]
      }
    },
    {
      id: "length_m",
      title: "How many metres?",
      type: "slider_group",
      sliders: [
        {
          id: "length_m",
          label: "Total fence length",
          min: 5,
          max: 80,
          step: 1,
          defaultValue: 20,
          unit: "m",
          displayFormat: "{value}m"
        }
      ],
      hints: {
        type: "mixed",
        items: [
          {
            type: "tip",
            icon: "📐",
            title: "How to measure",
            text: "Walk along your fence line and count your steps. Each adult step is roughly 0.75m. So 30 steps ≈ 22 metres. Or use Google Maps — right-click your property and use 'Measure distance'."
          }
        ]
      }
    },
    {
      id: "extras",
      title: "Any extras?",
      type: "toggle_group",
      toggles: [
        { id: "gate", label: "Pedestrian gate", icon: "🚪", description: "Standard single gate" },
        { id: "drivegate", label: "Driveway gate", icon: "🚗", description: "Double or sliding gate" },
        { id: "removal", label: "Old fence removal", icon: "🗑️", description: "Remove and dispose of existing fence" },
        { id: "slope", label: "Sloping block", icon: "⛰️", description: "Stepped or raked panels for uneven ground" }
      ],
      hints: {
        type: "mixed",
        items: [
          {
            type: "key_point",
            label: "🪨 Hitting rock or limestone?",
            text: "Common in Perth — especially north of the river. If posts can't be dug by hand, core drilling is needed at ~$10–$20 per post hole. Your fencer will check on site."
          },
          {
            type: "tip",
            icon: "💡",
            title: "Pro tip",
            text: "When you contact a fencer, mention if you have a sloping block, trees near the fence line, or shared boundaries. It helps them quote faster and more accurately."
          }
        ]
      }
    }
  ],

  estimate: {
    title: "Your ballpark price",
    preview: "Based on your selections",
    note: "Supply & install • incl. GST • Perth metro • Prices based on 2026 averages",
    hints: [
      {
        type: "key_point",
        label: "How accurate is this?",
        text: "This is a rough guide based on average Perth pricing in 2026. Your actual quote depends on soil type, access, specific materials, and the installer. Always get at least 2-3 quotes from local fencers."
      },
      {
        type: "tip",
        icon: "💡",
        title: "Pro tip",
        text: "When you send this to a fencer, they'll love you. Instead of saying 'how much for a fence?' you'll have all your specs ready — fence type, height, length, and extras. It saves everyone time and gets you a faster, more accurate quote."
      }
    ]
  },

  pricing: {
    unit: "metre",
    unitLabel: "per metre",
    basePriceStep: "fence_type",
    basePrices: {
      colorbond:  { low: 95, high: 130 },
      aluminium:  { low: 180, high: 300 },
      timber:     { low: 120, high: 200 },
      pool:       { low: 200, high: 600 },
    },
    quantitySource: "length_m",
    multipliers: [
      {
        source: "height_m",
        type: "value_map",
        values: { 0.9: 0.65, 1.2: 0.8, 1.8: 1.0, 2.1: 1.15 }
      }
    ],
    extras: [
      { id: "gate", type: "fixed", low: 350, high: 600, breakdownLabel: "Pedestrian gate" },
      { id: "drivegate", type: "fixed", low: 800, high: 1500, breakdownLabel: "Driveway gate" },
      { id: "removal", type: "per_unit", lowPerUnit: 15, highPerUnit: 30, breakdownLabel: "Old fence removal" },
      { id: "slope", type: "percentage", lowPercent: 10, highPercent: 20, breakdownLabel: "Sloping block" },
    ],
    showBreakdown: true,
    displayMode: "from",
    roundTo: 0,
    minimumPrice: 500,
  },

  leadCapture: {
    enabled: true,
    title: "Ready to quote?",
    subtitle: "Send this summary to a local fencer for an accurate quote",
    fields: ["name", "email", "phone", "address", "message"],
  }
};
```

**Key patterns to follow:**

- Every `select` option has `id`, `label`, `icon`, `description`, and optionally `priceHint` and `tags`
- Hints object sits at the step level, not inside individual options
- `comparison_table` hints need `headers`, `rows` array, and optional `footer`
- `mixed` hints have an `items` array containing `tip` and `key_point` objects
- Pricing `extras` reference toggle ids and specify their cost type
- Slider `valueMap` maps slider positions to actual values used in pricing

## Output Format

Generate a **single self-contained HTML file** containing:

1. All CSS inline (themed via CSS variables from the branding config)
2. The `WIDGET_CONFIG` object
3. The rendering engine JavaScript
4. Mobile-first responsive design
5. Dark mode by default (configurable)
6. Accordion UI with i-button hint panels
7. Live pricing that updates as the customer makes selections
8. Price guide display with breakdown (labelled as "price guide", not "quote" or "estimate")
9. Lead capture form or "copy summary" button — the summary that gets sent to the tradie is ALWAYS the clean spec only (selections, measurements, extras, notes) with NO pricing. On-screen pricing is a sales tool. The tradie's quote comes after a site visit.

**Plus a separate embed snippet** — a small script tag and floating button that opens the estimator as an overlay on any existing website:

```html
<!-- Add to any website — floating quote button -->
<script>
(function() {
  var btn = document.createElement('div');
  btn.innerHTML = '💬 Get a Quick Quote';
  btn.style.cssText = 'position:fixed;bottom:20px;right:20px;background:#f59e0b;color:#000;padding:12px 20px;border-radius:50px;cursor:pointer;font-family:sans-serif;font-weight:600;box-shadow:0 4px 12px rgba(0,0,0,0.3);z-index:9999;';
  btn.onclick = function() {
    window.open('URL_TO_WIDGET.html', '_blank', 'width=420,height=700');
  };
  document.body.appendChild(btn);
})();
</script>
```

The button colour, text, and position should match the branding config.

## Validation Checklist

Before delivering the widget:

1. Does every step render correctly with all options visible?
2. Is the flow logical? (Biggest decision first, extras last)
3. Does the educational content help the customer understand their options without needing to call the tradie?
4. Does the quote summary contain everything a tradie needs to provide an accurate quote?
5. Does the quote summary exclude all pricing? (On-screen pricing is a sales tool only — never in the output sent to the tradie)
6. Is the educational content accurate and region-specific?
7. Does it work on mobile? (Most customers use phones)
8. Could a tradie quote from the summary alone?

## Example Trades

This skill works for any trade. Some examples to get started:

- **Fencing** — Colorbond, timber, aluminium, pool, security. Per-metre pricing with height multipliers.
- **Painting** — Interior, exterior. Per-room or per-sqm. Condition-based multipliers.
- **Landscaping** — Lawn, paving, retaining walls, reticulation. Mixed pricing models.
- **Plumbing** — Hot water, bathroom reno, drainage. Fixed + hourly pricing.
- **Electrical** — Switchboard upgrade, lighting, power points. Per-point pricing with complexity multipliers.
- **Roofing** — Tile, metal, gutters. Per-sqm with pitch multipliers.
- **Concreting** — Driveways, paths, slabs. Per-sqm with thickness/finish multipliers.

For each trade, research local pricing, common options, and regional considerations before building the config.

## Source Repository

Engine, configs, and working examples: [github.com/boilermaker-innovator/itabs-quotes](https://github.com/boilermaker-innovator/itabs-quotes)

Built with [iTabs](https://itabs.ai) · Interactive tools that convert
