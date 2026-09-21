# Gerat Website Quality Standard

Use this as a checklist for every implementation and review pass. The goal is a **professional, production-ready Gerat website**, not just a visually impressive one.

## 1. Brand & Visual Identity
- Keep colors, typography, spacing, imagery, borders, and components consistent.
- Make the site feel distinctly **Gerat**, not a copy of the reference website.
- Keep the tone calm, clear, confident, and credible.

## 2. UX & User Journey
- Visitors should quickly understand **who Gerat is, what it builds, and how to start a project**.
- Maintain a clear flow: **Hero → Services → Why Gerat → Work → Team → Process → CTA**.
- Every important section should have a clear purpose and next action.

## 3. UI System
- Use reusable components for buttons, cards, headings, forms, navigation, grids, and spacing.
- Define consistent states: **default, hover, focus, active, disabled, loading, error**.
- Avoid page-by-page styling that creates inconsistencies.

## 4. Responsive Design
- Design intentionally for **desktop, tablet, and mobile**.
- Test long text, different screen sizes, touch interaction, and navigation.
- Do not simply shrink the desktop layout.

## 5. Accessibility
- Use semantic HTML, keyboard navigation, visible focus states, readable contrast, alt text, and accessible forms.
- Support `prefers-reduced-motion`.

## 6. Motion & Interaction
- Use animation to improve hierarchy, storytelling, and feedback.
- Avoid unnecessary effects that slow the site or distract from content.
- Provide sensible mobile alternatives for hover-based interactions.

## 7. Performance
- Optimize images and fonts.
- Lazy-load heavy assets where appropriate.
- Avoid unnecessary JavaScript, excessive animation, and oversized dependencies.
- Target strong **Core Web Vitals** and fast initial loading.

## 8. SEO & Sharing
- Use proper page titles, descriptions, headings, URLs, sitemap, robots.txt, canonical URLs, and structured data where appropriate.
- Add Open Graph/social metadata so shared pages look professional.

## 9. Forms, Security & Reliability
- Validate and sanitize all form input.
- Protect API routes and admin functions with proper authentication/authorization.
- Handle loading, success, error, empty, and 404 states.
- Protect secrets with environment variables; never expose credentials in the frontend.

## 10. Content & Credibility
- Use only **real team members, projects, clients, metrics, and claims**.
- Do not invent testimonials, statistics, partnerships, or achievements.
- Keep homepage copy concise; put detailed technical explanations on inner pages.

## 11. Maintainability & Future Growth
- Keep content separate from presentation where practical.
- Make services, projects, team members, insights, and future business divisions easy to add.
- Keep the codebase clean, reusable, documented, and easy for another developer to understand.

## Priority Order

When trade-offs happen, prioritize:

**Clarity → Usability → Business Purpose → Visual Quality → Performance → Accessibility → SEO → Security → Maintainability → Advanced Animation**

## Final Rule

> **Build for real users, real business needs, and real production conditions — not only for screenshots or demos.**
