# YourHome — Production Readiness Milestones

This document is the milestone plan to evolve **YourHome** (Next.js 14, React 18, TypeScript) from a polished MVP into a **production-ready** real estate listing product. It assumes **PostgreSQL** as the primary database, **real user authentication** including **Google OAuth**, **Stripe** for payments, and continuous delivery with an explicit **quality bar** (cross-browser, performance, design consistency).

---

## Guiding decisions

| Area | Choice | Notes |
|------|--------|--------|
| Data | **PostgreSQL** | Strong fit for users, listings, payments metadata, and relational integrity. Use Prisma or Drizzle for schema and migrations. |
| Auth | **Auth.js (NextAuth v5)** + Google provider | Persist users/sessions in Postgres; add email/password only if product requires it alongside Google. |
| Payments | **Stripe Checkout** + webhooks | Server-created Checkout Sessions; webhook-verified completion; secret keys server-only. |
| Hosting / CD | **Vercel** (or equivalent) | Preview deployments per PR; production from protected `main`. |
| CI | **GitHub Actions** | Lint, typecheck, build on every PR; optional E2E (Playwright) on main or nightly. |

---

## Milestone 0 — Foundation, environments, and CI/CD

**Objective:** Every change is verified automatically and deploys through a predictable path.

**Deliverables**

- Documented **environment variables** (`.env.example`); secrets only in the host or secret store—never committed.
- **GitHub Actions** workflow: install dependencies, `lint`, `build`; add `tsc --noEmit` if you want explicit typechecking beyond the Next build.
- **Branch protection** on `main`: required status checks, optional code review.
- **Deployment**: connect repo to Vercel (or chosen host); **Preview** env per PR, **Production** env with production-only keys.
- **Rollback**: team knows how to promote a previous deployment (e.g. Vercel instant rollback).

**Exit criteria**

- Failing `lint` or `build` blocks merge.
- Merging to `main` produces a production deployment without manual steps beyond merge.

---

## Milestone 1 — Listings data layer (PostgreSQL)

**Objective:** Properties are no longer “only” a static TypeScript file; they can be queried, filtered, and updated without redeploying app code for every content change.

**Deliverables**

- **Schema** for listings (title, price, location, specs, amenities, media references, status draft/published, featured flag, timestamps).
- **API** via Next.js Route Handlers or server-only modules: list with pagination and filters, detail by id/slug.
- **Images**: URLs or uploads from object storage (e.g. S3/R2, Cloudinary, Vercel Blob); configure `next/image` **remote patterns**.
- **Maps**: API keys used server-side or via env; confirm provider **licensing** (Google Maps, Mapbox, etc.).

**Exit criteria**

- Listings and property detail pages read from Postgres (or approved CMS backed by Postgres).
- Filters perform adequately at a realistic row count (indexes where needed).

---

## Milestone 2 — Authentication for real users (including Google OAuth)

**Objective:** Sign-in and sign-up work for real accounts; sessions are secure in production.

**Deliverables**

- **Auth.js** with **Google OAuth** (Google Cloud project, OAuth client, authorized redirect URIs for prod and preview if applicable).
- **Database adapter** storing users, accounts, and sessions in PostgreSQL.
- **Protected routes** for actions that require login (e.g. post listing, account area)—align with product rules.
- **Header / navigation**: signup and account entry points route to working flows; **sign out** works.
- **Security**: HTTPS in production; HTTP-only session cookies; rotate `AUTH_SECRET` and OAuth client secret via env.

**Exit criteria**

- A new user can complete Google sign-in and appear as a persisted user.
- Unauthorized users cannot create or publish listings via API abuse alone.

---

## Milestone 3 — Payments (Stripe)

**Objective:** The payment path collects real money with minimal PCI scope and reliable server-side confirmation.

**Deliverables**

- **Stripe Checkout** (or Payment Element if justified): session creation **on the server** only.
- **Webhooks**: verify signatures; handle `checkout.session.completed` (and cancellations/failures as needed); idempotent processing.
- **Persistence**: link Stripe customer / session / payment intent to `userId` and business context (e.g. featured listing, deposit)—define the product rules explicitly.
- **UI**: success and cancel pages; no fake “success alert” for real checkout flows.
- **Test mode** end-to-end on staging; **live** keys only in production env.

**Exit criteria**

- Test payment completes and webhook marks the order/booking state correctly in the database.
- No Stripe secret keys in client bundles or public repos.

---

## Milestone 4 — Forms, compliance, and abuse resistance

**Objective:** Contact and feedback flows are trustworthy; legal and spam baselines are met.

**Deliverables**

- **Server endpoints** for contact / feedback with validation (e.g. Zod), logging, and user-visible errors.
- **Rate limiting** and **bot mitigation** (e.g. Cloudflare Turnstile or reCAPTCHA) on public forms.
- **Privacy policy** and **terms** as appropriate; cookie/consent if you use non-essential analytics or cookies.
- **Email or ticketing** optional but recommended for lead delivery (e.g. Resend, transactional provider).

**Exit criteria**

- Forms do not only `alert()`; submissions are handled server-side with basic anti-abuse controls.

---

## Milestone 5 — Cross-browser, device compatibility, performance, and design

**Objective:** The experience is reliable across common browsers and devices, fast enough on mobile networks, and visually consistent.

**Cross-browser and devices**

- Publish a **supported browser matrix** (e.g. last two versions Chrome, Firefox, Safari, Edge; iOS Safari; Android Chrome).
- **Responsive**: mobile-first layouts; touch targets (~44×44px) for primary actions; no hover-only critical paths.
- **Automated regression** (recommended): **Playwright** running a few critical journeys on Chromium, WebKit, and Firefox in CI (on `main` or nightly if runtime is a concern).
- **Manual smoke** on one iOS and one Android device before major releases.

**Performance**

- Measure **Core Web Vitals** in production (e.g. Vercel Speed Insights / Web Vitals / RUM).
- **Images**: `next/image`, appropriate `sizes`, avoid overusing `priority` outside above-the-fold hero.
- **Fonts**: `next/font` where applicable to limit CLS.
- **Code splitting**: lazy-load heavy sections (e.g. map, rich widgets) where it helps INP and initial load.
- Optional: **Lighthouse CI** or **bundle size** budget on a schedule to catch regressions.

**Design**

- **Design tokens**: spacing, type scale, radius, colors (CSS variables or shared module) aligned with existing CSS Modules.
- **Component consistency**: cards, buttons, forms, and errors share one visual language.
- **Accessibility**: WCAG **AA** contrast for text; visible focus; labels associated with inputs; meaningful control names.

**Exit criteria**

- No known blockers on the defined browser matrix for core journeys.
- LCP / INP / CLS within agreed internal targets (or documented exceptions with a fix timeline).
- UI audit passes for token usage and a11y basics on primary pages.

---

## Milestone 6 — Production hardening, SEO, observability, and launch

**Objective:** The system is observable, secure enough for public traffic, and ready for operators.

**Deliverables**

- **Security headers** and HTTPS-only policies as compatible with your scripts and maps (tighten CSP over time).
- **Dependency updates**: Dependabot or Renovate; process for security patches.
- **Error tracking** (e.g. Sentry) and structured logging for API and webhook failures.
- **SEO**: per-page metadata, Open Graph, `sitemap.xml`, `robots.txt`; sensible URLs for listing detail.
- **Staging** mirrors production config class; **backups** for Postgres and media.
- **Runbook**: rollback, who to contact, how to replay failed webhooks safely.

**Exit criteria**

- Launch checklist completed (auth, payments test mode dry run, backups, monitoring alerts).
- Incident response and rollback have been exercised at least once on staging.

---

## Suggested timeline (indicative)

| Phase | Milestones | Rough duration (small team) |
|-------|------------|-----------------------------|
| A | M0 + start of M1 | 1–3 weeks |
| B | M1 + M2 | 4–8 weeks |
| C | M3 + M4 | 4–7 weeks |
| D | M5 + M6 | 3–6 weeks |

Calendar totals depend on scope (e.g. CMS vs custom admin, complexity of payment use cases). Parallel work is possible between **frontend polish (M5)** and **backend hardening (M6)** once core flows exist.

---

## Dependency graph (high level)

```text
M0 (CI/CD, env)
    └── M1 (Postgres listings)
            └── M2 (Auth + Google)
                    └── M3 (Stripe) & M4 (forms/legal)
                            └── M5 (quality bar) & M6 (hardening + launch)
```

**M3** and **M4** can overlap; **M5** should start early in small increments (tokens, images, responsive fixes) and intensify before launch.

---

*Last updated: aligned with product direction—PostgreSQL, Google OAuth, Stripe, and explicit quality gates for browser coverage, performance, and design.*
