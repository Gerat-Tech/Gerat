/**
 * Gerat Ethos and Operational Principles Dataset (Spec §26, Content Replacement §5)
 */
export const ethosCards = [
  {
    number: "01",
    code: "VAL-01",
    title: "ENGINEERING OVER SPECULATION",
    statement:
      "We measure value by operational durability, transaction throughput, and real-world system reliability, not hype cycles.",
    detail:
      "Our software powers institutional backbones where failure is not an option. We build deterministic, mathematically verified systems that maintain integrity under peak stress.",
  },
  {
    number: "02",
    code: "VAL-02",
    title: "DEEP DOMAIN ARCHITECTURE",
    statement:
      "We immerse directly into the workflows of the industries we serve to eliminate friction at the structural level.",
    detail:
      "Off-the-shelf software inevitably fails bespoke business logic. We design tailored data models, database indices, and state machines engineered around your exact institutional domain.",
  },
  {
    number: "03",
    code: "VAL-03",
    title: "OBSERVABILITY & TRANSPARENCY",
    statement:
      "Every transaction, query, and background process is tracked through real-time telemetry and audit logs.",
    detail:
      "Modern enterprise systems require absolute introspection. We build comprehensive telemetry pipelines and monitoring into every tier of our software architectures.",
  },
  {
    number: "04",
    code: "VAL-04",
    title: "LONG-TERM SOVEREIGNTY",
    statement:
      "We deliver sovereign software assets with clean code, open standards, and zero predatory vendor lock-in.",
    detail:
      "Institutions must own their technological destiny. We architect clear interfaces, provide thorough engineering documentation, and ensure smooth operational handover.",
  },
];

export const methodologySteps = [
  {
    step: "01",
    name: "DOMAIN AUDIT",
    title: "ARCHITECTURAL DISCOVERY",
    description: "Rigorous audit of existing databases, bottleneck profiling, and operational constraints mapping.",
  },
  {
    step: "02",
    name: "SYSTEM SPECIFICATION",
    title: "FORMAL PROTOCOL DESIGN",
    description: "Definition of state transitions, database schema contracts, API schemas, and SLA boundaries.",
  },
  {
    step: "03",
    name: "PROTOTYPING",
    title: "CORE ENGINE VALIDATION",
    description: "Rapid iteration on core algorithmic loops, concurrency stress-testing, and data throughput benchmarks.",
  },
  {
    step: "04",
    name: "PLATFORM BUILD",
    title: "HIGH-FIDELITY IMPLEMENTATION",
    description: "Production development of frontend consoles, backend microservices, and database consensus.",
  },
  {
    step: "05",
    name: "AUDIT & HARDENING",
    title: "SECURITY & FAILURE TESTING",
    description: "Penetration testing, network partition simulation (chaos engineering), and compliance verification.",
  },
  {
    step: "06",
    name: "DEPLOYMENT & HANDOFF",
    title: "ZERO-DOWNTIME COMMENCEMENT",
    description: "Canary rollouts, telemetry pipeline connection, engineer training, and documentation transfer.",
  },
];
