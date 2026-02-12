// ═══════════════════════════════════════════════════════════════
// iTabs Quotes Config — Gateworld Perth
// https://github.com/boilermaker-innovator/itabs-quotes
// ═══════════════════════════════════════════════════════════════

window.WIDGET_CONFIG = {

  business: {
    name: "Gateworld Perth",
    tagline: "Gates, Automation & Access Control",
    phone: "",
    email: "",
    logo: "",
    website: "https://gateworld.com.au",
    location: "Perth, WA",
    socials: { facebook: "https://facebook.com/gateworldperth", instagram: "", google: "" }
  },

  branding: {
    mode: "dark",
    primaryColor: "#e2b857",
    secondaryColor: "#d4a840",
    backgroundColor: "#0f1219",
    cardBackground: "#181d27",
    hoverBackground: "#1e2535",
    darkBackground: "#0b0e14",
    borderColor: "#262f3d",
    textColor: "#eaeef3",
    mutedText: "#8a95a8",
    dimText: "#576275",
    successColor: "#22c55e",
    errorColor: "#ef4444",
    infoColor: "#3b82f6",
    fontFamily: "'DM Sans', sans-serif",
    monoFont: "'JetBrains Mono', monospace",
    borderRadius: "14px",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500&display=swap",
  },

  header: {
    icon: "🚪",
    headline: "How much is my gate?",
    subtitle: "Answer a few quick questions and get a ballpark estimate — no obligation, takes about 90 seconds.",
    badge: "📍 Prices based on Perth, WA — 2025",
    disclaimer: "Estimates are approximate. Final pricing confirmed after site inspection.",
  },

  steps: [
    {
      id: "gate_type",
      title: "What type of gate?",
      preview: "Tap to choose",
      input: {
        type: "select", columns: 2, autoAdvance: true,
        options: [
          { value: "sliding", label: "Sliding Gate", icon: "◀▶", description: "Slides along the fence line. Best for driveways with limited swing space. Most popular in Perth.", priceHint: "From $2,800", tags: [{ text: "Most Popular", highlight: true }] },
          { value: "single_swing", label: "Single Swing", icon: "🚪", description: "Classic hinged gate. Needs clearance to swing open. Great for pedestrian or narrow driveways.", priceHint: "From $2,200", tags: [{ text: "Simple install" }] },
          { value: "double_swing", label: "Double Swing", icon: "📖", description: "Two gates swinging from each side. Grand look for wide driveways. Needs room to swing.", priceHint: "From $3,200", tags: [{ text: "Wide driveways" }] },
          { value: "pedestrian", label: "Pedestrian Gate", icon: "🚶", description: "Side gate or garden gate for foot traffic only. Usually matches your fencing style.", priceHint: "From $1,200", tags: [{ text: "Budget friendly" }] },
        ]
      },
      hints: [
        {
          tabLabel: "Compare", type: "comparison_table",
          columns: ["Feature", "Sliding", "Single Swing", "Double Swing"],
          rows: [
            ["Best for", "Driveways", "Narrow entry", "Wide entry"],
            ["Space needed", "Along fence", "Swing arc", "Double arc"],
            ["Can automate?", "Yes", "Yes", "Yes"],
            ["Install complexity", "Medium", "Easy", "Medium"],
            ["Cost range", "$2,800+", "$2,200+", "$3,200+"],
          ],
          cellStyles: { "Easy": "positive", "Yes": "positive" }
        },
        {
          tabLabel: "Tips", type: "tips",
          tips: [
            { icon: "📐", title: "Measure your opening", text: "For a sliding gate, you'll need clear fence line equal to the opening width for the gate to slide into. Check for downpipes, taps, or garden beds in the way." },
            { icon: "⚡", title: "Planning to automate?", text: "If you think you'll want a motor later, mention it now. It's cheaper to prep the install for automation from the start than to retrofit." },
            { icon: "🏠", title: "Strata or body corp?", text: "You may need written approval before installing a gate. Some strata schemes have specific colour and style requirements." },
          ]
        }
      ]
    },
    {
      id: "style",
      title: "What style?",
      preview: "Choose the look",
      input: {
        type: "select", columns: 2, autoAdvance: true,
        options: [
          { value: "slat", label: "Aluminium Slat", icon: "▤", description: "Horizontal slats. Clean modern look with privacy. The most popular style in Perth.", priceHint: "Standard", tags: [{ text: "Popular", highlight: true }] },
          { value: "picket", label: "Picket", icon: "▥", description: "Classic vertical pickets. Traditional look. Partial visibility through gaps.", priceHint: "+$200" },
          { value: "batten", label: "Batten", icon: "▦", description: "Vertical battens with small gaps. Modern twist on the classic look. Good privacy.", priceHint: "+$300" },
          { value: "blade", label: "Vertical Blade", icon: "▮", description: "Angled vertical blades. Premium look with adjustable privacy and airflow.", priceHint: "+$400", tags: [{ text: "Premium" }] },
        ]
      },
      hints: [
        {
          tabLabel: "Style Guide", type: "mixed",
          content: [
            { type: "paragraph", text: "Your gate style should match your fence and home. Most Perth homes go with aluminium slat for the clean, modern look — but heritage homes suit picket or batten." },
            { type: "key_point", label: "Matching your fence", text: "If you already have Colorbond fencing, an aluminium slat gate in the same colour is the most seamless option. Ask about matching profiles." },
            { type: "tip", icon: "💨", title: "Wind considerations", text: "In exposed areas (hills, coastal), gates with some airflow (slat, blade, picket) handle wind better than solid panels. A solid gate acts like a sail." }
          ]
        }
      ]
    },
    {
      id: "colour",
      title: "What colour?",
      preview: "Colorbond & powder coat options",
      input: {
        type: "select", columns: 3, autoAdvance: true,
        options: [
          { value: "monument", label: "Monument", icon: "⬛", priceHint: "Standard", tags: [{ text: "#1 in Perth", highlight: true }] },
          { value: "woodland_grey", label: "Woodland Grey", icon: "🟫", priceHint: "Standard" },
          { value: "basalt", label: "Basalt", icon: "⬛", priceHint: "Standard" },
          { value: "surfmist", label: "Surfmist", icon: "⬜", priceHint: "Standard" },
          { value: "night_sky", label: "Night Sky", icon: "🌑", priceHint: "Standard" },
          { value: "pale_eucalypt", label: "Pale Eucalypt", icon: "🟩", priceHint: "Standard" },
          { value: "paperbark", label: "Paperbark", icon: "🟨", priceHint: "Standard" },
          { value: "ironstone", label: "Ironstone", icon: "🟤", priceHint: "Standard" },
          { value: "custom_ral", label: "Custom RAL", icon: "🎨", priceHint: "+$300", tags: [{ text: "Custom" }] },
        ]
      },
      hints: [
        {
          tabLabel: "Colour Tips", type: "mixed",
          content: [
            { type: "paragraph", text: "Monument and Woodland Grey are the top sellers in Perth. They suit most homes and match standard Colorbond fencing." },
            { type: "key_point", label: "Match your neighbours", text: "Check what colour your neighbours' fences and gates are. A matching or complementary colour looks sharp from the street." },
            { type: "tip", icon: "🎨", title: "Custom RAL colour", text: "If you need an exact colour match (e.g. to a specific render or cladding), we can powder coat to any RAL colour. Adds about $300 and a few extra days." }
          ]
        }
      ]
    },
    {
      id: "height",
      title: "How high?",
      preview: "Standard is 1800mm",
      input: {
        type: "select", columns: 2, autoAdvance: true,
        options: [
          { value: "1200", label: "1200mm", icon: "📏", description: "Low profile. Good for front fences or where height isn't a priority." },
          { value: "1500", label: "1500mm", icon: "📏", description: "Mid height. Common for front property boundaries." },
          { value: "1800", label: "1800mm", icon: "📏", description: "Standard height. Privacy without needing council approval.", tags: [{ text: "Standard", highlight: true }] },
          { value: "2100", label: "2100mm+", icon: "📏", description: "Extra tall. May need council approval on boundary. More materials = higher cost." },
        ]
      },
      hints: [
        {
          tabLabel: "Height Guide", type: "mixed",
          content: [
            { type: "key_point", label: "Standard residential", text: "1800mm is the standard boundary height in Perth. Your gate should match your fence height for a clean look." },
            { type: "tip", icon: "📋", title: "Over 1800mm?", text: "Gates over 1800mm on a boundary may need council approval depending on your local government area. Check with your council first." }
          ]
        }
      ]
    },
    {
      id: "width",
      title: "Opening width?",
      preview: "Measure the gap",
      input: {
        type: "select", columns: 2, autoAdvance: true,
        options: [
          { value: "3m", label: "Up to 3m", icon: "↔️", description: "Single car or pedestrian. Tight but works for most." },
          { value: "4m", label: "3m – 4m", icon: "↔️", description: "Comfortable single car. Most common driveway width.", tags: [{ text: "Most common", highlight: true }] },
          { value: "5m", label: "4m – 5m", icon: "↔️", description: "Wide single or tight double. Room for a boat or trailer." },
          { value: "6m", label: "5m – 6m+", icon: "↔️", description: "Double driveway or wide access. May need heavier-duty gate and track." },
        ]
      },
      hints: [
        {
          tabLabel: "Measuring", type: "mixed",
          content: [
            { type: "paragraph", text: "Measure the gap between your pillars, posts, or where the gate will sit. If you're not sure, measure your driveway at the property boundary." },
            { type: "key_point", label: "Sliding gate clearance", text: "A sliding gate needs clear fence line (no bins, taps, garden beds) on one side equal to the opening width. A 4m opening needs 4m of clear fence." }
          ]
        }
      ]
    },
    {
      id: "slope",
      title: "Is your driveway on a slope?",
      preview: "Affects the install",
      input: {
        type: "select", columns: 2, autoAdvance: true,
        options: [
          { value: "flat", label: "Flat", icon: "➖", description: "Level ground. Standard install." },
          { value: "slight", label: "Slight Slope", icon: "📐", description: "Gentle incline. Minor adjustments needed." },
          { value: "steep", label: "Steep Slope", icon: "⛰️", description: "Noticeable hill. Custom track/frame work required." },
          { value: "unsure", label: "Not Sure", icon: "❓", description: "No worries — we'll check on the site visit." },
        ]
      },
      hints: [
        {
          tabLabel: "Slope Info", type: "mixed",
          content: [
            { type: "paragraph", text: "Slopes affect how the gate is built and installed. Sliding gates on a slope need a custom track that follows the ground angle. Swing gates may need a curved bottom rail." },
            { type: "tip", icon: "💰", title: "Cost impact", text: "A slight slope adds around 10% to the install cost. A steep slope can add 25% due to custom fabrication and extra labour. Don't stress if you're not sure — 'Not Sure' is fine, we'll assess on site." }
          ]
        }
      ]
    },
    {
      id: "job_type",
      title: "What kind of job?",
      preview: "New or existing?",
      input: {
        type: "select", columns: 2, autoAdvance: true,
        options: [
          { value: "new", label: "New Install", icon: "🆕", description: "Brand new gate where there isn't one. Full supply and install." },
          { value: "replace", label: "Replace Gate", icon: "🔄", description: "Remove old gate, install new. Includes removal of existing gate.", priceHint: "+$500" },
          { value: "motor_only", label: "Replace Motor", icon: "⚙️", description: "Existing gate is fine, just need a new motor/automation.", priceHint: "Motor only" },
          { value: "automate", label: "Automate Existing", icon: "🤖", description: "Gate works manually but you want to add a motor and remotes.", priceHint: "Add motor" },
        ]
      },
      hints: [
        {
          tabLabel: "Job Info", type: "mixed",
          content: [
            { type: "key_point", label: "Replacing an old gate?", text: "We'll remove your old gate as part of the job. If it's a heavy steel gate or has concrete footings, removal may take a bit longer but it's included in the replace price." },
            { type: "tip", icon: "🤖", title: "Just need automation?", text: "If your existing gate is in good condition and just needs a motor, that's a much simpler (and cheaper) job. We'll check your gate is suitable during the site visit." }
          ]
        }
      ]
    },
    {
      id: "property_type",
      title: "Property type?",
      preview: "Helps with requirements",
      input: {
        type: "select", columns: 1, autoAdvance: true,
        options: [
          { value: "residential", label: "Residential", icon: "🏠", description: "Standard home. Most straightforward install." },
          { value: "commercial", label: "Commercial", icon: "🏢", description: "Business or industrial. May need heavier-duty gate and compliance.", priceHint: "+20%" },
          { value: "strata", label: "Strata / Body Corp", icon: "🏘️", description: "Shared property. May need approval and specific colour/style requirements.", priceHint: "+15%" },
        ]
      },
      hints: [
        {
          tabLabel: "Property Info", type: "mixed",
          content: [
            { type: "key_point", label: "Commercial properties", text: "Commercial gates often need heavier-duty motors, safety beams, and signage. This adds to the cost but is usually required by WA regulations." },
            { type: "tip", icon: "🏘️", title: "Strata approval", text: "Get written approval from your body corp BEFORE ordering. They may specify the exact colour (usually the estate's standard colour) and style. We can provide specs for your application." }
          ]
        }
      ]
    },
    {
      id: "timeframe",
      title: "When do you need it?",
      preview: "Helps us plan",
      input: {
        type: "select", columns: 2, autoAdvance: true,
        options: [
          { value: "asap", label: "ASAP", icon: "⚡", description: "Within 2 weeks if possible.", tags: [{ text: "Priority", highlight: true }] },
          { value: "month", label: "This Month", icon: "📅", description: "Flexible on the exact date." },
          { value: "planning", label: "Still Planning", icon: "📋", description: "Just getting an idea of cost." },
          { value: "quotes", label: "Getting Quotes", icon: "🔍", description: "Comparing a few options." },
        ]
      },
      hints: [
        {
          tabLabel: "Timing", type: "mixed",
          content: [
            { type: "paragraph", text: "Most gate installs in Perth take 2–4 weeks from order to completion. Custom colours or unusual sizes may add a week or two for fabrication." },
            { type: "tip", icon: "⏳", title: "Peak season", text: "Spring and early summer (Sep–Dec) are the busiest times for gate installs in Perth. If you're flexible on timing, autumn and winter often have shorter wait times." }
          ]
        }
      ]
    },
    {
      id: "extras",
      title: "Any extras?",
      preview: "Motors, intercoms, etc",
      input: {
        type: "toggle_group",
        toggles: [
          { id: "motor", label: "Gate Motor", icon: "⚡", costHint: "Adds ~$800" },
          { id: "intercom", label: "Intercom System", icon: "📞", costHint: "Adds ~$600" },
          { id: "keypad", label: "Keypad Access", icon: "🔢", costHint: "Adds ~$350" },
          { id: "remotes", label: "Extra Remotes (×2)", icon: "📡", costHint: "Adds ~$120" },
          { id: "safety_beams", label: "Safety Beams", icon: "🔴", costHint: "Adds ~$250" },
          { id: "ped_gate", label: "Matching Pedestrian Gate", icon: "🚶", costHint: "Adds ~$1,200" },
        ]
      },
      hints: [
        {
          tabLabel: "Extras Guide", type: "mixed",
          content: [
            { type: "key_point", label: "Gate motor", text: "If you're getting a sliding or swing gate, automation is the most popular add-on. Open and close from your car with a remote — essential for Perth's rainy winter mornings." },
            { type: "key_point", label: "Safety beams", text: "Infrared beams detect obstacles in the gate's path. Recommended for any automated gate, especially with kids or pets. Some councils require them." },
            { type: "tip", icon: "📞", title: "Intercom vs keypad", text: "An intercom lets you see/talk to visitors and buzz them in. A keypad just lets people with the code open the gate themselves. Many people get both." }
          ]
        }
      ]
    },
  ],

  estimate: {
    title: "Your ballpark estimate",
    preview: "Based on your selections",
    note: "Supply & install • incl. GST • Perth metro",
    hints: [
      { type: "key_point", label: "How accurate is this?", text: "This is a rough guide based on average Perth pricing in 2025. Your actual quote depends on site access, soil conditions, exact measurements, and specific product choices. We'll confirm everything on the free site visit." },
      { type: "tip", icon: "📞", title: "Want to talk it through?", text: "If you'd rather chat on the phone, give Daryl a call. He can walk you through options and give you a quick verbal estimate." }
    ]
  },

  pricing: {
    unit: "per_gate",
    unitLabel: "per gate",
    basePriceStep: "gate_type",
    basePrices: {
      sliding:       { low: 2380, high: 3220 },
      single_swing:  { low: 1870, high: 2530 },
      double_swing:  { low: 2720, high: 3680 },
      pedestrian:    { low: 1020, high: 1380 },
    },
    quantitySource: null,
    preAdjustments: [
      { source: "style", type: "additive", values: { slat: 0, picket: 200, batten: 300, blade: 400 } },
      { source: "colour", type: "additive", values: { custom_ral: 300, _default: 0 } }
    ],
    multipliers: [
      { source: "height", type: "select_map", values: { "1200": 0.8, "1500": 0.9, "1800": 1.0, "2100": 1.2 } },
      { source: "width", type: "select_map", values: { "3m": 1.0, "4m": 1.15, "5m": 1.3, "6m": 1.5 } },
      { source: "slope", type: "select_map", values: { flat: 1.0, slight: 1.1, steep: 1.25, unsure: 1.1 } },
      { source: "property_type", type: "select_map", values: { residential: 1.0, commercial: 1.2, strata: 1.15 } }
    ],
    postAdjustments: [
      { source: "job_type", type: "additive", values: { new: 0, replace: 500, motor_only: -1800, automate: -800 } }
    ],
    extras: [
      { id: "motor", type: "fixed", low: 800, high: 800, breakdownLabel: "Gate Motor" },
      { id: "intercom", type: "fixed", low: 600, high: 600, breakdownLabel: "Intercom System" },
      { id: "keypad", type: "fixed", low: 350, high: 350, breakdownLabel: "Keypad Access" },
      { id: "remotes", type: "fixed", low: 120, high: 120, breakdownLabel: "Extra Remotes (×2)" },
      { id: "safety_beams", type: "fixed", low: 250, high: 250, breakdownLabel: "Safety Beams" },
      { id: "ped_gate", type: "fixed", low: 1200, high: 1200, breakdownLabel: "Matching Pedestrian Gate" },
    ],
    showBreakdown: true,
    roundTo: 50,
    minimumPrice: 800,
  },

  leadCapture: {
    enabled: true,
    title: "Get your exact quote",
    preview: "Free site visit, no obligation",
    heading: "Almost there!",
    subheading: "Leave your details and Daryl will get back to you within 24 hours — usually same day for urgent jobs.",
    showSummary: true,
    fields: [
      { id: "name", label: "Your name", type: "text", placeholder: "e.g. Dave Smith", required: true },
      { id: "phone", label: "Phone", type: "tel", placeholder: "e.g. 0412 345 678", required: true },
      { id: "email", label: "Email", type: "email", placeholder: "e.g. dave@email.com", required: false },
      { id: "suburb", label: "Suburb", type: "text", placeholder: "e.g. Joondalup", required: false },
      { id: "notes", label: "Anything else?", type: "textarea", placeholder: "e.g. Access issues, specific requirements, questions...", required: false },
    ],
    submitText: "📩 Send My Details",
    submitNote: "No spam. Daryl will be in touch shortly.",
    successMessage: "Thanks! Daryl will be in touch within 24 hours.",
    successSubtext: "Your estimate and details have been sent. If it's urgent, give us a call.",
    delivery: {
      method: "web3forms",
      web3formsKey: "YOUR_KEY_HERE",
      notifyEmail: "your@email.com",
      emailSubject: "New Gate Enquiry — Gateworld Perth",
    }
  },

  socialProof: {
    enabled: true,
    rating: 5.0,
    reviewCount: 48,
    badges: ["Licensed & Insured", "Perth Local", "Free Site Visits"],
  },

  footer: {
    showPoweredBy: true,
    poweredByUrl: "https://itabs.ai",
  }
};
