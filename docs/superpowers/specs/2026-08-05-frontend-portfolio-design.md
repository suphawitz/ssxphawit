# Frontend Portfolio Design Spec

Date: 2026-08-05
Status: Approved direction; implementation in progress

## 1. Goal

Create an English-language personal portfolio for a Frontend Developer. The first release should establish a recognizable personal identity, support software-house job applications, and remain useful for future opportunities. The site will use mock project data and placeholder imagery initially, with a structure that makes replacement with real work straightforward.

The visual direction is inspired by the user's reference at https://pamidordesign.com/ and the previously selected A+B direction: quiet editorial structure combined with approachable, playful details. The implementation must be original and must not reproduce the reference site's code, text, branding, images, or distinctive assets.

## 2. Audience and success criteria

Primary audience: software-house recruiters, hiring managers, and frontend teammates.

The first release succeeds when:

- A visitor can identify the role and core value proposition immediately.
- A recruiter can scan selected work, technologies, resume, and contact links without hunting.
- Each project communicates what was built and what the owner contributed, not just a screenshot.
- The page remains readable and usable on mobile.
- The visual personality is memorable without reducing credibility or performance.
- A future contributor can replace mock content without rewriting the layout components.

## 3. Scope

### In scope

- One responsive homepage.
- A hero section with name, Frontend Developer role, short positioning statement, and primary work CTA.
- A hero portrait area on the right with a replaceable local placeholder asset.
- A selected-work section with 3–5 mock projects, initially showing 3 featured projects.
- Project cards with category, year, short summary, technologies, and visual preview.
- Project detail pages at `/work/[slug]` using shared typed project data.
- Project content stored in `data/projects.json`, with a typed loader boundary for the UI.
- A concise about/process section.
- Contact links for GitHub, LinkedIn, email, and a resume download placeholder.
- Subtle interactive motion, hover previews on capable devices, and touch-friendly fallbacks.
- A mobile burger menu with keyboard-close support and a full-screen navigation panel.
- A scroll-emphasis article section after selected work, where lines transition from soft gray to near-black as they enter view.
- A two-row technology marquee in opposite directions, with hover/focus pause and reduced-motion fallback.
- Metadata, semantic structure, keyboard navigation, visible focus states, alt text, and reduced-motion support.

### Out of scope for the first release

- CMS or database-backed editing.
- Blog, testimonials, awards, fake client logos, or fabricated metrics.
- Authentication, contact form backend, analytics dashboard, or newsletter.
- Heavy 3D scenes, custom cursor effects, autoplay video, or animation that blocks reading.
- Exact cloning of the reference site.

## 4. Visual system

- Surface: warm off-white or light stone rather than stark white.
- Text: near-black for strong contrast.
- Accent: one warm coral/orange plus an optional muted green or blue used sparingly for project thumbnails and status labels.
- Typography: expressive display face for the hero and section moments; readable sans-serif for navigation, metadata, body copy, and project details.
- Layout: generous whitespace, editorial hierarchy, restrained borders, and a clear project index.
- Imagery: temporary local placeholder visuals or CSS-generated art direction; final assets can be dropped into the same project data model later.

## 5. Interaction model

The experience should feel interactive through feedback and exploration rather than spectacle.

- On load, use a short, non-blocking reveal for key hero elements.
- On desktop, project cards can reveal a preview image and metadata on hover or focus.
- On touch devices, the same information must be available through tap or remain visible in the card layout.
- Use section reveals and small transform/opacity transitions where they reinforce hierarchy.
- Respect `prefers-reduced-motion: reduce` by removing non-essential movement and keeping content immediately available.
- Never rely on a cursor-only interaction to discover a project or navigate the site.

## 6. Information architecture

```text
Home
├── Hero
├── Selected work
│   ├── Project card 01 → /work/project-one
│   ├── Project card 02 → /work/project-two
│   └── Project card 03 → /work/project-three
├── About / working approach
├── Capabilities / stack
└── Contact + resume + social links

/work/[slug]
├── Project title and summary
├── Hero visual
├── Context and goal
├── Frontend contribution
├── Selected implementation notes
├── Tech stack
└── Links to live demo, repository, and next project
```

## 7. Proposed component boundaries

- `SiteHeader`: identity, navigation, and mobile menu trigger if needed.
- `HeroSection`: role statement and primary CTA.
- `ProjectIndex`: renders featured projects from typed data.
- `ProjectCard`: accessible preview, metadata, and navigation link.
- `AboutSection`: short personal positioning and working approach.
- `ContactSection`: direct contact and external links.
- `ProjectDetail`: shared structure for `/work/[slug]` pages.
- `MotionReveal`: small client-side wrapper only where interaction is required.
- `projects` data module: typed content, slugs, technologies, imagery, and project detail fields.

Components should remain presentational where possible. Data and routing should not be embedded in visual primitives.

## 8. Data and error behavior

Project content will be stored in `data/projects.json` for the first release. The JSON shape will include `slug`, `title`, `category`, `year`, `summary`, `description`, `role`, `technologies`, `image`, `imageAlt`, `accent`, `featured`, `liveUrl`, `repositoryUrl`, and an array of implementation highlights. A typed loader will validate the shape at the application boundary and expose `getProjects()`, `getFeaturedProjects()`, and `getProjectBySlug(slug)` to pages and components.

Project detail routes should resolve by slug and show a framework-appropriate not-found state for an unknown slug. Missing optional imagery should fall back to an intentional placeholder visual rather than a broken image. External links should open predictably and include appropriate relationship attributes when opening a new tab.

## 9. Responsive behavior

- Desktop: wide editorial hero, project preview interaction, two-column detail sections where useful.
- Tablet: reduce type scale and gutters while retaining the hierarchy.
- Mobile: single-column flow, compact header, stacked project cards, tap/static project states, readable line lengths, and no horizontal overflow.
- Mobile navigation: desktop links collapse into a burger trigger; the open panel remains keyboard-accessible and closes on Escape or link selection.
- Touch targets should be comfortably tappable and navigation should remain usable without hover.

## 10. Verification plan

- Run the project's lint command.
- Run a production build.
- Check home and project detail routes at desktop, tablet, and mobile widths.
- Test keyboard focus through navigation, project cards, and external links.
- Test reduced-motion behavior.
- Check missing-slug behavior and placeholder imagery.
- Confirm no horizontal scroll, clipped text, or unreadable contrast at common viewport sizes.

## 11. Delivery sequence

1. Add JSON project content, typed loader, and mock SVG visuals.
2. Replace starter page with the approved visual shell and mock content.
3. Add typed project cards and project detail routes.
4. Add restrained interaction and responsive fallbacks.
5. Add metadata, accessibility refinements, and final verification.

The implementation plan should be created only after the user reviews this written spec.
