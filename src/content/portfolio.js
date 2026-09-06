/**
 * Gerat Flagship Portfolio Projects Dataset (Spec §29, Content Replacement §8)
 */
export const portfolioProjects = [
  {
    id: "national-records",
    index: "01",
    num: "01 / 06",
    title: "NATIONAL DIGITAL RECORDS ENGINE",
    category: "PUBLIC SECTOR",
    tags: "PUBLIC SECTOR & INSTITUTIONAL",
    metric: "12M+ RECORDS // SUB-SECOND VERIFICATION",
    metricDetail: "12M+ RECORDS SECURED // SUB-SECOND VERIFICATION // 99.999% UPTIME",
    summary:
      "A distributed, high-throughput digital records system purpose-built for sub-second document indexing, verifiable audit trails, and multi-agency records governance.",
    problem:
      "Fragmented physical archives across regional bureaus created multi-week certificate processing times and vulnerable record integrity.",
    architecture:
      "Engineered a distributed, immutable ledger with cryptographic signature verification, zero-knowledge agency auditing, and automated identity reconciliation.",
    tech: "DISTRIBUTED POSTGRES // NEXT.JS // CRYPTOGRAPHIC AUDITING // GO",
    stack: ["Rust", "PostgreSQL", "Apache Kafka", "Docker", "TimescaleDB"],
    image: "/image/portfolioPage/US-AUT-3.webp",
    impact:
      "Replaced analog registry operations across 3 regional directorates, reducing certificate issuance times from 14 days to 4.2 minutes with cryptographic tamper-proofing.",
    year: "2025",
    status: "PRODUCTION // STABLE",
  },
  {
    id: "axiom-erp",
    index: "02",
    num: "02 / 06",
    title: "AXIOM ENTERPRISE ERP & SUPPLY SUITE",
    category: "ENTERPRISE ERP",
    tags: "ENTERPRISE LOGISTICS & OPERATIONS",
    metric: "45% CYCLE REDUCTION // 99.99% UPTIME",
    metricDetail: "45% CYCLE REDUCTION // 14 FACILITIES SYNCHRONIZED",
    summary:
      "Enterprise resource planning platform managing multi-facility supply chains, automated reconciliation, and institutional operational logistics.",
    problem:
      "Complex cross-border inventory and warehouse logistics suffered from reconciliation lag and disconnected legacy billing databases.",
    architecture:
      "Unified inventory, real-time telemetry, automated replenishment orders, and automated ledger balancing into a single event-driven hub.",
    tech: "REACT // NODE.JS // TIMESCALEDB // APACHE KAFKA",
    stack: ["Go", "gRPC", "Redis Enterprise", "Kubernetes", "Temporal"],
    image: "/image/portfolioPage/stratahub-featured.webp",
    impact:
      "Unified 14 regional distribution warehouses into a synchronized ledger, saving over 120 operational hours per week.",
    year: "2024",
    status: "PRODUCTION // ACTIVE",
  },
  {
    id: "synapse-rag",
    index: "03",
    num: "03 / 06",
    title: "SYNAPSE KNOWLEDGE RAG ENGINE",
    category: "AI & RAG",
    tags: "INTELLIGENT SYSTEMS & APPLIED AI",
    metric: "500K+ DOCUMENTS // 98.4% ACCURACY",
    metricDetail: "500K+ REGULATORY DOCUMENTS // 98.4% CITATION ACCURACY",
    summary:
      "Domain-grounded retrieval architecture orchestrating localized LLMs and dense vector indexes to deliver instant, cited intelligence from institutional archives.",
    problem:
      "Legal and policy research teams spent hundreds of hours manually cross-referencing conflicting institutional regulations.",
    architecture:
      "Deployed a multi-tenant RAG architecture with proprietary semantic chunking, dense vector indexes, and strict source citation grounding.",
    tech: "PYTHON // FASTAPI // QDRANT // LANGCHAIN // NEXT.JS",
    stack: ["Python", "FastAPI", "Qdrant", "Llama 3", "vLLM", "Next.js"],
    image: "/image/portfolioPage/Alph-1_2026-02-17-164533_rxel.webp",
    impact:
      "Indexed over 80,000 regulatory proclamations, supreme court rulings, and gazettes, reducing legal research overhead for commercial counsels by 78%.",
    year: "2025",
    status: "PRODUCTION // ACTIVE",
  },
  {
    id: "telecom-telemetry",
    index: "04",
    num: "04 / 06",
    title: "CELLULAR TOWER TELEMETRY PIPELINE",
    category: "TELEMETRY",
    tags: "HARDWARE & INDUSTRIAL IOT",
    metric: "120K EVENTS/SEC // <250MS ALERT SLA",
    metricDetail: "120K EVENTS/SEC STREAMED // <250MS ALERT SLA // ZERO EVENT LOSS",
    summary:
      "High-throughput edge sensor telemetry collector monitoring generator runtimes, power grid fluctuations, and temperature across remote infrastructure.",
    problem:
      "Power instability in remote transceiver stations caused unpredicted downtime without granular real-time visibility.",
    architecture:
      "Built a fault-tolerant edge ingestion pipeline using MQTT brokers, time-series compression, and automated anomaly alert dispatch.",
    tech: "ELIXIR / OTP // EMQX MQTT // CLICKHOUSE // GRAFANA",
    stack: ["Elixir / OTP", "EMQX MQTT", "ClickHouse", "Grafana", "React"],
    image: "/image/portfolioPage/US-AUT-1.webp",
    impact:
      "Prevented 142 unplanned power outages in year one through predictive battery thermal runoff detection and automated generator dispatch.",
    year: "2024",
    status: "PRODUCTION // EXPANDING",
  },
  {
    id: "coffee-traceability",
    index: "05",
    num: "05 / 06",
    title: "COFFEE EXPORT & TRACEABILITY ERP",
    category: "ENTERPRISE ERP",
    tags: "GLOBAL SUPPLY & LOGISTICS",
    metric: "$42M+ TRADE PROCESSED // 21 DAYS TO 38 HRS",
    metricDetail: "$42M+ TRADE PROCESSED // COMPLIANCE CYCLE CUT FROM 21 DAYS TO 38 HRS",
    summary:
      "Full-cycle export tracking software integrating lot cupping scores, warehouse consignments, and automated customs documentation.",
    problem:
      "Manual paper documentation created severe customs bottlenecks and high demurrage costs at international shipping ports.",
    architecture:
      "Digitized farm-to-port tracking with cryptographic lot verification, automated bill of lading generation, and regulatory reporting.",
    tech: "NEXT.JS // TYPESCRIPT // PRISMA // POSTGRESQL // AWS",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "AWS S3"],
    image: "/image/portfolioPage/US-AUT-2.webp",
    impact:
      "Automated document generation and Customs Authority validation, reducing export consignment turnaround times from 21 days to 38 hours.",
    year: "2025",
    status: "PRODUCTION // ACTIVE",
  },
  {
    id: "clinical-records",
    index: "06",
    num: "06 / 06",
    title: "CLINICAL DIAGNOSTIC INTEGRATION BUS",
    category: "PUBLIC SECTOR",
    tags: "HEALTHCARE & CIVIC SYSTEMS",
    metric: "18 MEDICAL CENTERS CONNECTED // 100% AUDIT COMPLIANCE",
    metricDetail: "18 MEDICAL CENTERS CONNECTED // 100% AUDIT COMPLIANCE",
    summary:
      "HL7 / FHIR-compliant clinical integration bus securely syncing laboratory pathology instruments, radiologic imaging systems, and patient electronic health records.",
    problem:
      "Disconnected diagnostic laboratory equipment required manual transcription of critical lab outcomes, creating latency and data entry risks.",
    architecture:
      "Standardized data exchange using HL7/FHIR microservices, end-to-end payload encryption, and real-time clinician notification webhooks.",
    tech: "NESTJS // POSTGRESQL // RABBITMQ // DOCKER // TAILWIND",
    stack: ["TypeScript", "NestJS", "PostgreSQL", "RabbitMQ", "React"],
    image: "/image/portfolioPage/US-AUT-4.webp",
    impact:
      "Deployed across 18 specialized diagnostic clinics, enabling instantaneous clinician review of patient laboratory results across municipal facilities.",
    year: "2024",
    status: "PRODUCTION // STABLE",
  },
  {
    id: "axiom-brand",
    index: "07",
    num: "07 / 09",
    title: "AXIOM IDENTITY SYSTEM & DESIGN LANGUAGE",
    category: "BRAND & IDENTITY",
    tags: "BRAND STRATEGY // VISUAL IDENTITY // DESIGN SYSTEM",
    metric: "COMPLETE DESIGN SYSTEM // 140+ ASSETS // MULTI-PLATFORM",
    metricDetail: "MONOLITHIC IDENTITY SYSTEM // 140+ PRODUCTION ASSETS // FULL DIGITAL + PRINT SUITE",
    summary:
      "A complete visual architecture and brand design system engineered for an industrial logistics conglomerate spanning brand guidelines, vector marks, and collateral.",
    problem:
      "Disjointed sub-brands and inconsistent marketing collateral weakened market authority and customer recognition across digital and physical operations.",
    architecture:
      "Constructed a high-contrast monolithic visual identity, precision geometric G-glyph mark, strict tokenized typography rules, and production templates for digital and print.",
    tech: "FIGMA // VECTOR SUITE // DESIGN TOKENS // EDITORIAL PRINT",
    stack: ["Vector Geometry", "Design Tokens", "Print Collateral", "Brand Guidelines", "Figma"],
    image: "/image/portfolioPage/stratahub-featured.webp",
    impact:
      "Unified 5 corporate subsidiaries into a single authoritative identity system, cutting collateral production cycles by 60% and increasing brand recall across institutional tenders.",
    year: "2025",
    status: "DEPLOYED // GUIDELINES ACTIVE",
  },
  {
    id: "synapse-brand",
    index: "08",
    num: "08 / 09",
    title: "SYNAPSE AI PRODUCT BRAND & EDITORIAL ENGINE",
    category: "BRAND & IDENTITY",
    tags: "PRODUCT IDENTITY // GRAPHIC DESIGN // MOTION",
    metric: "PRODUCT LAUNCH ASSETS // 3.2M SOCIAL IMPRESSIONS",
    metricDetail: "PRODUCT IDENTITY & LAUNCH SUITE // 3.2M COMBINED IMPRESSIONS // 280+ GRAPHIC ASSETS",
    summary:
      "End-to-end brand identity, technical whitepaper layouts, and marketing launch collateral designed for a frontier AI retrieval-augmented generation engine.",
    problem:
      "Deep technical capabilities lacked an accessible, high-credibility editorial design system required to win institutional enterprise trust.",
    architecture:
      "Created a high-density, mathematical visual identity featuring custom data-flow iconography, dark-mode technical infographics, and modular marketing carousels.",
    tech: "TYPOGRAPHY SYSTEM // DATA VISUALIZATION // MOTION ASSETS",
    stack: ["Vector Graphics", "Typography Hierarchy", "Technical Infographics", "Social Kit"],
    image: "/image/portfolioPage/Alph-1_2026-02-17-164533_rxel.webp",
    impact:
      "Established instant category leadership at release; technical whitepapers achieved 45,000+ institutional downloads in the first quarter post-launch.",
    year: "2025",
    status: "PRODUCTION // ACTIVE",
  },
  {
    id: "meridian-executive",
    index: "09",
    num: "09 / 09",
    title: "EXECUTIVE AUTHORITY & PERSONAL BRANDING",
    category: "PERSONAL BRAND",
    tags: "PERSONAL BRANDING // EXECUTIVE POSITIONING // DIGITAL PRESENCE",
    metric: "4.8X LINKEDIN REACH // 2 KEYNOTE APPOINTMENTS",
    metricDetail: "EXECUTIVE PRESENCE LAUNCH // 4.8X ENGAGEMENT MULTIPLIER // 2 GLOBAL KEYNOTE INVITATIONS",
    summary:
      "Strategic personal branding framework for a prominent technology founder and infrastructure investor, encompassing narrative positioning, visual monogram, and executive web presence.",
    problem:
      "Extensive industry accomplishments were scattered across unstructured channels, lacking a singular cohesive digital asset representing executive authority.",
    architecture:
      "Crafted an executive narrative blueprint, bespoke typographic monogram mark, editorial photography direction, LinkedIn profile architecture, and personal portfolio site.",
    tech: "EXECUTIVE POSITIONING // MONOGRAM // EDITORIAL WEB // LINKEDIN ARCHITECTURE",
    stack: ["Positioning Strategy", "Typographic Monogram", "Editorial Direction", "Next.js"],
    image: "/image/portfolioPage/US-AUT-1.webp",
    impact:
      "Elevated executive visibility across institutional circles, generating 2 international keynote invitations and 4.8x inbound venture inquiries within 90 days.",
    year: "2025",
    status: "LIVE // EXPANDING",
  },
];
