/**
 * Gerat Practice Pillars & Capabilities Dataset (Spec §27, Content Replacement §6, §7)
 */
export const servicePillars = [
  {
    num: "01",
    title: "ENTERPRISE SOFTWARE ARCHITECTURE",
    tagline: "HIGH-CONCURRENCY DISTRIBUTED SYSTEMS",
    desc: "We design and engineer resilient cloud-native architectures capable of handling complex transactional loads. Microservices, event buses, and zero-downtime database sharding.",
    deliverables: [
      "Fault-Tolerant Distributed Backends",
      "Event-Driven Architecture (Kafka / RabbitMQ)",
      "High-Performance REST & gRPC Gateways",
      "Database Sharding & Time-Series Storage",
    ],
  },
  {
    num: "02",
    title: "DOMAIN-GROUNDED AI & RAG NETWORKS",
    tagline: "VERIFIABLE REASONING & SEARCH",
    desc: "Production-grade Retrieval-Augmented Generation engines built for sensitive enterprise and institutional data. Zero hallucination tolerance with full citation audit trails.",
    deliverables: [
      "Custom Vector Indexing & Semantic Search",
      "Contextual Document Parsing & Chunking",
      "On-Premise & Localized LLM Orchestration",
      "Deterministic Regulatory Audit Trails",
    ],
  },
  {
    num: "03",
    title: "CUSTOM ERP & OPERATIONAL PLATFORMS",
    tagline: "SYNCHRONIZED BUSINESS OPERATIONS",
    desc: "Consolidate inventory, procurement, human capital, and real-time ledger accounting into a unified, high-integrity platform tailored strictly to your operational workflows.",
    deliverables: [
      "Automated Supply Chain Reconciliation",
      "Multi-Entity Financial Ledger Engines",
      "Real-Time Warehouse & Asset Tracking",
      "Role-Based Audit & Permission Control",
    ],
  },
  {
    num: "04",
    title: "PUBLIC-SECTOR & INSTITUTIONAL PLATFORMS",
    tagline: "CIVIC TECH AT NATIONAL SCALE",
    desc: "High-security digital governance infrastructure, citizen enrollment portals, and institutional document verification networks engineered for national resilience.",
    deliverables: [
      "Biometric-Enabled Citizen Registration",
      "Tamper-Evident Merkle Document Ledgers",
      "Inter-Agency Secure API Gateways",
      "Multi-Language Administrative Portals",
    ],
  },
  {
    num: "05",
    title: "BRAND STRATEGY, IDENTITY & DESIGN SYSTEMS",
    tagline: "COHESIVE VISUAL ARCHITECTURE",
    desc: "We build monolithic visual identities, scalable design systems, and vector mark architectures that command immediate credibility and translate seamlessly from print to code.",
    deliverables: [
      "Primary, Secondary & Monogram Logo Systems",
      "Design Token Standards & Typography Scales",
      "Corporate Collateral & Editorial Guidelines",
      "Production Vector Packages (SVG, EPS, PDF)",
    ],
  },
  {
    num: "06",
    title: "EXECUTIVE & FOUNDER PERSONAL BRANDING",
    tagline: "AUTHORITY & RECOGNITION PLATFORMS",
    desc: "We turn the expertise of founders, executives, and technology leaders into strategic personal brands through structured positioning, visual identity, and high-impact digital presence.",
    deliverables: [
      "Strategic Positioning & Core Narrative",
      "Personal Visual Identity & Monogram System",
      "Editorial Photography Direction & Shot Lists",
      "Executive Website & Content Distribution Architecture",
    ],
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
