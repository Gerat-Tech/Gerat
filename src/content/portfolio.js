/**
 * Gerat Flagship Portfolio Projects Dataset (Spec §29, Content Replacement §8)
 */
export const portfolioProjects = [
  {
    id: "national-records",
    index: "01",
    num: "01 · 06",
    title: "NATIONAL DIGITAL RECORDS ENGINE",
    category: "PUBLIC SECTOR",
    tags: "RECORDS MANAGEMENT & VERIFICATION",
    metric: "SECURE ARCHIVAL · FAST VERIFICATION",
    metricDetail: "VERIFIED RECORDS · AUDIT TRAILS · HIGH RELIABILITY",
    summary:
      "A secure digital records system designed for fast document indexing, verifiable audit trails, and multi-team record governance.",
    problem:
      "Fragmented physical archives and manual processing created long lookup delays and vulnerable document integrity.",
    architecture:
      "Built a structured archival database with role-based access control, cryptographic verification, and tamper-evident audit logging.",
    tech: "POSTGRESQL · NEXT.JS · SECURE AUDITING · NODE.JS",
    stack: ["Next.js", "PostgreSQL", "Node.js", "Docker", "Tailwind CSS"],
    image: "/image/portfolioPage/US-AUT-3.webp",
    impact:
      "Modernized registry operations across key departments, reducing record verification turnaround from days to minutes.",
    year: "2025",
    status: "PRODUCTION · STABLE",
  },
  {
    id: "axiom-erp",
    index: "02",
    num: "02 · 06",
    title: "AXIOM ENTERPRISE ERP & SUPPLY SUITE",
    category: "ENTERPRISE ERP",
    tags: "OPERATIONS & SUPPLY LOGISTICS",
    metric: "STREAMLINED WORKFLOWS · 99.9% UPTIME",
    metricDetail: "CENTRALIZED LOGISTICS · 14 FACILITIES SYNCHRONIZED",
    summary:
      "Enterprise resource planning platform managing multi-facility supply chains, automated reconciliation, and operational logistics.",
    problem:
      "Complex cross-facility inventory and warehouse logistics suffered from reconciliation lag and disconnected legacy billing databases.",
    architecture:
      "Unified inventory data, real-time stock updates, automated purchase orders, and ledger balancing into a single clean platform.",
    tech: "REACT · NODE.JS · POSTGRESQL · TAILWIND",
    stack: ["React", "Node.js", "PostgreSQL", "Tailwind CSS", "Redis"],
    image: "/image/portfolioPage/stratahub-featured.webp",
    impact:
      "Unified 14 distribution facilities into a synchronized system, saving operational teams dozens of hours each week.",
    year: "2024",
    status: "PRODUCTION · ACTIVE",
  },
  {
    id: "synapse-rag",
    index: "03",
    num: "03 · 06",
    title: "SYNAPSE KNOWLEDGE RAG ENGINE",
    category: "AI & RAG",
    tags: "INTELLIGENT SYSTEMS & PRACTICAL AI",
    metric: "INSTANT RETRIEVAL · ACCURATE CITATIONS",
    metricDetail: "VERIFIED CITATIONS · FAST ACCURACY · MULTI-TENANT",
    summary:
      "Intelligent search and retrieval system orchestrating modern language models and vector indexes to deliver instant, cited answers from complex archives.",
    problem:
      "Research and operations teams spent hours manually cross-referencing conflicting manuals, regulatory documents, and policies.",
    architecture:
      "Deployed semantic search with vector indexing and strict citation grounding so teams can verify every answer against source material.",
    tech: "PYTHON · FASTAPI · VECTOR SEARCH · NEXT.JS",
    stack: ["Python", "FastAPI", "Vector Search", "Next.js", "Tailwind CSS"],
    image: "/image/portfolioPage/Alph-1_2026-02-17-164533_rxel.webp",
    impact:
      "Indexed extensive organizational archives, helping teams retrieve verified answers and reducing research overhead by over 70%.",
    year: "2025",
    status: "PRODUCTION · ACTIVE",
  },
  {
    id: "telecom-telemetry",
    index: "04",
    num: "04 · 06",
    title: "REMOTE FACILITY MONITORING SYSTEM",
    category: "TELEMETRY",
    tags: "HARDWARE & SENSOR MONITORING",
    metric: "REAL-TIME ALERTS · RELIABLE UPTIME",
    metricDetail: "INSTANT ALERTS · PREDICTIVE MONITORING · ZERO LOSS",
    summary:
      "An operational monitoring platform tracking equipment runtimes, power grid fluctuations, and temperature across remote facility sites.",
    problem:
      "Power instability at remote stations led to unexpected equipment failure without granular real-time visibility.",
    architecture:
      "Built a reliable sensor ingestion pipeline with automated threshold alerts that notify operational teams before failures happen.",
    tech: "NODE.JS · TIME-SERIES DB · REACT · WEBSOCKETS",
    stack: ["Node.js", "TimescaleDB", "React", "WebSockets", "Tailwind CSS"],
    image: "/image/portfolioPage/US-AUT-1.webp",
    impact:
      "Prevented recurring equipment outages through early automated warning notifications and simplified dispatch.",
    year: "2024",
    status: "PRODUCTION · STABLE",
  },
  {
    id: "coffee-traceability",
    index: "05",
    num: "05 · 06",
    title: "COFFEE EXPORT & TRACEABILITY ERP",
    category: "ENTERPRISE ERP",
    tags: "SUPPLY CHAIN & EXPORT LOGISTICS",
    metric: "END-TO-END TRACKING · DIGITAL COMPLIANCE",
    metricDetail: "TRACEABLE BATCHES · COMPLIANCE CYCLE CUT BY 80%",
    summary:
      "Full-cycle export tracking software integrating lot quality scores, warehouse consignments, and automated customs documentation.",
    problem:
      "Manual paper documentation created customs bottlenecks and increased logistics overhead at export checkpoints.",
    architecture:
      "Digitized lot tracking from warehouse intake to export dispatch with automated documentation and compliance verification.",
    tech: "NEXT.JS · TYPESCRIPT · PRISMA · POSTGRESQL",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS"],
    image: "/image/portfolioPage/US-AUT-2.webp",
    impact:
      "Cut export documentation turnaround times from weeks to hours, streamlining cargo clearance and reducing administrative delay.",
    year: "2025",
    status: "PRODUCTION · ACTIVE",
  },
  {
    id: "clinical-records",
    index: "06",
    num: "06 · 06",
    title: "CLINICAL DIAGNOSTIC INTEGRATION BUS",
    category: "PUBLIC SECTOR",
    tags: "HEALTHCARE & CLINICAL SYSTEMS",
    metric: "SECURE INTEGRATION · 100% AUDIT COMPLIANCE",
    metricDetail: "18 CLINICS CONNECTED · VERIFIED LAB RESULTS",
    summary:
      "A secure clinical integration system syncing diagnostic laboratory equipment with medical record systems for faster patient care.",
    problem:
      "Disconnected diagnostic laboratory equipment required manual transcription of critical lab outcomes, creating latency and data entry risks.",
    architecture:
      "Standardized healthcare data exchange with encrypted transport and immediate clinician notification.",
    tech: "NEXT.JS · NODE.JS · POSTGRESQL · TAILWIND",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Tailwind CSS"],
    image: "/image/portfolioPage/US-AUT-4.webp",
    impact:
      "Connected 18 diagnostic facilities, providing clinicians with instant, secure access to verified laboratory results.",
    year: "2024",
    status: "PRODUCTION · STABLE",
  },
  {
    id: "axiom-brand",
    index: "07",
    num: "07 · 09",
    title: "AXIOM IDENTITY SYSTEM & DESIGN LANGUAGE",
    category: "BRAND & IDENTITY",
    tags: "BRAND STRATEGY · VISUAL IDENTITY · DESIGN SYSTEM",
    metric: "COMPLETE DESIGN SYSTEM · 140+ ASSETS · MULTI-PLATFORM",
    metricDetail: "UNIFIED IDENTITY SYSTEM · 140+ PRODUCTION ASSETS · FULL DIGITAL + PRINT SUITE",
    summary:
      "A complete visual architecture and brand design system engineered for an industrial logistics conglomerate spanning brand guidelines, vector marks, and collateral.",
    problem:
      "Disjointed sub-brands and inconsistent marketing collateral weakened market authority and customer recognition across digital and physical operations.",
    architecture:
      "Constructed a high-contrast visual identity, precision geometric mark, strict typography rules, and production templates for digital and print.",
    tech: "FIGMA · VECTOR SUITE · DESIGN TOKENS · EDITORIAL PRINT",
    stack: ["Vector Geometry", "Design Tokens", "Print Collateral", "Brand Guidelines", "Figma"],
    image: "/image/portfolioPage/stratahub-featured.webp",
    impact:
      "Unified 5 corporate subsidiaries into a single authoritative identity system, cutting collateral production cycles by 60% and increasing brand recall across institutional tenders.",
    year: "2025",
    status: "DEPLOYED · GUIDELINES ACTIVE",
  },
  {
    id: "synapse-brand",
    index: "08",
    num: "08 · 09",
    title: "SYNAPSE AI PRODUCT BRAND & EDITORIAL ENGINE",
    category: "BRAND & IDENTITY",
    tags: "PRODUCT IDENTITY · GRAPHIC DESIGN · MARKETING",
    metric: "PRODUCT LAUNCH ASSETS · COMPREHENSIVE SUITE",
    metricDetail: "PRODUCT IDENTITY & LAUNCH SUITE · 200+ ASSETS · MULTI-CHANNEL",
    summary:
      "End-to-end brand identity, technical whitepaper layouts, and marketing launch collateral designed for an intelligent software platform.",
    problem:
      "Deep technical software capabilities lacked an accessible visual presentation needed to win customer confidence and enterprise trust.",
    architecture:
      "Created a modern visual identity featuring custom architecture diagrams, product mockups, and modular marketing assets.",
    tech: "TYPOGRAPHY SYSTEM · DATA VISUALIZATION · MARKETING ASSETS",
    stack: ["Vector Graphics", "Typography Hierarchy", "Technical Infographics", "Social Kit"],
    image: "/image/portfolioPage/Alph-1_2026-02-17-164533_rxel.webp",
    impact:
      "Established a clear market presence at release, enabling sales teams to present technical concepts simply to business buyers.",
    year: "2025",
    status: "PRODUCTION · ACTIVE",
  },
  {
    id: "meridian-executive",
    index: "09",
    num: "09 · 09",
    title: "EXECUTIVE AUTHORITY & PERSONAL BRANDING",
    category: "PERSONAL BRAND",
    tags: "PERSONAL BRANDING · EXECUTIVE POSITIONING · DIGITAL PRESENCE",
    metric: "AUTHORITATIVE WEB ASSET · STRATEGIC REACH",
    metricDetail: "EXECUTIVE PRESENCE LAUNCH · BESPOKE DIGITAL ASSET · STRATEGIC REACH",
    summary:
      "Strategic personal branding framework for a prominent technology founder and infrastructure investor, encompassing narrative positioning, visual monogram, and executive web presence.",
    problem:
      "Extensive industry accomplishments were scattered across unstructured channels, lacking a singular cohesive digital asset representing executive authority.",
    architecture:
      "Crafted an executive narrative blueprint, bespoke typographic monogram mark, content framework, and personal portfolio site.",
    tech: "EXECUTIVE POSITIONING · MONOGRAM · EDITORIAL WEB · LINKEDIN ARCHITECTURE",
    stack: ["Positioning Strategy", "Typographic Monogram", "Editorial Direction", "Next.js"],
    image: "/image/portfolioPage/US-AUT-1.webp",
    impact:
      "Elevated executive visibility across business circles, supporting inbound advisory inquiries and industry keynote invitations.",
    year: "2025",
    status: "LIVE · ACTIVE",
  },
];
