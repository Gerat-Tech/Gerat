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
];
