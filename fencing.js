// ═══════════════════════════════════════════════════════════════
// iTabs Quotes Config — Perth Fencing Pros
// https://github.com/boilermaker-innovator/itabs-quotes
// ═══════════════════════════════════════════════════════════════

window.WIDGET_CONFIG = {

  business: {
    name: "Perth Fencing Pros",
    tagline: "Colorbond, Timber & Aluminium Fencing",
    phone: "",
    email: "",
    logo: "",
    website: "",
    location: "Perth, WA",
    socials: { facebook: "", instagram: "", google: "" }
  },

  branding: {
    mode: "dark",
    primaryColor: "#f59e0b",
    secondaryColor: "#d97706",
    backgroundColor: "#0c1117",
    cardBackground: "#151c25",
    hoverBackground: "#1a2332",
    darkBackground: "#0a0e14",
    borderColor: "#222d3a",
    textColor: "#e8ecf1",
    mutedText: "#8896a7",
    dimText: "#5a6a7d",
    successColor: "#22c55e",
    errorColor: "#ef4444",
    infoColor: "#3b82f6",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    monoFont: "'JetBrains Mono', monospace",
    borderRadius: "14px",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500&display=swap",
  },

  header: {
    icon: "🏗️",
    headline: "How much is my fence?",
    subtitle: "Tap through to get a ballpark price for your new fence. Takes about 60 seconds.",
    badge: "📍 Prices based on Perth, WA — 2025",
    disclaimer: "Estimates are approximate. Final pricing confirmed after site inspection.",
  },

  steps: [
    // ── STEP 1: Fence Type ──
    {
      id: "fence_type",
      title: "What type of fence?",
      preview: "Tap to choose",
      input: {
        type: "select",
        columns: 1,
        autoAdvance: true,
        options: [
          {
            value: "colorbond",
            label: "Colorbond",
            icon: "🔩",
            description: "Steel panels. Most popular in Perth. Private, low maintenance, lasts 20+ years. 16 colours.",
            priceHint: "$90–$125/m",
            tags: [
              { text: "Most Popular in WA", highlight: true },
              { text: "10yr warranty" }
            ]
          },
          {
            value: "timber",
            label: "Timber Paling",
            icon: "🪵",
            description: "Natural look. Cheaper upfront but needs painting/staining every few years. Lasts 10–20 years.",
            priceHint: "$120–$200/m",
            tags: [
              { text: "Classic look" },
              { text: "More maintenance" }
            ]
          },
          {
            value: "aluminium",
            label: "Aluminium Slat",
            icon: "✨",
            description: "Modern look. Won't rust — perfect for coastal Perth. Privacy with airflow. Lasts 50+ years.",
            priceHint: "$180–$300/m",
            tags: [
              { text: "Premium" },
              { text: "Coastal safe" }
            ]
          },
          {
            value: "pool",
            label: "Pool Fencing",
            icon: "🏊",
            description: "Glass, aluminium tubular, or perforated panels. Must meet Australian safety standards. Building permit required.",
            priceHint: "$200–$600/m",
            tags: [
              { text: "Compliance required" },
              { text: "Safety rated" }
            ]
          }
        ]
      },
      hints: [
        {
          tabLabel: "Compare",
          type: "comparison_table",
          columns: ["Feature", "Colorbond", "Timber", "Aluminium"],
          rows: [
            ["Privacy", "Full", "Full", "Varies"],
            ["Maintenance", "Minimal", "Regular", "Minimal"],
            ["Lifespan", "20–25 yrs", "10–20 yrs", "50+ yrs"],
            ["Coastal?", "OK", "Risky", "Best"],
            ["Termites?", "No risk", "Risk", "No risk"],
            ["Bushfire safe?", "Yes", "No", "Yes"],
          ],
          cellStyles: {
            "Minimal": "positive", "No risk": "positive", "Yes": "positive",
            "Full": "positive", "Best": "positive",
            "Regular": "negative", "Risk": "negative", "Risky": "negative", "No": "negative",
          }
        },
        {
          tabLabel: "Perth Tips",
          type: "tips",
          tips: [
            { icon: "🌊", title: "Near the coast?", text: "Aluminium slat is your best bet. Won't corrode from salt air. Worth the extra cost in Freo, Scarborough, or anywhere near the ocean." },
            { icon: "🔥", title: "Bushfire zone?", text: "Colorbond is non-combustible — the go-to for hills areas like Kalamunda, Mundaring, and Roleystone. Timber is not recommended." },
            { icon: "🏠", title: "Replacing old asbestos (Super 6)?", text: "Super 6 and Hardifence are no longer made. Most people switch to Colorbond — licensed removal is required for asbestos." },
          ]
        },
      ],
    },

    // ── STEP 2: Size ──
    {
      id: "size",
      title: "How much fencing?",
      preview: "Length & height",
      input: {
        type: "slider_group",
        sliders: [
          {
            id: "length_m",
            label: "Total length (metres)",
            min: 5, max: 100, default: 20, step: 1, unit: "m",
            markers: ["5m", "Small yard ~15m", "Avg ~30m", "100m"],
          },
          {
            id: "height_m",
            label: "Height",
            min: 0, max: 3, default: 2, step: 1, unit: "",
            valueMap: [
              { value: 0, label: "0.9m (low)", numericValue: 0.9 },
              { value: 1, label: "1.2m (front fence)", numericValue: 1.2 },
              { value: 2, label: "1.8m (standard)", numericValue: 1.8 },
              { value: 3, label: "2.1m (extra tall)", numericValue: 2.1 },
            ],
            markers: ["0.9m", "1.2m", "1.8m", "2.1m"],
          }
        ]
      },
      hints: [
        {
          tabLabel: "Measuring Tips",
          type: "mixed",
          content: [
            { type: "paragraph", text: "Walk the fence line and count your steps. Each big step is roughly 1 metre. Or use Google Maps — right-click and \"Measure distance\" to get an estimate from above." },
            { type: "key_point", label: "Don't stress about exact numbers", text: "This gives you a ballpark. The fencing company will do a proper site measure when they quote — it's usually free." },
            { type: "tip", icon: "📐", title: "Typical Perth block sizes", text: "Standard 450m² block: ~30m of side/rear fencing. Quarter acre (1,012m²): ~50–60m. Duplex or villa: ~15–20m." }
          ]
        }
      ],
      warnings: [
        {
          condition: "answers.fence_type === 'pool' && getSliderNumeric('height_m') < 1.2",
          icon: "⚠️",
          title: "Pool fencing minimum 1.2m",
          text: "By Australian law, pool fencing must be at least 1.2m high. Heights below this won't pass inspection.",
          style: "error"
        }
      ]
    },

    // ── STEP 3: Extras ──
    {
      id: "extras",
      title: "Any extras?",
      preview: "Gates, removal, etc",
      input: {
        type: "toggle_group",
        toggles: [
          { id: "gate", label: "Single pedestrian gate", icon: "🚪", costHint: "Adds ~$350–$600" },
          { id: "drivegate", label: "Double/driveway gate", icon: "🚗", costHint: "Adds ~$800–$1,500" },
          { id: "removal", label: "Old fence removal", icon: "🗑️", costHint: "Adds ~$15–$30/m" },
          { id: "slope", label: "Sloping block", icon: "📐", costHint: "Adds ~10–20% to labour" },
          { id: "plinth", label: "Plinth (gap filler under fence)", icon: "🧱", costHint: "Adds ~$15–$25/m" },
          { id: "lattice", label: "Lattice/slat top extension", icon: "🌿", costHint: "Adds ~$20–$35/m" },
        ]
      },
      hints: [
        {
          tabLabel: "What's Included?",
          type: "mixed",
          content: [
            { type: "paragraph", text: "A standard quote from most Perth fencers includes: posts, rails, panels, cement for footings, and basic install on flat ground. Here's what might cost extra:" },
            { type: "key_point", label: "⚠️ Asbestos fence (Super 6)?", text: "Needs licensed removal — usually $30–$60/m extra. Don't break it yourself, it's a health risk and you'll cop a fine." },
            { type: "key_point", label: "🪨 Rocky soil or limestone?", text: "Common in Perth — especially north of the river. May need core drilling for posts, which adds $10–$20 per post hole." }
          ]
        }
      ]
    },
  ],

  estimate: {
    title: "Your ballpark price",
    preview: "Based on your selections",
    note: "Supply & install • incl. GST • Perth metro",
    hints: [
      { type: "key_point", label: "How accurate is this?", text: "This is a rough guide based on average Perth pricing in 2025. Your actual quote depends on soil type, access, specific materials, and the installer. Get 2–3 quotes to compare." },
      { type: "tip", icon: "💡", title: "Neighbour splitting costs?", text: "In WA, neighbours generally split the cost of a dividing fence 50/50. The Dividing Fences Act 1961 covers this — but have a chat with them first before getting quotes." }
    ]
  },

  pricing: {
    unit: "metre",
    unitLabel: "per metre",
    basePriceStep: "fence_type",
    basePrices: {
      colorbond:  { low: 90, high: 125 },
      timber:     { low: 120, high: 200 },
      aluminium:  { low: 180, high: 300 },
      pool:       { low: 200, high: 600 },
    },
    quantitySource: "length_m",
    multipliers: [
      { source: "height_m", type: "value_map", values: { 0.9: 0.65, 1.2: 0.8, 1.8: 1.0, 2.1: 1.15 } }
    ],
    extras: [
      { id: "gate", type: "fixed", low: 350, high: 600, breakdownLabel: "Pedestrian gate" },
      { id: "drivegate", type: "fixed", low: 800, high: 1500, breakdownLabel: "Driveway gate" },
      { id: "removal", type: "per_unit", lowPerUnit: 15, highPerUnit: 30, breakdownLabel: "Old fence removal" },
      { id: "slope", type: "percentage", lowPercent: 10, highPercent: 20, breakdownLabel: "Sloping block" },
      { id: "plinth", type: "per_unit", lowPerUnit: 15, highPerUnit: 25, breakdownLabel: "Plinths" },
      { id: "lattice", type: "per_unit", lowPerUnit: 20, highPerUnit: 35, breakdownLabel: "Lattice top" },
    ],
    showBreakdown: true,
    roundTo: 0,
    minimumPrice: 500,
  },

  leadCapture: {
    enabled: true,
    title: "Get your actual quote",
    preview: "Free, no obligation",
    heading: "We've got your specs.",
    subheading: "Drop your details and we'll get back to you with an exact price — usually within 24 hours.",
    showSummary: true,
    fields: [
      { id: "name", label: "Your name", type: "text", placeholder: "e.g. Dave", required: true },
      { id: "contact", label: "Phone or email", type: "text", placeholder: "e.g. 0412 345 678", required: true },
      { id: "suburb", label: "Suburb", type: "text", placeholder: "e.g. Joondalup", required: false },
      { id: "notes", label: "Anything else we should know?", type: "textarea", placeholder: "e.g. Replacing old asbestos fence, dog keeps escaping...", required: false },
    ],
    submitText: "📩 Send My Quote Request",
    submitNote: "No spam. Just your quote.",
    successMessage: "Quote request sent!",
    successSubtext: "We'll be in touch within 24 hours with a proper price based on your specs.",
    delivery: {
      method: "web3forms",
      web3formsKey: "YOUR_KEY_HERE",
      notifyEmail: "your@email.com",
      emailSubject: "New Fence Enquiry",
    }
  },

  socialProof: { enabled: false },

  footer: {
    showPoweredBy: true,
    poweredByUrl: "https://itabs.ai",
  }
};
