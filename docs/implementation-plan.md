# Implementation Plan

## Guiding Principle

**Build the minimum, ship it fast, iterate based on real use.**

The agent should be able to add a property, upload photos, and have it live on the site within the first few sessions.

---

## Phase 1 — MVP (Week 1–2)

Goal: A working, public-facing site with a functional admin area.

### 1. Project Bootstrap

- [x] Initialize Astro project with TypeScript template
- [x] Install Tailwind CSS integration
- [x] Install `@astrojs/sitemap` and `@astrojs/tailwind`
- [x] Create folder structure (`src/pages`, `src/components`, `src/data`, `src/layouts`, `public/images`)
- [x] Commit initial project structure

### 2. Data & Content Foundation

- [x] Collect real data from user (agent info, 2 properties, image filenames)
- [x] Create `src/data/agent.json` with real agent data
- [x] Create `src/data/properties.json` with 2 real properties, including `mainImage` string field on each
- [x] Add real images to `public/images/agent/` and `public/images/properties/<slug>/`
- [x] Update `docs/architecture.md` PROPERTY erDiagram to document `mainImage`
- [x] Add note about future edit-view antenna selector UI in `docs/architecture.md`

### 3. Public Pages

- [ ] **Layout**: Build `MainLayout.astro` with Header + Footer
- [ ] **Homepage** (`/`): Hero image, agent intro, button "visitar propriedates"
takes you into /properties
- [ ] **Listings** (`/properties`): Grid of all properties with a status banner acroos the botton of each listing, mainImage and house titles are a button into /properties/[slug]
- [ ] **Property Detail** (`/properties/[slug]`): Full description, price and features on top, image gallery
- [ ] **Contact**: A simple section linking to WhatsApp / email on every page

### 4. Admin Panel (Minimal)

- [ ] **Login** (`/admin/login`): OAuth login flow (Google, GitHub, or other provider)
- [ ] **Dashboard** (`/admin`): Overview of all properties with edit/delete actions
- [ ] **New Property** (`/admin/new`): Form with all property fields
- [ ] **Edit Property** (`/admin/edit/[id]`): Pre-filled form
- [ ] **Image Upload** (basic): Native file input that saves to `/public/images/properties/`
- [ ] **Delete Property**: Confirmation + removal

### 5. Hosting & Deploy

- [ ] Push to GitHub/GitLab
- [ ] Build static output (`npm run build`)
- [ ] Deploy built assets to chosen self-hosted provider or generic web server
- [ ] Configure OAuth credentials and allowed identity
- [ ] Verify deploy works
- [ ] Set up custom domain if available
- [ ] Configure CI/CD to build on push and sync artifacts to host

### 6. Polish

- [ ] Responsive design audit (mobile, tablet, desktop)
- [ ] Add image alt texts for accessibility
- [ ] Add favicon
- [ ] Basic Open Graph meta tags

---

## Phase 2 — Polish & Scale (Week 3–4)

Goal: Make it feel production-ready and easy to maintain.

### Content Management

- [ ] Add **drag-and-drop** or multi-file upload for properties
- [ ] Implement **image preview** before saving
- [ ] Add **draft/published** toggle (properties visible only when explicitly published)
- [ ] Add **sort order** field (agent can reorder featured properties on homepage)

### Design & UX

- [ ] Add smooth page transitions (Astro `view-transitions`)
- [ ] Add a simple image lightbox on property detail page
- [ ] Ensure contrast ratios and typography scale are consistent
- [ ] Add a loading state for admin forms

### Developer Experience

- [ ] Add Prettier and ESLint
- [ ] Add Husky pre-commit hooks (format + lint)
- [ ] Document the "how to add a property" workflow for the agent (a 1-page PDF)

### SEO

- [ ] Generate XML sitemap
- [ ] Add JSON-LD structured data for each property
- [ ] Add Arabic / language versions if needed later

---

## Phase 3 — Nice-to-Haves (Month 2+)

### Features

- [ ] **Search**: Client-side search by title or location
- [ ] **Filters**: Filter by price range, bedrooms, status
- [ ] **Favorites**: localStorage-based "save for later" for visitors
- [ ] **Inquiry Form**: A contact form that sends an email (using Formspree or a simple mailto)
- [ ] **Map Embed**: Show property location via Google Maps or OpenStreetMap iframe
- [ ] **Multi-language**: i18n if the agent serves clients in multiple languages

### Performance

- [ ] Generate WebP / AVIF versions of images (via local script)
- [ ] Lazy-load images below the fold
- [ ] Add a 404 page

### Automation

- [ ] Add a simple `npm run seed` script that populates sample data
- [ ] Add a `npm run optimize-images` script for image compression

---

## File Size Budget (Target)

| Artifact | Max Size |
|---|---|
| Homepage HTML | < 50 KB (gzipped) |
| Property detail HTML | < 80 KB (gzipped) |
| Image (per photo) | < 200 KB (ideally < 100 KB) |
| Total JS | < 30 KB (gzipped) — aim for 0 if possible |

---

## Milestones

| Milestone | Deliverable | Week |
|---|---|---|
| **M1: Public Site** | Homepage + listings + property detail with sample data | Week 2 |
| **M2: Admin Live** | Agent can log in, add/edit/delete properties with images | Week 3 |
| **M3: Production Ready** | Deployed, responsive, SEO optimized | Week 4 |

---

## Risk Notes

| Risk | Mitigation |
|---|---|
| JSON file merge conflicts if agent uses multiple editors | Agent should only edit via the admin form; manual JSON edits only by the developer |
| Large images bloat repo | Add image compression step; optimize images before committing |
| Agent forgets how to update site | 1-page instruction PDF; admin UI should be self-explanatory |
