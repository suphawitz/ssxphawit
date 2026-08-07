# Tech Marquee Icons Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace TechMarquee text items with optimized icons from `public/tools` while preserving its two-row opposing loop.

**Architecture:** Keep icon metadata in `lib/portfolio.ts` and pass complete `ToolIcon` objects through the marquee row helper. Render each item with Next.js `Image` so the component does not perform repeated lookups or construct public paths manually.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS animations, `next/image`.

## Global Constraints

- Use only assets already present in `public/tools`.
- Keep two marquee rows moving in opposite directions.
- Show icons without visible technology-name text.
- Preserve accessible alternative text from each `ToolIcon`.
- Keep icon dimensions responsive and visually consistent.
- Do not change other homepage sections.

---

### Task 1: Render typed icon rows

**Files:**
- Modify: `lib/portfolio.ts`
- Modify: `components/tech-marquee.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `ToolIcon { name: string; src: string; alt: string }` and `toolIcons: ToolIcon[]`.
- Produces: `getTechStackRows(items: ToolIcon[]): TechMarqueeRow[]`, where each row contains `ToolIcon[]`.

- [ ] **Step 1: Verify the current type failure**

Run `npm run build` and confirm TypeScript rejects passing `ToolIcon[]` to the current string-based `getTechStackRows` function.

- [ ] **Step 2: Make marquee rows type-safe**

Change `TechMarqueeRow.items` from `string[]` to `ToolIcon[]` and change `getTechStackRows` to accept `ToolIcon[]`. Preserve the existing triplication and reversed second row.

- [ ] **Step 3: Render optimized icons**

Import `Image` from `next/image`. Render each item from `technology.src`, `technology.alt`, and a stable key built from `technology.name` plus its repeated index. Use intrinsic dimensions `128 × 128` with a scoped icon class.

- [ ] **Step 4: Add responsive icon presentation**

Create a fixed responsive item box, apply `object-fit: contain`, and keep enough inter-item spacing for both rows to remain readable on desktop and mobile.

- [ ] **Step 5: Verify the implementation**

Run `git diff --check`, `npm run lint`, and `npm run build`. Confirm the homepage renders two animated icon rows and all `/tools/...` image requests resolve successfully.

---

### Task 2: Split rows and make the loop seamless

**Files:**
- Create: `lib/portfolio.test.mjs`
- Modify: `lib/portfolio.ts`
- Modify: `components/tech-marquee.tsx`
- Modify: `app/globals.css`
- Modify: `package.json`

**Interfaces:**
- Consumes: `toolIcons: ToolIcon[]`.
- Produces: `getTechStackRows(items: ToolIcon[]): TechMarqueeRow[]`, where the first row contains the five frontend icons and the second contains the four tools-and-services icons.

- [ ] **Step 1: Write the failing row-composition test**

Use Node's test runner to assert the exact names in each row and assert that the two sets are disjoint.

- [ ] **Step 2: Run the focused test and verify RED**

Run `node --experimental-strip-types --test lib/portfolio.test.mjs`.

Expected: FAIL because the current helper repeats every icon three times in both rows.

- [ ] **Step 3: Return distinct base row data**

Partition the supplied icon metadata into `HTML5, CSS3, JavaScript, React, Next.js` and `Figma, GitHub, GPT, Supabase`. Return each icon once in its base row.

- [ ] **Step 4: Render two identical groups per track**

For each row, render two `.tech-marquee-group` elements containing the same base items. Expose image alternative text in the first group and use empty alternative text in the duplicate group.

- [ ] **Step 5: Animate exactly one group width**

Move inter-item spacing into `.tech-marquee-group`, add matching trailing padding, and change the keyframes to `0 → -50%` and `-50% → 0`. Use row-specific durations that keep perceived speed similar.

- [ ] **Step 6: Verify GREEN and project health**

Run `node --experimental-strip-types --test lib/portfolio.test.mjs`, `git diff --check`, `npm run lint`, and `npm run build`.

Expected: the focused test passes, lint exits with code 0, and the production build succeeds.
