import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  portfolioProjects,
  insightsArticles,
  leadershipTeam,
  engineeringSpecialists,
  servicePillars,
  siteConfig,
} from "../src/content/index.js";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Gerat Mission Control database...");

  // 1. Seed Users (Super Admin, Operations Lead, Technical Editor)
  const adminPassword = await bcrypt.hash("GeratAdmin2026!#", 10);
  const teamPassword = await bcrypt.hash("GeratTeam2026!#", 10);

  const superAdmin = await prisma.user.upsert({
    where: { email: "admin@gerat.et" },
    update: {},
    create: {
      email: "admin@gerat.et",
      name: "Dawit (Principal Architect)",
      passwordHash: adminPassword,
      role: "SUPER_ADMIN",
      title: "Executive Director & Principal Architect",
      active: true,
    },
  });

  const opsLead = await prisma.user.upsert({
    where: { email: "operations@gerat.et" },
    update: {},
    create: {
      email: "operations@gerat.et",
      name: "Client Operations Lead",
      passwordHash: teamPassword,
      role: "OPERATIONS_LEAD",
      title: "Head of Client Engagement & Solutions",
      active: true,
    },
  });

  const techEditor = await prisma.user.upsert({
    where: { email: "architect@gerat.et" },
    update: {},
    create: {
      email: "architect@gerat.et",
      name: "Lead Systems Architect",
      passwordHash: teamPassword,
      role: "TECHNICAL_EDITOR",
      title: "Staff Infrastructure Architect",
      active: true,
    },
  });

  const creativeEditor = await prisma.user.upsert({
    where: { email: "creative@gerat.et" },
    update: {},
    create: {
      email: "creative@gerat.et",
      name: "Brand & Creative Director",
      passwordHash: teamPassword,
      role: "CREATIVE_EDITOR",
      title: "Design Systems & Creative Lead",
      active: true,
    },
  });

  console.log("  ✓ Created/verified 4 administrative users (Super Admin, Ops Lead, Tech Editor, Creative Editor)");

  // 2. Seed Portfolio Case Studies
  let projectOrder = 1;
  for (const p of portfolioProjects) {
    await prisma.caseStudy.upsert({
      where: { slug: p.id },
      update: {},
      create: {
        slug: p.id,
        displayIndex: p.index,
        num: p.num || `${p.index} / 09`,
        title: p.title,
        category: p.category,
        tags: p.tags,
        metric: p.metric,
        metricDetail: p.metricDetail || p.metric,
        summary: p.summary,
        problem: p.problem,
        architecture: p.architecture,
        techStack: p.tech,
        stackBadges: JSON.stringify(p.stack || []),
        imageUrl: p.image,
        galleryImages: JSON.stringify([p.image]),
        impact: p.impact,
        year: p.year,
        status: p.status,
        featured: projectOrder <= 3,
        order: projectOrder++,
      },
    });
  }
  console.log(`  ✓ Seeded ${portfolioProjects.length} portfolio case studies`);

  // 3. Seed Insights Articles
  for (const a of insightsArticles) {
    await prisma.article.upsert({
      where: { slug: a.slug },
      update: {},
      create: {
        slug: a.slug,
        title: a.title,
        subtitle: a.subtitle || null,
        category: a.category,
        content: `# ${a.title}\n\n${a.excerpt}\n\n### Abstract & Findings\n\nThis research paper documents institutional and enterprise implementation observations by Gerat Software Solutions PLC.`,
        excerpt: a.excerpt,
        readingTime: a.readTime,
        coverImageUrl: a.image,
        tags: JSON.stringify(a.tags || []),
        status: "PUBLISHED",
        featured: Boolean(a.featured),
        authorId: superAdmin.id,
        publishedAt: new Date(a.date),
      },
    });
  }
  console.log(`  ✓ Seeded ${insightsArticles.length} research & insights publications`);

  // 4. Seed Team Members (Leadership + Practitioners)
  let memberOrder = 1;
  for (const m of leadershipTeam) {
    const slugId = m.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const existing = await prisma.teamMember.findFirst({ where: { name: m.name } });
    if (!existing) {
      await prisma.teamMember.create({
        data: {
          id: slugId,
          name: m.name,
          roleTitle: m.role,
          division: "EXECUTIVE_LEADERSHIP",
          focusTag: m.specialty,
          bio: m.bio,
          photoUrl: m.image,
          order: memberOrder++,
          active: true,
        },
      });
    }
  }

  for (const m of engineeringSpecialists) {
    const slugId = m.role.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const existing = await prisma.teamMember.findFirst({ where: { roleTitle: m.role } });
    if (!existing) {
      await prisma.teamMember.create({
        data: {
          id: slugId,
          name: m.role,
          roleTitle: m.role,
          division: "ENGINEERING_PRACTITIONER",
          focusTag: m.discipline,
          bio: m.focus,
          photoUrl: m.image,
          order: memberOrder++,
          active: true,
        },
      });
    }
  }
  console.log(`  ✓ Seeded ${leadershipTeam.length + engineeringSpecialists.length} team members`);

  // 5. Seed Practice Pillars
  let pillarOrder = 1;
  for (const p of servicePillars) {
    const existing = await prisma.servicePillar.findFirst({ where: { num: p.num } });
    if (!existing) {
      await prisma.servicePillar.create({
        data: {
          num: p.num,
          title: p.title,
          tagline: p.tagline,
          desc: p.desc,
          deliverables: JSON.stringify(p.deliverables || []),
          deepLink: p.num === "05" ? "/services/brand-creative" : p.num === "06" ? "/services/personal-branding" : "/why-wqf",
          order: pillarOrder++,
          active: true,
        },
      });
    }
  }
  console.log(`  ✓ Seeded ${servicePillars.length} service pillars`);

  // 6. Seed Site Configuration
  await prisma.siteConfig.upsert({
    where: { key: "COMPANY_NAME" },
    update: {},
    create: {
      key: "COMPANY_NAME",
      value: siteConfig.name,
      description: "Official legal entity name",
    },
  });

  await prisma.siteConfig.upsert({
    where: { key: "CONTACT_EMAIL" },
    update: {},
    create: {
      key: "CONTACT_EMAIL",
      value: siteConfig.contact.inquiries || "info@gerat.et",
      description: "Inquiry receipt email",
    },
  });

  await prisma.siteConfig.upsert({
    where: { key: "CONTACT_PHONE" },
    update: {},
    create: {
      key: "CONTACT_PHONE",
      value: siteConfig.contact.phone,
      description: "Public direct phone hotline",
    },
  });

  console.log("  ✓ Seeded site configuration parameters");

  // 7. Seed Sample Inquiries (for immediate testing of the CRM)
  const sampleInquiry = await prisma.inquiry.upsert({
    where: { telemetryCode: "GRT-ENG-202609-001248" },
    update: {},
    create: {
      telemetryCode: "GRT-ENG-202609-001248",
      status: "NEW_INTAKE",
      priority: "CRITICAL_ENTERPRISE",
      fullName: "Dr. Henok Tadesse",
      email: "henok.tadesse@apexlogistics.et",
      phone: "+251911223344",
      company: "Apex Logistics & Trade PLC",
      roleTitle: "Chief Operating Officer",
      discipline: "CUSTOM ERP & OPERATIONAL PLATFORMS",
      subServices: JSON.stringify(["Automated Supply Chain", "Multi-Entity Financial Ledger"]),
      timeline: "STANDARD (1-3 MONTHS)",
      budgetRange: "150K - 250K ETB",
      projectBrief: "We require a centralized multi-warehouse inventory reconciliation engine that integrates with local banks and automated customs declaration APIs.",
      sourceUrl: "/why-wqf",
      countryCode: "ET",
      assignedToId: opsLead.id,
      notes: {
        create: [
          {
            authorId: superAdmin.id,
            content: "High-value enterprise lead. Reviewed initial scope; matches our Axiom ERP architecture. Scheduling discovery call.",
            isPinned: true,
          },
        ],
      },
    },
  });

  const sampleBrandInquiry = await prisma.inquiry.upsert({
    where: { telemetryCode: "GRT-BRD-202609-008472" },
    update: {},
    create: {
      telemetryCode: "GRT-BRD-202609-008472",
      status: "TRIAGED",
      priority: "HIGH",
      fullName: "Sara Alemayehu",
      email: "sara@auracapital.et",
      phone: "+251922334455",
      company: "Aura Capital Partners",
      roleTitle: "Managing Partner",
      discipline: "BRAND STRATEGY & IDENTITY",
      subServices: JSON.stringify(["Primary & Monogram Logo", "Design Token Standards", "Corporate Collateral"]),
      timeline: "URGENT (2-4 WEEKS)",
      budgetRange: "75K - 150K ETB",
      projectBrief: "Launching a modern technology venture fund in East Africa. We need an authoritative, dark-mode visual identity system, pitch deck templates, and web guidelines.",
      sourceUrl: "/services/brand-creative",
      countryCode: "ET",
      assignedToId: opsLead.id,
      notes: {
        create: [
          {
            authorId: opsLead.id,
            content: "Connected on WhatsApp. Client confirmed budget and urgent timeline. Sent discovery questionnaire.",
            isPinned: false,
          },
        ],
      },
      communications: {
        create: [
          {
            actorId: opsLead.id,
            channel: "WHATSAPP",
            subject: "Initial Outreach & Scope Confirmation",
            summary: "Sent formal WhatsApp greeting referencing telemetry code. Client responded within 10 minutes.",
            outcome: "Discovery Zoom call scheduled for Wednesday 10:00 AM EAT.",
          },
        ],
      },
    },
  });

  console.log("  ✓ Seeded 2 sample inquiries with notes & communication history");

  // Initial Audit Log
  await prisma.auditLog.create({
    data: {
      actorId: superAdmin.id,
      action: "DATABASE_INITIAL_SEED",
      entityType: "SYSTEM",
      entityId: "SYSTEM_INITIALIZE",
      diff: JSON.stringify({ message: "Initial database seed completed successfully." }),
    },
  });

  console.log("\n✅ Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
