# GERAT SOFTWARE SOLUTIONS PLC
# Content Replacement Guide for the Existing Portfolio Website
## Investor-friendly, non-technical, concise, human-sounding copy

**Website:** https://gerat-omega.vercel.app/  
**Starting/source repository:** https://github.com/rafikul-shaikh/world-quant  
**Purpose:** Replace the current WorldQuant Foundry test content with Gerat Software Solutions PLC content without changing the site's visual language, animations, or overall premium feel.

---

# 1. IMPORTANT IMPLEMENTATION NOTE

The hosted Vercel URL could not be directly crawled by the available web fetcher because it returned a cache-miss/error response.

To audit the current site structure and text, the implementation repository was inspected directly. The source shows the current homepage is composed of:

```text
Hero
Our Ethos
Our Focus
Our Portfolio
Our Leadership
Our Investors
Our Founders
Partners
Footer
```

The current project also contains dedicated:

```text
/why-wqf
/portfolio
/team
/insights
```

pages/components, plus a contact drawer.

The source repository confirms the current implementation contains WorldQuant-specific copy such as "Forging Companies That Pull The Future Forward", "Our Focus", "Exponential Technologies", "For Investors", "founders", etc. It also contains multiple unused/placeholder or development-oriented sections. These should be replaced rather than carried into the Gerat site.

Repository:
https://github.com/rafikul-shaikh/world-quant

Examples:
https://github.com/rafikul-shaikh/world-quant/blob/main/src/components/home/Hero.jsx
https://github.com/rafikul-shaikh/world-quant/blob/main/src/components/home/OurEthos.jsx
https://github.com/rafikul-shaikh/world-quant/blob/main/src/components/home/OurFocus.jsx
https://github.com/rafikul-shaikh/world-quant/blob/main/src/components/home/OurPortfolio.jsx
https://github.com/rafikul-shaikh/world-quant/blob/main/src/components/home/OurLeadership.jsx

---

# 2. THE MAIN CONTENT DECISION

The current homepage is too close to a **venture-fund / founder platform**.

Gerat is different.

Gerat is a:

> **technology, digital product, and brand partner**

The site should therefore answer, quickly:

```text
What does Gerat do?
Why should I trust Gerat?
What can Gerat build for me?
What is Madeya?
What work can I see?
How do I start?
```

Do NOT make a visitor understand:

```text
RAG
ERP
APIs
frontend
backend
architecture
vector databases
AI models
DevOps
```

before they understand the business value.

The website's first job is:

> **Make a non-technical visitor understand what Gerat can do for their business in less than a minute.**

---

# 3. CONTENT STRATEGY FROM SIMILAR HIGH-END STUDIOS

Several modern digital/product studios use a surprisingly simple pattern.

## Instrument

Instrument currently opens with:

> "We’re a digital-first design agency where creativity meets technology."

Then it summarizes its offer in a simple sentence:

> "We make brands, products, websites, and campaigns."

Its site groups work into broad, understandable areas such as:

```text
Brand
Marketing
Product
```

rather than exposing every technical discipline as a separate top-level service.

Source:
https://www.instrument.com/
https://www.instrument.com/work

## Work & Co

Work & Co uses:

> "We solve complex problems through design & technology"

and then organizes the site around:

```text
Work
Practice Areas
Outcomes
Process
Leadership
News & Insights
```

The technical complexity is behind the presentation, not the first sentence.

Source:
https://work.co/work

## Nightjar

Nightjar positions itself as a:

> "Design Technology Studio"

and explains its offer through a single high-level idea:

> "We solve complex business problems by unifying brand, experience and technology."

Its service story is then expressed through broader lifecycle concepts instead of a long technical menu.

Source:
https://nightjar.co/
https://nightjar.co/expertise

## Lunara

Lunara similarly uses:

> "Purpose before pixels."

and groups work into:

```text
Strategy & Experience
Digital Products
Business Platforms
Brand & Experience
```

AI is presented as something integrated into the work rather than another confusing list item.

Source:
https://lunaratech.com/

## Metalab

Metalab's portfolio pages explain projects using simple client-facing metadata:

```text
Project Type
Stage
Deliverables
```

rather than forcing the visitor to understand the technical architecture before seeing the result.

Source:
https://www.metalab.com/work

## High Five

High Five groups its services into four understandable disciplines:

```text
Product Design
Web Development
Mobile Applications
Brand & Identity
```

and then lists technologies underneath.

Source:
https://www.high-five-agency.com/

### CONTENT CONCLUSION

Gerat should copy the **information architecture idea**, not the wording:

```text
BIG PROMISE
→
4 CLEAR SERVICE AREAS
→
WHY US
→
FLAGSHIP PRODUCT
→
SELECTED WORK
→
PROCESS
→
CONTACT
```

Technical details belong deeper in the site.

---

# 4. HOMEPAGE — FINAL CONTENT STRUCTURE

The homepage should be short.

Recommended:

```text
1. Hero
2. How We Build the Bridge
3. Why Gerat
4. Selected Work
5. Process
6. Final CTA / Footer
```

The detailed:

```text
Team
Insights
Services
Case Studies
About
```

remain as dedicated pages.

**Madeya is NOT a separate homepage section.** It is one of Gerat's projects and should appear inside **Selected Work / Portfolio**, alongside other real projects.

This is the most important way to prevent overload.

> **Homepage = convince.  
> Inner pages = explain.**

---

# 5. SECTION 1 — HERO

## Label

```text
GERAT SOFTWARE SOLUTIONS PLC
```

## Headline

> **We build the bridge. You cross it.**

Keep this line because it gives the website one memorable idea.

Do not immediately explain the metaphor with a paragraph.

## Subhead

Recommended:

> **We connect your business to the people it serves — through digital experiences, intelligent tools, business systems, and strong brands.**

Alternative:

> **From websites and brand identity to AI and business systems, we build the digital foundation behind growing businesses.**

Recommended: first version.

## CTA

Primary:

> **See What We Build**

Secondary:

> **Start a Project**

## Small supporting labels

```text
DIGITAL
INTELLIGENCE
SYSTEMS
BRAND
```

Do not list:

```text
React
Next.js
Python
RAG
ERP
MongoDB
```

in the hero.

---

# 6. HERO COPY RULE

The first screen should NOT say:

> "We provide web development, ERP, RAG, machine learning, software development, UI/UX and graphic design services."

That is a service catalogue.

The hero should sell one idea:

> **Gerat connects businesses with the digital tools and experiences they need to move forward.**

---

# 7. SECTION 2 — THE BRIDGE EXPLAINED

## Section label

```text
01 / WHAT WE BUILD
```

## Section title

> **How we build the bridge.**

## Main headline

> **Every business needs a strong foundation, a clear path, and systems that can carry what comes next.**

This is better than explaining technology first.

---

# 8. FOUR SERVICE PILLARS

This is where the current large software/service list should be reduced.

Use exactly **four**.

```text
01
DIGITAL

02
INTELLIGENCE

03
SYSTEMS

04
BRAND
```

---

# 9. SERVICE 01 — DIGITAL

## Card title

> **Digital Experiences**

## Short description

> **Websites and digital products that make your business easier to discover, understand, and use.**

## Supporting examples

```text
Websites
Web Applications
Customer Portals
Digital Products
```

Do not put every technology here.

## CTA

> **Explore Digital**

---

# 10. SERVICE 02 — INTELLIGENCE

## Card title

> **AI & Intelligent Tools**

## Short description

> **Practical AI that helps people find information, automate work, and make better use of what they already know.**

## Supporting examples

```text
AI Assistants
RAG & Knowledge Systems
Intelligent Search
Automation
```

### Important

Use "AI & Intelligent Tools" in the main interface.

Use "RAG" only as a secondary detail.

A non-technical business owner may not know what RAG means.

---

# 11. SERVICE 03 — SYSTEMS

## Card title

> **Business Systems**

## Short description

> **Software that connects operations, people, and information so businesses can work with less friction.**

## Supporting examples

```text
ERP
Internal Platforms
Workflow Systems
Custom Software
```

## CTA

> **Explore Systems**

This is the correct place to put ERP.

Do NOT create separate main cards for:

```text
ERP
Backend Development
API Development
Database
Cloud
DevOps
```

Those are implementation capabilities.

---

# 12. SERVICE 04 — BRAND

## Card title

> **Brand & Creative**

## Short description

> **A clear identity that helps people recognize your business — from the logo to the way it shows up online.**

## Supporting examples

```text
Brand Strategy
Logo & Identity
Graphic Design
Personal Branding
```

## CTA

> **Explore Brand**

This connects directly to the new branding service.

---

# 13. FOUR-PILLAR SUMMARY

Use this exact structure if a compact visual block is needed:

```text
DIGITAL
Websites, web applications, digital products.

INTELLIGENCE
AI, knowledge systems, intelligent tools.

SYSTEMS
ERP, business platforms, custom software.

BRAND
Identity, graphic design, personal branding.
```

This is enough for the homepage.

---

# 14. WHAT TO REMOVE FROM THE CURRENT "OUR FOCUS"

The current starter uses:

```text
ADVANCEMOBILITY
ARTIFICIAL INTELLIGENCE
BIOTECHNOLOGY & GENOMICS
BLOCKCHAIN & DEFI
NEXT-GEN FINANCE
NEXT-GEN CONSUMER TECH
QUANTUM COMPUTING
ROBOTICS
BLOCKCHAIN
SPACE
```

Do NOT keep this.

It describes the reference company's investment thesis, not Gerat's service offering.

Replace the entire section with the four service pillars.

---

# 15. SECTION 3 — WHY GERAT

## Section label

```text
02 / WHY GERAT
```

## Headline

> **Built to hold weight.**

Keep the bridge language.

## Subhead

> **We care about what happens after the launch.**

## Main paragraph

> A good website can look impressive. A good system has to keep working. We build with reliability, clarity, and the next stage of the business in mind.

## Supporting points

Use only five:

```text
Scalable foundations
Clear communication
Functional-first design
Thoughtful technology
Ongoing support
```

This is much easier to understand than a long technical capabilities list.

---

# 16. "WHY GERAT" SECONDARY COPY

Optional short paragraph:

> **We bring design and engineering together so the experience people see is connected to the system behind it.**

This is a strong differentiator because your company spans:

```text
Brand
+
Digital
+
Software
+
AI
```

Similar integrated-studio positioning is used by Instrument, Nightjar, and Lunara.

Sources:
https://www.instrument.com/
https://nightjar.co/
https://lunaratech.com/

---

# 17. MADEYA AS A PROJECT

Madeya should appear as **one project inside Selected Work / Portfolio**.

It should not become a separate top-level homepage section or a separate primary navigation item.

The reason to feature it is that it demonstrates Gerat's ability to work on a real operational problem — but it should still be presented alongside other projects.

## Portfolio card

**MADEYA**

> A digital platform being developed to support more visible, coordinated, and accountable fuel distribution.

Category:

```text
PUBLIC-SECTOR TECHNOLOGY
```

CTA:

> **View Project**

The detailed Madeya case study can explain the problem, approach, solution, and verified outcomes.

Do not overload the homepage card with technical architecture.

The homepage should show **the project**, not turn Madeya into a separate service category.

---

# 18. WHY THE PROJECT MATTERS

The site should communicate this without turning Madeya into the company's identity.

The story should show:

```text
Gerat provides services
↓
Gerat understands real business problems
↓
Gerat builds and contributes to real products and systems
↓
Madeya is one example
↓
The same capabilities can be applied to future projects
```

This keeps Gerat positioned primarily as a **technology and service company with meaningful project experience**, rather than as a company whose website is centered around one product.

---

# 19. SECTION 4 — SELECTED WORK

## Section label

```text
03 / SELECTED WORK
```

## Headline

> **We build things people can actually use.**

## Supporting

> **A few examples of the products, platforms, and experiences we've helped shape.**

Show only **3–4** items on the homepage.

Madeya can be one of these items.

Do NOT show six large portfolio cards plus six technical descriptions.

---

# 20. PORTFOLIO CARD FORMAT

Each card should contain:

```text
PROJECT NAME

One-line explanation

CATEGORY
DIGITAL / SYSTEMS / INTELLIGENCE / BRAND

[VIEW PROJECT]
```

Optional:

```text
Year
```

Do not make every card carry:

```text
client
industry
location
technology
year
team
services
outcomes
```

on the homepage.

That belongs inside the case study.

---

# 21. MADEYA PORTFOLIO CARD

```text
MADEYA

A digital platform being developed to support more visible,
coordinated, and accountable fuel distribution.

PUBLIC-SECTOR TECHNOLOGY

[VIEW PROJECT]
```

This is a portfolio item, not a separate homepage service/product section.

---

# 22. OTHER PORTFOLIO ITEMS

Do not invent clients.

Where approved projects exist, use the real project names.

Until then, use project categories carefully:

```text
DIGITAL PRODUCT
A purpose-built web experience for a growing organization.

BUSINESS SYSTEM
A connected platform designed to simplify a complex workflow.

INTELLIGENT TOOL
An AI-powered knowledge experience built around useful information.
```

Replace these placeholders as soon as real projects are approved for publication.

---

# 23. SECTION 6 — PROCESS

## Section label

```text
05 / HOW WE WORK
```

## Headline

> **From blueprint to bridge.**

## Subhead

> **A clear process, from the first conversation to the finished system.**

Steps:

### 01 — Discover

> We understand the business, the people, the problem, and what success should look like.

### 02 — Design

> We turn that understanding into a clear experience, visual direction, and plan.

### 03 — Build

> We design and engineer the product, platform, or system.

### 04 — Launch

> We test, refine, and prepare it for real users.

### 05 — Support

> We stay involved as the product grows and the business changes.

This is intentionally simpler than technical process language.

---

# 24. OPTIONAL PROCESS MICROCOPY

Use a small line such as:

```text
CLEAR PLAN.
REAL BUILD.
NO GUESSWORK.
```

Do not add a long explanation below every step.

---

# 25. SECTION 7 — FINAL CTA / FOOTER

## Headline

> **Ready to connect your business to what comes next?**

Alternative that keeps your team's original language:

> **Ready to connect your brand to its audience?**

Recommended:

> **Ready to connect your business to what comes next?**

## Supporting

> **Let's build the bridge together.**

## CTA

> **Start Your Project**

Secondary:

> **Book a Consultation**

---

# 26. FOOTER COMPANY DESCRIPTION

Use:

> **Gerat Software Solutions PLC builds brands, digital products, intelligent tools, and business systems for companies and institutions.**

Shorter:

> **Brand. Digital. Intelligence. Systems.**

---

# 27. NAVIGATION

Do not put every capability in the navigation.

Recommended:

```text
WORK
SERVICES
MADEYA
INSIGHTS
ABOUT
CONTACT
```

Or:

```text
SERVICES
WORK
MADEYA
INSIGHTS
ABOUT
CONTACT
```

Keep the nav short.

---

# 28. SERVICES PAGE

Route:

```text
/services
```

Hero:

> **What we build.**

Supporting:

> **From the way your business looks to the systems behind how it works, Gerat brings brand, design, software, and intelligent technology together.**

Then only four primary service areas:

```text
01 DIGITAL EXPERIENCES

02 AI & INTELLIGENT TOOLS

03 BUSINESS SYSTEMS

04 BRAND & CREATIVE
```

---

# 29. DIGITAL EXPERIENCES PAGE

## Headline

> **Digital experiences that make business easier to see and easier to use.**

Description:

> We create websites and digital products that help organizations present themselves clearly, connect with their audience, and turn ideas into useful digital experiences.

Services:

```text
Websites
Web Applications
Customer Portals
Digital Products
```

CTA:

> **Start a Digital Project**

---

# 30. AI & INTELLIGENT TOOLS PAGE

## Headline

> **Make your information more useful.**

Description:

> We build practical AI systems that help teams find knowledge, automate repetitive work, and turn information into something people can act on.

Services:

```text
AI Assistants
RAG & Knowledge Systems
Intelligent Search
Automation
```

CTA:

> **Build an Intelligent Tool**

---

# 31. BUSINESS SYSTEMS PAGE

## Headline

> **The software behind the work.**

Description:

> We build connected business systems that bring people, workflows, and information together — from internal platforms to ERP and custom software.

Services:

```text
ERP
Operations Platforms
Workflow Systems
Custom Software
Integrations
```

CTA:

> **Build a Business System**

---

# 32. BRAND & CREATIVE PAGE

## Headline

> **Give your business something people can recognize.**

Description:

> We create brand identities and visual systems that make businesses clearer, more consistent, and easier to remember.

Services:

```text
Brand Strategy
Logo & Identity
Graphic Design
Social & Marketing Design
Personal Branding
```

CTA:

> **Build Your Brand**

---

# 33. ABOUT PAGE

## Hero

> **We build technology around real problems.**

Supporting:

> **Gerat Software Solutions PLC is a technology company combining design, software engineering, intelligent systems, and brand thinking to help businesses and institutions move forward.**

## Main story

> We started with software because software can change how a business works. But the best digital products are never only about code. They need clear thinking, good design, strong communication, and an understanding of the people who use them.

> Today, Gerat works across digital products, AI and intelligent tools, business systems, and brand & creative services — with a growing focus on building products of our own.

---

# 34. ABOUT — MISSION

> **Build practical technology that makes complex work simpler and more connected.**

# 35. ABOUT — VISION

> **Build a technology company capable of creating products, platforms, and businesses that deliver lasting value.**

---

# 36. ABOUT — VALUES

Keep only four:

```text
01 PURPOSE
Build around a real problem.

02 CRAFT
Care about the details that make a product work.

03 OWNERSHIP
Stay responsible beyond the launch.

04 CURIOSITY
Keep learning, testing, and improving.
```

Do not make a long 8–10 value list.

---

# 37. TEAM PAGE

## Hero

> **The people behind the work.**

Supporting:

> **A team of builders, designers, and problem-solvers working across technology and creative disciplines.**

For each member:

```text
NAME
ROLE

One short sentence about what they do.
```

Do not use generic bios such as:

> "Passionate innovator with a relentless commitment to excellence."

Use concrete language.

Example:

> **Dawit Teklebrhan — Software / AI**

> Builds digital products and intelligent systems, with a focus on practical software and AI applications.

Only publish verified roles.

---

# 38. WORK / PORTFOLIO PAGE

## Hero

> **Work that solves something.**

Supporting:

> **Explore selected products, platforms, digital experiences, and identities we've built or are building.**

Filters:

```text
ALL
DIGITAL
INTELLIGENCE
SYSTEMS
BRAND
```

This replaces the current reference's investment-sector style filters.

---

# 39. CASE STUDY INTRO

Instead of:

> "Our companies don't just enter markets. They define them."

Use:

> **Good work starts with a real problem.**

Then:

> **Here is what the problem was, what we built, and what changed.**

This sounds much more natural for a software/product agency.

---

# 40. CASE STUDY TEMPLATE

Every project should answer:

```text
WHAT WAS THE PROBLEM?

WHAT DID WE BUILD?

HOW DID WE APPROACH IT?

WHAT DID GERAT HANDLE?

WHAT CHANGED?
```

Then:

```text
Technology
Services
Timeline
Images
```

This keeps technical detail available without forcing it into the homepage.

Metalab uses a similar concise case-study metadata pattern such as project type, stage, and deliverables before the deeper case study. citeturn579753search4

---

# 41. INSIGHTS PAGE

## Hero

> **Things we're building. Things we're learning.**

Supporting:

> **News, product updates, ideas, and practical thinking from Gerat.**

Categories:

```text
ALL
NEWS
PRODUCT
TECHNOLOGY
BRAND
COMPANY
```

This is simpler than "Stories, reflections and advice from the Foundry team."

---

# 42. INSIGHTS — CONTENT RULE

Do not publish articles only because the website needs articles.

Write about:

```text
Madeya
Gerat product milestones
Client work
AI / RAG explained simply
Business software
Branding
Design
Technology decisions
Company updates
```

---

# 43. BLOG TITLES SHOULD SOUND HUMAN

Good:

> **What is RAG, really?**

> **Why a good website is more than a pretty homepage**

> **What we learned building for a complex workflow**

> **Why business software should feel simpler**

> **How we approached the identity for a new brand**

Bad:

> **Leveraging Cutting-Edge AI Innovations for Transformative Enterprise Optimization**

Avoid buzzword stacking.

---

# 44. MADEYA CASE STUDY PAGE

Madeya may have its own **case-study/project page** because it is important work, but it should be reached through **Selected Work / Portfolio** rather than treated as a separate top-level product category.

## Hero

> **Madeya**

> **Making fuel distribution easier to see, coordinate, and manage.**

## Problem

> **When a system is complex, visibility matters.**

## Description

> Fuel distribution involves multiple people, organizations, decisions, and handoffs. Madeya is being designed to bring those moving parts into a more connected operational view.

## System

```text
SUPPLY
↓
DISTRIBUTION
↓
DEPOTS
↓
STATIONS
↓
MONITORING
```

## Outcome statement

> **More visibility. Better coordination. Clearer decisions.**

Do not use stronger words such as:

> "eliminates corruption"

> "guarantees fair distribution"

> "revolutionizes fuel"

unless such claims are formally supported and approved.

---

# 45. CONTACT PAGE

## Hero

> **Let's build something that works.**

Supporting:

> **Tell us what you're trying to solve, what you're building, or where your business needs to go next.**

CTA:

> **Start a Conversation**

---

# 46. CONTACT FORM

The form should ask only enough to understand the request.

## First question

> **What can we help you build?**

Options:

```text
Website / Digital Product
AI / Intelligent Tool
Business System / ERP
Custom Software
Brand & Creative
Personal Branding
Madeya / Public-Sector Solution
Not Sure Yet
```

Do NOT list:

```text
Frontend
Backend
API
Database
RAG
Machine Learning
DevOps
```

in the first selection.

Those can appear conditionally later.

---

# 47. CONTACT FORM — PERSONAL BRANDING

If selected:

```text
Personal Branding
```

ask:

```text
Your name
What do you do?
What do you want to be known for?
What are you trying to achieve?
Do you need:
  Visual identity
  LinkedIn/profile branding
  Personal website
  Content direction
  Photography direction
```

---

# 48. CONTACT FORM — BRAND & CREATIVE

If selected:

```text
Brand & Creative
```

ask:

```text
Business / Brand name
What do you need?
  Brand strategy
  Logo
  Full identity
  Graphic design
  Social/marketing design
  Rebrand
```

Then:

```text
Tell us about the project
Timeline
Budget (optional)
```

---

# 49. CONTACT FORM — SOFTWARE

If selected:

```text
Website / Digital Product
AI / Intelligent Tool
Business System / ERP
Custom Software
```

ask:

```text
Business / Organization
What are you trying to solve?
Who will use it?
Timeline
Budget (optional)
Project details
```

Only then ask technical questions when they matter.

---

# 50. CONTACT FORM — PHONE / EMAIL

Make these clear:

```text
Email
Phone
WhatsApp
```

Use:

```text
How should we contact you?
```

Options:

```text
Email
Phone
WhatsApp
Any
```

---

# 51. HOMEPAGE MICROCOPY

Use this compact text map:

```text
HERO
We build the bridge. You cross it.

SUBHEAD
We connect your business to the people it serves — through digital experiences, intelligent tools, business systems, and strong brands.

SERVICES
How we build the bridge.

DIGITAL
Websites and digital products that make your business easier to discover, understand, and use.

INTELLIGENCE
Practical AI that helps people find information, automate work, and make better use of what they already know.

SYSTEMS
Software that connects operations, people, and information so businesses can work with less friction.

BRAND
A clear identity that helps people recognize your business — from the logo to the way it shows up online.

WHY
Built to hold weight.

WHY SUBHEAD
We care about what happens after the launch.

MADEYA
Technology for a fairer, more accountable fuel distribution system.

WORK
We build things people can actually use.

PROCESS
From blueprint to bridge.

FINAL CTA
Ready to connect your business to what comes next?

CTA
Start Your Project
```

---

# 52. CONTENT THAT SHOULD NOT APPEAR ON THE HOMEPAGE

Move these to deeper pages:

```text
Detailed technology stack
Long team biographies
Detailed case-study descriptions
Full article archive
Long service explanations
Technical architecture
Full process explanation
Every industry served
Every future venture
```

The homepage should use those details only as links.

---

# 53. CONTENT DENSITY RULE

Use:

```text
1 big idea
+
1 short explanation
+
1 action
```

per major section.

Avoid:

```text
1 heading
+
3 paragraphs
+
6 cards
+
10 bullets
+
3 CTAs
```

That makes a beautiful design feel heavy.

---

# 54. COPY LENGTH RULES

## Hero

```text
5–8 words headline
20–35 words supporting copy
1 primary CTA
1 secondary CTA
```

## Service card

```text
2–5 word title
15–25 word description
optional 3–4 examples
```

## Homepage section

```text
1 headline
1 short paragraph
1 CTA
```

## Case-study preview

```text
project name
1 sentence
category
CTA
```

---

# 55. LANGUAGE RULES FOR NON-TECHNICAL VISITORS

Prefer:

```text
business system
```

over:

```text
enterprise architecture

AI assistant
```

over:

```text
LLM-powered RAG orchestration

website
```

over:

```text
frontend application

connect systems
```

over:

```text
API integration

make information easier to find
```

over:

```text
semantic retrieval

software that grows with your business
```

over:

```text
scalable modular architecture
```

The technical version can still appear on service detail pages.

---

# 56. INVESTOR-FRIENDLY CONTENT PRINCIPLE

Investors should be able to understand three things quickly:

### 1. Gerat has a capability

> We can build digital products and systems.

### 2. Gerat has a real product

> Madeya is a product addressing a real operational problem.

### 3. Gerat has room to grow

> The same capability can produce more products, partnerships, and businesses.

Do not make unsupported statements about valuation, market size, user numbers, revenue, government contracts, or future success.

---

# 57. WHAT HAPPENS TO THE CURRENT "FOUNDERS / INVESTORS / PARTNERS" SECTIONS

These reference sections should **not remain as three major homepage sections**.

They were written for a venture-lab model.

Replace them with:

```text
FOUNDERS
→
HOW WE BUILD / PROCESS

INVESTORS
→
REMOVE FROM HOMEPAGE
(or use only on a future investor/company page if actually needed)

PARTNERS
→
SELECTED CLIENTS / PARTNERS
```

Only show real partners.

Do not invent logos.

---

# 58. WHAT HAPPENS TO "OUR LEADERSHIP"

Keep the visual pattern but shorten it.

Homepage:

```text
A small team of people building useful things.
[MEET THE TEAM]
```

Team page:

```text
full bios
roles
specialties
```

This preserves the premium visual treatment without using a large section for people who may be less important to a first-time buyer.

---

# 59. WHAT HAPPENS TO "OUR PORTFOLIO"

Rename:

> **Selected Work**

Reason:

"Portfolio" sounds like a designer/freelancer.

"Selected Work" feels more like a professional technology/design studio.

Keep the large image treatment.

Use fewer items.

---

# 60. WHAT HAPPENS TO "OUR FOCUS"

Rename:

> **What We Build**

Use:

```text
Digital
Intelligence
Systems
Brand
```

This is easier for a non-technical business owner to understand immediately.

---

# 61. WHAT HAPPENS TO "OUR ETHOS"

Rename:

> **Why Gerat**

Reason:

"Ethos" is abstract.

"Why Gerat" immediately tells a potential client:

> why should I work with you?

Keep the existing expandable-card interaction if visually useful, but replace the copy.

---

# 62. WHAT HAPPENS TO THE CONTACT DRAWER

The existing contact drawer is designed around:

```text
FOUNDER
INVESTOR
PARTNER
JOURNALIST
OTHER
```

Replace it with:

```text
I NEED HELP WITH

WEBSITE / DIGITAL
AI / INTELLIGENCE
BUSINESS SYSTEM
BRAND & CREATIVE
PERSONAL BRAND
MADeya / PUBLIC-SECTOR
OTHER
```

This is a much better lead-routing structure for Gerat.

---

# 63. CONTACT DRAWER HEADLINE

Replace:

> Talk to the Foundry team.

with:

> **Let's build something.**

Supporting:

> **Tell us what you're working on.**

Then the service selection.

Keep the existing visual drawer interaction.

---

# 64. FOOTER NAVIGATION

Recommended:

```text
WORK
SERVICES
MADEYA
INSIGHTS
ABOUT
CONTACT
```

Secondary:

```text
Privacy
Terms
LinkedIn
Email
Phone
```

---

# 65. FOOTER SERVICE GROUP

```text
DIGITAL
Websites
Digital Products

INTELLIGENCE
AI
Intelligent Tools

SYSTEMS
ERP
Business Software

BRAND
Identity
Graphic Design
Personal Branding
```

---

# 66. FOOTER FINAL LINE

> **Gerat Software Solutions PLC — Building brands, products, and systems for what comes next.**

---

# 67. SEO COPY

## Home title

> Gerat Software Solutions PLC | Digital Products, AI, Business Systems & Brand

## Home description

> Gerat builds digital products, intelligent tools, business systems, and brand identities for businesses and institutions.

## Services title

> Services | Digital, AI, Business Systems & Brand | Gerat

## Work title

> Selected Work | Gerat Software Solutions

## Madeya title

> Madeya | Fuel Distribution Technology by Gerat

## About title

> About Gerat Software Solutions PLC

## Insights title

> Insights | Gerat Software Solutions

## Contact title

> Start a Project | Gerat Software Solutions

---

# 68. SOCIAL / OG DESCRIPTION

> **Gerat Software Solutions PLC builds brands, digital products, intelligent tools, and business systems.**

Short version:

> **Brand. Digital. Intelligence. Systems.**

---

# 69. CONTENT SYSTEM

Do not hard-code all this copy inside visual components.

Use structured content:

```text
home
services
products
work
team
insights
contact
```

Example:

```ts
const servicePillars = [
  {
    id: "digital",
    label: "Digital",
    title: "Digital Experiences",
    description:
      "Websites and digital products that make your business easier to discover, understand, and use.",
    examples: [
      "Websites",
      "Web Applications",
      "Customer Portals",
      "Digital Products"
    ]
  },
  ...
]
```

This makes later content updates easy.

---

# 70. DO NOT MAKE THE CONTENT SOUND AI-GENERATED

Avoid repetitive structures such as:

> "We leverage..."
> "We empower..."
> "We transform..."
> "We unlock..."
> "We harness..."

Use concrete verbs:

```text
build
connect
design
engineer
simplify
organize
launch
improve
support
```

### Example

Bad:

> We leverage cutting-edge technologies to unlock transformative digital experiences.

Good:

> We build digital products that make work easier to understand and easier to manage.

---

# 71. AVOID MARKETING HYPERBOLE

Avoid:

```text
revolutionary
world-class
game-changing
disruptive
best-in-class
next-generation
unparalleled
cutting-edge
```

unless the claim is justified and actually useful.

The site's visual design already communicates ambition.

The copy can stay calm.

---

# 72. DO NOT OVERSELL MADEYA

Use:

> **being developed**

> **designed to support**

> **intended to improve**

when the system is still under development.

This is more credible than writing as though every feature is already deployed.

---

# 73. CONTENT HIERARCHY

The visitor should encounter:

```text
WHAT
↓
WHY
↓
PROOF
↓
PRODUCT
↓
PROCESS
↓
CONTACT
```

Not:

```text
technology
technology
technology
technology
```

---

# 74. MOBILE CONTENT PRIORITY

On mobile:

```text
Hero
↓
4 service pillars
↓
Why Gerat
↓
Madeya
↓
Selected Work
↓
Process
↓
CTA
```

Nothing else is required before contact.

The mobile experience should feel quick even though the desktop version is more expressive.

---

# 75. ANIMATION + CONTENT RULE

Keep all current motion systems where they help.

But do not add animation just to compensate for weak copy.

The correct relationship is:

```text
Strong sentence
+
clear visual
+
one meaningful movement
```

not:

```text
weak sentence
+
five animations
```

---

# 76. ANTIGRAVITY UPDATE INSTRUCTIONS

When implementing this document:

## Preserve

```text
overall visual identity
dark/light contrast rhythm
large typography
portfolio imagery style
motion language
navigation behavior
contact drawer concept
responsive framework
```

## Change

```text
all WorldQuant names
all WorldQuant claims
all investment-specific language
all investment-sector lists
all founder/investor-specific messaging
all WorldQuant images
all WorldQuant logos
all reference company text
```

## Simplify

```text
homepage sections
service taxonomy
copy length
navigation
technical terminology
portfolio quantity
```

---

# 77. EXACT HOMEPAGE COPY — FINAL VERSION

Use this as the first implementation target.

**Important:** Madeya is included only within **Selected Work**. Do not add a separate Madeya section between Why Gerat and Selected Work.

---

## HERO

**GERAT SOFTWARE SOLUTIONS PLC**

### We build the bridge. You cross it.

> We connect your business to the people it serves — through digital experiences, intelligent tools, business systems, and strong brands.

**SEE WHAT WE BUILD**

**START A PROJECT**

---

## HOW WE BUILD THE BRIDGE

**01 / WHAT WE BUILD**

### Every business needs a strong foundation, a clear path, and systems that can carry what comes next.

**01 — DIGITAL**

> Websites and digital products that make your business easier to discover, understand, and use.

**02 — INTELLIGENCE**

> Practical AI that helps people find information, automate work, and make better use of what they already know.

**03 — SYSTEMS**

> Software that connects operations, people, and information so businesses can work with less friction.

**04 — BRAND**

> A clear identity that helps people recognize your business — from the logo to the way it shows up online.

---

## WHY GERAT

**02 / WHY GERAT**

### Built to hold weight.

> We care about what happens after the launch.

```text
Scalable foundations
Clear communication
Functional-first design
Thoughtful technology
Ongoing support
```

---

## SELECTED WORK

**03 / SELECTED WORK**

### We build things people can actually use.

> A few examples of the products, platforms, and experiences we've helped shape.

**MADEYA**

> A digital platform being developed to support more visible, coordinated, and accountable fuel distribution.

**VIEW PROJECT**

---

## PROCESS

**04 / HOW WE WORK**

### We build things people can actually use.

> A few examples of the products, platforms, and experiences we've helped shape.

**VIEW ALL WORK**

---

## PROCESS

**04 / HOW WE WORK**

### From blueprint to bridge.

> A clear process, from the first conversation to the finished system.

```text
01 Discover
02 Design
03 Build
04 Launch
05 Support
```

**SEE OUR PROCESS**

---

## FINAL CTA

### Ready to connect your business to what comes next?

> Let's build the bridge together.

**START YOUR PROJECT**

---

# 78. OPTIONAL HOME MICRO-TICKER

If a ticker/marquee already exists, use:

```text
DIGITAL / INTELLIGENCE / SYSTEMS / BRAND /
DIGITAL / INTELLIGENCE / SYSTEMS / BRAND /
```

This is preferable to showing a long list of technologies.

---

# 79. FINAL CONTENT DECISION

The website should make a visitor understand:

> **Gerat helps businesses build their presence, improve how they work, and create the systems behind it.**

The four things they should remember are:

```text
DIGITAL
INTELLIGENCE
SYSTEMS
BRAND
```

Then they should discover:

> **Madeya is one example of the real-world projects Gerat is helping build.**

Everything else belongs deeper in the website.

---

# 80. SOURCES USED FOR CONTENT/IA RESEARCH

Instrument:
https://www.instrument.com/

Instrument Work:
https://www.instrument.com/work

Work & Co:
https://work.co/work

Nightjar:
https://nightjar.co/

Nightjar Expertise:
https://nightjar.co/expertise

LunaraTech:
https://lunaratech.com/

Metalab Work:
https://www.metalab.com/work

High Five Agency:
https://www.high-five-agency.com/

Gerat current implementation source:
https://github.com/rafikul-shaikh/world-quant

Current repo homepage:
https://github.com/rafikul-shaikh/world-quant/blob/main/src/app/page.js

Current repo home hero:
https://github.com/rafikul-shaikh/world-quant/blob/main/src/components/home/Hero.jsx

Current repo ethos:
https://github.com/rafikul-shaikh/world-quant/blob/main/src/components/home/OurEthos.jsx

Current repo focus:
https://github.com/rafikul-shaikh/world-quant/blob/main/src/components/home/OurFocus.jsx

Current repo portfolio:
https://github.com/rafikul-shaikh/world-quant/blob/main/src/components/home/OurPortfolio.jsx

Current repo contact drawer:
https://github.com/rafikul-shaikh/world-quant/blob/main/src/components/layout/ContactDrawer.jsx
