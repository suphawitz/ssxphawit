# Frontend Portfolio JSON Projects Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the approved editorial/interactive portfolio with mock project data stored in JSON and accessible project detail pages at `/work/[slug]`, then publish the work from a new branch to the requested GitHub repository.

**Architecture:** Keep project content in `data/projects.json`, validate and expose it through a small typed loader in `lib/projects.ts`, and keep UI components focused on rendering. The homepage renders featured projects; the dynamic route renders one project by slug using Next 16 App Router conventions, `generateStaticParams`, `generateMetadata`, and `notFound()`.

**Tech Stack:** Next.js 16.2.10 App Router, React 19, TypeScript, Tailwind CSS v4 through the existing PostCSS setup, `next/font`, and `next/image` for local mock SVG assets.

## Global Constraints

- Use English copy in the UI.
- Use the Pamidor reference as visual inspiration only; do not copy its code, text, branding, imagery, or distinctive assets.
- Keep the visual system editorial/minimal with approachable details and restrained interaction.
- Store project content in `data/projects.json`; do not hardcode project records inside page components.
- Make hover behavior available on focus and provide a visible/tappable mobile fallback.
- Respect `prefers-reduced-motion`, keyboard navigation, visible focus, semantic HTML, and meaningful alt text.
- Keep the first release free of CMS, backend forms, fake metrics, fake testimonials, 3D scenes, custom cursor effects, and autoplay video.
- Read the Next.js 16 guides in `node_modules/next/dist/docs/` before changing Next.js code.
- Run `npm run lint` and `npm run build` before claiming completion.

## File Map

- Create `data/projects.json`: five mock project records used by the site.
- Create `types/project.ts`: the `Project` and `ProjectHighlight` TypeScript contracts.
- Create `lib/projects.ts`: JSON import and slug/featured lookup helpers.
- Create `public/projects/*.svg`: original local mock visuals for each project.
- Create `components/site-header.tsx`: shared header/navigation.
- Create `components/hero-section.tsx`: homepage hero and primary CTA.
- Create `components/project-card.tsx`: accessible project preview card.
- Create `components/project-index.tsx`: featured-project section.
- Create `components/about-section.tsx`: about and working approach content.
- Create `components/contact-section.tsx`: contact and resume links.
- Create `components/project-detail.tsx`: shared project detail presentation.
- Modify `app/page.tsx`: compose the homepage sections from project data.
- Create `app/work/[slug]/page.tsx`: dynamic project detail route with metadata and static params.
- Create `app/not-found.tsx`: branded global not-found page.
- Modify `app/layout.tsx`: English metadata and font variables.
- Modify `app/globals.css`: design tokens, responsive layout, interaction states, and reduced motion.
- Modify `docs/superpowers/specs/2026-08-05-frontend-portfolio-design.md`: record the JSON/detail-page decision.

## Task 1: Add JSON-backed project content

**Files:**
- Create: `types/project.ts`
- Create: `data/projects.json`
- Create: `lib/projects.ts`
- Create: `public/projects/aurora-dashboard.svg`
- Create: `public/projects/field-notes.svg`
- Create: `public/projects/atlas-commerce.svg`
- Create: `public/projects/studio-forms.svg`
- Create: `public/projects/pulse-planner.svg`

**Interfaces:**
- `Project` contains `slug: string`, `title: string`, `category: string`, `year: string`, `summary: string`, `description: string`, `role: string`, `technologies: string[]`, `image: string`, `imageAlt: string`, `accent: string`, `featured: boolean`, `liveUrl: string`, `repositoryUrl: string`, and `highlights: ProjectHighlight[]`.
- `ProjectHighlight` contains `label: string` and `body: string`.
- `getProjects(): Project[]` returns every JSON record.
- `getFeaturedProjects(): Project[]` returns records where `featured === true`.
- `getProjectBySlug(slug: string): Project | undefined` returns a matching record.

- [ ] **Step 1: Define the project types.**

Create the interfaces in `types/project.ts` exactly as described above and export them for the loader and components.

- [ ] **Step 2: Add five honest mock project records.**

Create JSON records for small frontend projects with these slugs: `aurora-dashboard`, `field-notes`, `atlas-commerce`, `studio-forms`, and `pulse-planner`. Use plausible but clearly fictional names, summaries, technologies, and implementation highlights. Mark exactly three as `featured: true`.

- [ ] **Step 3: Add local SVG art direction.**

Create one original SVG per project under `public/projects/`. Each SVG should be a simple, self-contained dashboard, editorial, commerce, form, or planning visual using the project's accent color. Do not reference remote images or copied artwork.

- [ ] **Step 4: Implement the loader helpers.**

Import `projects.json` in `lib/projects.ts`, cast it through the `Project[]` contract, and implement the three pure lookup functions. `getProjectBySlug` must return `undefined` for an unknown slug instead of throwing.

- [ ] **Step 5: Run the type/lint check for the data boundary.**

Run `npm run lint`.

Expected: the command completes without lint errors.

## Task 2: Build the shared visual system and homepage sections

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Create: `components/site-header.tsx`
- Create: `components/hero-section.tsx`
- Create: `components/project-card.tsx`
- Create: `components/project-index.tsx`
- Create: `components/about-section.tsx`
- Create: `components/contact-section.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- `ProjectCard({ project }: { project: Project })` renders one linked card and exposes all key content without hover.
- `ProjectIndex({ projects }: { projects: Project[] })` renders the featured project list.
- `HeroSection`, `AboutSection`, and `ContactSection` accept no data props in the first release and render the approved English mock copy.

- [ ] **Step 1: Update root metadata and font setup.**

Set `lang="en"`, title to `Phawit — Frontend Developer`, and a portfolio description. Keep the existing `next/font` approach, expose display and body font variables, and remove starter metadata.

- [ ] **Step 2: Add design tokens and responsive CSS.**

Replace starter styles with warm neutral surfaces, near-black text, one coral accent, editorial display type, readable sans-serif body type, a constrained content width, fluid spacing, single-column mobile layout, visible focus styles, and `@media (prefers-reduced-motion: reduce)` rules that disable non-essential transitions.

- [ ] **Step 3: Build the shared header and homepage sections.**

Use semantic `header`, `nav`, `main`, `section`, and `footer` elements. Include skip-link support, navigation anchors for Work/About/Contact, a hero CTA to `#work`, and external contact links with descriptive accessible labels.

- [ ] **Step 4: Build the project card interaction.**

Use `Link` to route to `/work/${project.slug}`. Render the project image, category, year, title, summary, and technology labels in the default state. Use CSS `:hover` and `:focus-within` for preview movement or accent changes, ensuring touch users still see the complete card content.

- [ ] **Step 5: Compose `app/page.tsx` from the data helper.**

Call `getFeaturedProjects()` in the server page and pass the result to `ProjectIndex`. Compose header, hero, work, about, contact, and footer in order.

- [ ] **Step 6: Run the development build checks.**

Run `npm run lint` and `npm run build`.

Expected: both commands complete successfully and the homepage route is included in the production build.

## Task 3: Add JSON-driven project detail routes

**Files:**
- Create: `components/project-detail.tsx`
- Create: `app/work/[slug]/page.tsx`
- Create: `app/not-found.tsx`

**Interfaces:**
- `ProjectDetail({ project }: { project: Project })` renders title, summary, image, context, role, highlights, technologies, external links, and a link back to all work.
- `generateStaticParams()` returns `{ slug: string }[]` for every record from `getProjects()`.
- `generateMetadata({ params }: { params: Promise<{ slug: string }> })` returns a title and description for a valid slug.

- [ ] **Step 1: Create the shared detail presentation.**

Render a breadcrumb/back link, project heading, metadata, local `next/image` visual, description, role, implementation highlights, technologies, and live/repository links. Use headings in a logical order and keep the visual readable without animation.

- [ ] **Step 2: Implement the dynamic route using Next 16 conventions.**

Await `params`, find the project with `getProjectBySlug`, call `notFound()` when it is missing, export `generateStaticParams`, and export `generateMetadata` with a project-specific title and description.

- [ ] **Step 3: Add the branded not-found fallback.**

Create `app/not-found.tsx` with a clear English message, a link back to `/`, and the same visual tokens as the portfolio.

- [ ] **Step 4: Run route verification.**

Run `npm run build`, then start the production server with `npm run start` and verify `/`, `/work/aurora-dashboard`, and an unknown `/work/not-a-project` route manually.

Expected: valid slugs render detail pages, unknown slugs render the branded not-found UI, and each detail page has a unique document title.

## Task 4: Verify responsive and accessible behavior

**Files:**
- Modify: `app/globals.css` if verification finds layout issues.
- Modify: relevant component file if verification finds focus or content issues.

- [ ] **Step 1: Verify desktop and mobile layouts.**

Check the homepage and one detail page at approximately 1440px, 1024px, 768px, and 390px widths. Confirm there is no horizontal overflow, clipped copy, or hover-only content.

- [ ] **Step 2: Verify keyboard and reduced-motion behavior.**

Tab through skip link, navigation, project cards, project detail links, and external links. Enable reduced motion and confirm content remains immediately available with no essential information hidden.

- [ ] **Step 3: Run final checks.**

Run `npm run lint` and `npm run build` again after any fixes.

Expected: both commands pass with no errors.

- [ ] **Step 4: Commit the implementation.**

Run:

```bash
git add app components data lib public/projects types docs/superpowers/specs/2026-08-05-frontend-portfolio-design.md
git commit -m "feat: build JSON-driven frontend portfolio"
```

## Task 5: Push the new branch

**Files:**
- No source files; publish the current branch.

- [ ] **Step 1: Confirm branch and clean worktree.**

Run `git branch --show-current` and `git status --short`. Expected branch: `codex/frontend-portfolio-json-projects`; status should be clean.

- [ ] **Step 2: Push to the requested remote.**

Run `git push -u origin codex/frontend-portfolio-json-projects`.

Expected: the new branch is available at `https://github.com/suphawitz/ssxphawit/tree/codex/frontend-portfolio-json-projects`.
