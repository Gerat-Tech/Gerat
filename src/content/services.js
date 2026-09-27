/**
 * Gerat Practice Pillars & Capabilities Dataset (Spec §27, Content Replacement §6, §7)
 */
export const servicePillars = [
  {
    num: "01",
    title: "DIGITAL EXPERIENCES",
    headline: "MAKE THE BUSINESS EASIER TO SEE, UNDERSTAND, AND USE.",
    tagline: "WEBSITES & DIGITAL PRODUCTS",
    desc: "We design and build websites, web applications, customer portals, and digital products that connect businesses with the people they serve.",
    outcome: "Better digital experiences make the right information easier to find and the next action easier to take.",
    deliverables: [
      "Company and marketing websites",
      "Custom web applications",
      "Customer portals and dashboards",
      "Digital product interfaces",
      "Responsive UI implementation",
    ],
    deepLink: "/services/digital-experiences",
  },
  {
    num: "02",
    title: "AI & INTELLIGENT TOOLS",
    headline: "TURN INFORMATION INTO USEFUL ACTION.",
    tagline: "PRACTICAL ARTIFICIAL INTELLIGENCE",
    desc: "We build practical AI systems that help teams find knowledge, automate repetitive work, work with documents, and make better use of existing information.",
    outcome: "The goal is not to add AI. The goal is to remove friction.",
    deliverables: [
      "AI assistants",
      "RAG and knowledge systems",
      "Document processing and extraction",
      "Workflow automation",
      "Intelligent search",
    ],
    deepLink: "/services/ai-tools",
  },
  {
    num: "03",
    title: "BUSINESS SYSTEMS",
    headline: "CONNECT THE WORK BEHIND THE BUSINESS.",
    tagline: "OPERATIONS PLATFORMS & ERP",
    desc: "We build operational software that brings workflows, data, people, and systems together.",
    outcome: "Fewer disconnected tools. Clearer operations. A stronger base for growth.",
    deliverables: [
      "ERP and operational platforms",
      "Internal workflow tools",
      "Inventory and supply systems",
      "Billing and business operations",
      "API and system integrations",
    ],
    deepLink: "/services/business-systems",
  },
  {
    num: "04",
    title: "BRAND & CREATIVE",
    headline: "MAKE THE BUSINESS RECOGNIZABLE.",
    tagline: "BRAND STRATEGY, IDENTITY & DESIGN SYSTEMS",
    desc: "We build clear brand systems that give businesses a consistent identity across digital products, marketing, and customer touchpoints.",
    outcome: "A strong identity helps people understand who you are before they understand what you sell.",
    deliverables: [
      "Brand strategy and positioning",
      "Logo design",
      "Visual identity systems",
      "Marketing and digital collateral",
      "Founder and personal branding",
      "EXECUTIVE & FOUNDER PERSONAL BRANDING",
    ],
    deepLink: "/services/brand-creative",
  },
];

export const approachSteps = [
  {
    num: "01",
    title: "UNDERSTAND",
    question: "What needs to improve?",
    desc: "We learn how the business works, where the operational friction is, and what the technology needs to achieve.",
  },
  {
    num: "02",
    title: "PRIORITIZE",
    question: "What matters now?",
    desc: "We identify the highest-leverage improvements and focus resources on what delivers immediate clarity and value.",
  },
  {
    num: "03",
    title: "BUILD",
    question: "What should technology do?",
    desc: "We engineer the product, system, or brand identity with the right level of technology for the job.",
  },
  {
    num: "04",
    title: "GROW",
    question: "What should the system make possible next?",
    desc: "We ensure foundations are scalable and stay close for handover, ongoing improvements, and future iterations.",
  },
];

export const serviceFaqs = [
  {
    question: "Do you only build from scratch?",
    answer: "No. We can build new systems, improve existing ones, or connect tools that already exist.",
  },
  {
    question: "Can you handle both design and engineering?",
    answer: "Yes. Gerat brings brand, product design, software engineering, and AI capabilities under one team.",
  },
  {
    question: "Do you support projects after launch?",
    answer: "Yes. We can support handover, improvements, maintenance, and future system changes.",
  },
];

export const capabilitiesTable = [
  {
    id: "01",
    category: "ARCHITECTURE",
    title: "DISTRIBUTED SYSTEMS DESIGN",
    description: "Multi-datacenter consensus, eventual consistency, and fault-tolerant queue topologies.",
  },
  {
    id: "02",
    category: "DATA",
    title: "TIME-SERIES & EVENT STREAMING",
    description: "High-throughput Kafka and ClickHouse pipelines processing millions of daily data points.",
  },
  {
    id: "03",
    category: "AI / ML",
    title: "SEMANTIC SEARCH & RAG INGESTION",
    description: "Domain knowledge grounding with citation tracing, low latency, and zero hallucinations.",
  },
  {
    id: "04",
    category: "SECURITY",
    title: "ZERO-TRUST & CRYPTOGRAPHIC AUDITING",
    description: "Immutability protocols, mTLS inter-service authentication, and strict compliance enforcement.",
  },
  {
    id: "05",
    category: "INTERFACE",
    title: "HIGH-DENSITY MISSION CONSOLES",
    description: "Ergonomic, information-rich web interfaces engineered for complex operational workflows.",
  },
  {
    id: "06",
    category: "INFRASTRUCTURE",
    title: "CONTAINER ORCHESTRATION & SRE",
    description: "Production Kubernetes deployments with automated failover, canary testing, and metrics observability.",
  },
  {
    id: "07",
    category: "BRAND",
    title: "IDENTITY ARCHITECTURE & DESIGN SYSTEMS",
    description: "Scalable vector mark suites, design token libraries, and strict multi-platform brand specifications.",
  },
  {
    id: "08",
    category: "CREATIVE",
    title: "EDITORIAL GRAPHICS & COLLATERAL",
    description: "Executive pitch decks, institutional company profiles, and high-density technical whitepaper layouts.",
  },
];

/**
 * Brand & Creative Service Family (Spec: docs/GERAT_BRAND_CREATIVE_PERSONAL_BRANDING_SPEC.md)
 */
export const brandCreativeFamily = [
  {
    id: "brand-strategy",
    num: "01",
    title: "BRAND STRATEGY",
    shortDesc: "Define what the brand stands for, who it serves, how it should be perceived, and what makes it different.",
    longDesc: "Strong visual identity begins with clarity. We help define positioning, audience, value proposition, personality, messaging direction, and the strategic foundation that the visual identity expresses.",
    deliverables: [
      "Brand Discovery & Market Review",
      "Audience Definition & Core Value Proposition",
      "Strategic Positioning & Personality Matrix",
      "Messaging Pillars & Narrative Direction",
      "Creative Direction Blueprint",
    ],
    cta: "BUILD MY BRAND STRATEGY",
  },
  {
    id: "logo-design",
    num: "02",
    title: "LOGO DESIGN",
    shortDesc: "A distinctive mark designed to work across digital, print, products, and real-world applications.",
    longDesc: "We create logo systems that are recognizable, adaptable, and practical — from the primary mark to compact versions, icons, and variations for different backgrounds and sizes.",
    deliverables: [
      "Primary & Secondary Logo Lockups",
      "Symbol / Monogram / Icon Mark",
      "Dark, Light & Monochrome Variants",
      "Scalable Favicon & App Icon Formats",
      "Comprehensive Production Export Package",
    ],
    formats: ["SVG", "PDF", "EPS / AI Source", "High-Res PNG", "Lossless WebP"],
    cta: "DESIGN MY LOGO",
  },
  {
    id: "brand-identity",
    num: "03",
    title: "BRAND IDENTITY",
    shortDesc: "More than a logo: a complete visual system that makes the brand recognizable wherever it appears.",
    longDesc: "We turn strategy into a flexible identity system — logo, typography, color, imagery, graphics, layouts, and rules that help the brand stay consistent as it grows.",
    deliverables: [
      "Complete Logo System & Sub-Marks",
      "Technical Color System (HEX, RGB, CMYK)",
      "Typographic Hierarchy & Web Font Pairing",
      "Graphic Language, Iconography & Grid Architecture",
      "Digital & Physical Application Templates",
      "Production-Ready Brand Style Guide",
    ],
    applications: [
      "Digital: Website, Web Apps, Social Media, Presentations, Email Signatures",
      "Physical: Business Cards, Letterheads, Company Profiles, Signage, Event Materials",
    ],
    cta: "BUILD MY BRAND IDENTITY",
  },
  {
    id: "graphic-design",
    num: "04",
    title: "GRAPHIC DESIGN",
    shortDesc: "Purpose-built graphics for the moments where your brand needs to communicate clearly and look consistent.",
    longDesc: "We design visual communication that makes complex information clearer and brands more consistent across executive decks, profiles, reports, and marketing collateral.",
    deliverables: [
      "Institutional Company Profiles",
      "Investor & Executive Pitch Decks",
      "Brochures, Whitepapers & Annual Reports",
      "Infographics & Technical Architectural Diagrams",
      "High-Impact Digital & Print Collateral",
    ],
    cta: "COMMISSION GRAPHIC DESIGN",
  },
  {
    id: "social-design",
    num: "05",
    title: "SOCIAL & MARKETING DESIGN",
    shortDesc: "Turn the brand into a consistent visual system for everyday communication.",
    longDesc: "We build reusable design systems and post architectures that maintain visual excellence across everyday digital touchpoints.",
    deliverables: [
      "Modular Social Template Systems",
      "Technical Carousel & Deep-Dive Frameworks",
      "Story & Announcement Layouts",
      "Campaign Ad Creatives & Launch Assets",
      "Presentation & Webinar Graphics",
    ],
    cta: "BUILD SOCIAL SYSTEM",
  },
  {
    id: "personal-branding",
    num: "06",
    title: "PERSONAL BRANDING",
    shortDesc: "Your name is part of your business. Make it count.",
    longDesc: "We help founders, executives, professionals, and technology leaders turn their story and domain expertise into a coherent, authoritative personal brand.",
    deliverables: [
      "Executive Positioning & Audience Mapping",
      "Personal Typographic Identity & Monogram",
      "Editorial Photography Direction & Shot Lists",
      "LinkedIn Profile Architecture & Banner System",
      "High-Converting Personal Authority Website",
      "Founder Content Strategy & Thought-Leadership Pillars",
      "Launch Rollout & Announcement Kit",
    ],
    cta: "BUILD MY PERSONAL BRAND",
  },
];

/**
 * Integrated Service Packages (Internal Lead Framework)
 */
export const creativeServicePackages = [
  {
    id: "launch-brand",
    name: "LAUNCH BRAND",
    tagline: "FOUNDATIONAL IDENTITY SYSTEM",
    desc: "Complete visual foundation for emerging ventures ready to make a serious market entrance.",
    included: [
      "Brand Strategy & Positioning",
      "Primary & Secondary Logo Suite",
      "Core Color & Typography Tokens",
      "Social Starter Template Kit",
      "Official Brand Guidelines Document",
    ],
  },
  {
    id: "brand-digital",
    name: "BRAND + DIGITAL",
    tagline: "FROM IDENTITY TO WEB EXPERIENCE",
    desc: "Seamless bridge connecting visual brand identity directly with an editorial web application.",
    included: [
      "Complete Brand Strategy & Identity",
      "Production Vector & Collateral Package",
      "Bespoke High-Performance Website",
      "Custom Micro-Interactions & Motion",
      "Digital Asset System & Handoff",
    ],
  },
  {
    id: "founder-presence",
    name: "FOUNDER PRESENCE",
    tagline: "EXECUTIVE AUTHORITY ENGINE",
    desc: "Strategic personal branding framework engineered for technology founders, CEOs, and industry authorities.",
    included: [
      "Personal Positioning & Narrative Strategy",
      "Monogram & Personal Identity Suite",
      "Photography Direction & Shot Framework",
      "LinkedIn Profile Redesign & Banner System",
      "Dedicated Personal Executive Website",
    ],
  },
  {
    id: "product-launch",
    name: "PRODUCT LAUNCH",
    tagline: "END-TO-END PRODUCT STORY",
    desc: "Brand identity, product UI direction, and launch motion collateral for new software platforms.",
    included: [
      "Product Brand Strategy & Sub-Mark",
      "UI Design Direction & Component System",
      "Interactive Product Launch Website",
      "Motion Assets & Release Deck",
      "Marketing Collateral Suite",
    ],
  },
];
