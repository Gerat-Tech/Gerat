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

  // 1. Seed Root Admin User
  const adminPassword = await bcrypt.hash("GeratAdmin2026!#", 10);

  // Migrate legacy @gerat.et user emails to official @gerat.com
  await prisma.user.updateMany({ where: { email: "admin@gerat.et" }, data: { email: "admin@gerat.com" } });

  const superAdmin = await prisma.user.upsert({
    where: { email: "admin@gerat.com" },
    update: {
      passwordHash: adminPassword,
      role: "SUPER_ADMIN",
      active: true,
    },
    create: {
      email: "admin@gerat.com",
      name: "Dawit (Principal Architect)",
      passwordHash: adminPassword,
      role: "SUPER_ADMIN",
      title: "Executive Director & Principal Architect",
      active: true,
    },
  });

  console.log("  ✓ Created/verified primary administrative user (Super Admin: admin@gerat.com)");

  // 2. Seed Portfolio Case Studies
  let projectOrder = 1;
  for (const p of portfolioProjects) {
    const projectData = {
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
    };
    await prisma.caseStudy.upsert({
      where: { slug: p.id },
      update: projectData,
      create: projectData,
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
        content: `# ${a.title}\n\n${a.excerpt}\n\n### Abstract & Findings\n\nThis research paper documents institutional and enterprise implementation observations by Gerat Software Solution.`,
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
    const data = {
      name: m.name,
      roleTitle: m.role,
      division: "EXECUTIVE_LEADERSHIP",
      focusTag: m.specialty,
      bio: m.bio,
      photoUrl: m.image,
      email: m.email || null,
      linkedinUrl: m.linkedinUrl || null,
      twitterUrl: m.twitterUrl || null,
      githubUrl: m.githubUrl || null,
      order: memberOrder++,
      active: true,
    };
    const existing = await prisma.teamMember.findFirst({ where: { OR: [{ id: slugId }, { name: m.name }] } });
    if (!existing) {
      await prisma.teamMember.create({ data: { id: slugId, ...data } });
    } else {
      await prisma.teamMember.update({ where: { id: existing.id }, data });
    }
  }

  for (const m of engineeringSpecialists) {
    const slugId = (m.name || m.role).toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const data = {
      name: m.name,
      roleTitle: m.role,
      division: "ENGINEERING_PRACTITIONER",
      focusTag: m.discipline,
      bio: m.focus,
      photoUrl: m.image || "/brand/gerat-mark-orange.svg",
      email: m.email || null,
      linkedinUrl: m.linkedinUrl || null,
      twitterUrl: m.twitterUrl || null,
      githubUrl: m.githubUrl || null,
      order: memberOrder++,
      active: true,
    };
    const existing = await prisma.teamMember.findFirst({
      where: { OR: [{ id: slugId }, { name: m.name }, { roleTitle: m.role }] },
    });
    if (!existing) {
      await prisma.teamMember.create({ data: { id: slugId, ...data } });
    } else {
      await prisma.teamMember.update({ where: { id: existing.id }, data });
    }
  }
  console.log(`  ✓ Seeded ${leadershipTeam.length + engineeringSpecialists.length} team members`);

  // 5. Seed Practice Pillars (4 Core Pillars)
  await prisma.servicePillar.deleteMany({
    where: { num: { notIn: servicePillars.map((p) => p.num) } },
  });

  let pillarOrder = 1;
  for (const p of servicePillars) {
    const pillarData = {
      num: p.num,
      title: p.title,
      tagline: p.tagline,
      desc: p.desc,
      deliverables: JSON.stringify(p.deliverables || []),
      deepLink: p.deepLink || "/services",
      order: pillarOrder++,
      active: true,
    };
    const existing = await prisma.servicePillar.findFirst({ where: { num: p.num } });
    if (!existing) {
      await prisma.servicePillar.create({ data: pillarData });
    } else {
      await prisma.servicePillar.update({
        where: { id: existing.id },
        data: pillarData,
      });
    }
  }
  console.log(`  ✓ Seeded ${servicePillars.length} service pillars`);

  // 6. Seed Site Configuration
  await prisma.siteConfig.upsert({
    where: { key: "COMPANY_NAME" },
    update: { value: siteConfig.name },
    create: {
      key: "COMPANY_NAME",
      value: siteConfig.name,
      description: "Official legal entity name",
    },
  });

  await prisma.siteConfig.upsert({
    where: { key: "CONTACT_EMAIL" },
    update: { value: siteConfig.contact.inquiries || "info@gerat.com" },
    create: {
      key: "CONTACT_EMAIL",
      value: siteConfig.contact.inquiries || "info@gerat.com",
      description: "Inquiry receipt email",
    },
  });

  await prisma.siteConfig.upsert({
    where: { key: "CONTACT_PHONE" },
    update: { value: siteConfig.contact.phone },
    create: {
      key: "CONTACT_PHONE",
      value: siteConfig.contact.phone,
      description: "Public direct phone hotline",
    },
  });

  console.log("  ✓ Seeded site configuration parameters");

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
