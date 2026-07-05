---
name: technical-html-slide-builder
description: Build standalone dark "command-center deck" HTML in the executive-technical house style. Use for narrative slide decks (scroll-snapped, keyboard-navigated); for dense roadmap, changelog, or competitive-analysis pages; and as the shared visual base that other HTML-output skills layer on.
metadata:
  short-description: Build polished technical HTML in the command-center house style
---

# Technical HTML Slide Builder

The base layer for the **command-center deck** house style: dark, sharp, high-signal, data-rich, slightly cinematic — a technical founder's strategy deck or a production-operations briefing, not a SaaS landing page.

This skill owns the shared visual system (tokens, spotlight, typography, components) and two layout branches. Higher-level HTML skills compose on top of it rather than restating its CSS.

## How to build

1. Copy the pre-assembled skeleton for your branch. Each is one complete, openable file generated from the source assets:
   - **Narrative slide deck** → `assets/deck-skeleton.html`. Full-screen scroll-snapped sections, fade-up reveals, transform-driven top progress bar, right-side section dots, arrow/space keyboard nav via IntersectionObserver.
   - **Dense page** (roadmap, changelog, release notes, competitor matrix, implementation plan, architecture summary) → `assets/page-skeleton.html`. Fixed translucent top nav, constrained 1200px content, stacked cards/metrics/tables.
   - **Print one-pager** (decision memo, light briefing meant for paper or PDF) → copy `assets/base.html` and paste `assets/print.css` at the splice marker. Light token overrides, `.memo-container`, page margins and break-inside rules for printing. No skeleton for this branch.
2. Write the finished file to a durable location: `./decks/` in the working repo by default, or wherever the user specifies. Never leave the only copy in a scratchpad or temp directory.
3. Theme if asked. The default needs nothing; to theme, paste a theme's `:root` block from `assets/themes/` after the base tokens. `assets/themes/README.md` holds the token contract and the WCAG AA contrast floor.
4. Fill in content using the shared components (cards, metric boxes, pills, tables, grids, kicker, punch, loop-row, seq-item, status/text helpers). The tokens are the single source of truth for the palette: never restate hex; reference the tokens. Keep everything inline: inline CSS, inline vanilla JS, no build step, no framework. Use D3 only for a genuine interactive simulation or data viz.

The visual system itself lives in `assets/base.html` plus the branch files (`deck.css`, `deck.js`, `page.css`); the skeletons are generated from them by `scripts/build-skeletons.mjs`. Edit the sources and regenerate, never the skeletons.

Formats like scorecards, one-pagers, and comparison matrices are recipes over the existing branches, not new branches. Examples: scorecard = dense page + metrics-row + status table + risk cards; roadmap = deck or dense page + seq-item + loop-row.

## Content structure

Narrative deck arc: title/thesis → problem punchline → current pain → mechanism → architecture/closed loop → evidence/metrics → risks/assumptions → roadmap or 30-60-90 → closing thesis.

Dense page: header (title, date/range, thesis) → metric row → timeline or release train → cards grouped by area (API, frontend, infra, data, security) → notable-changes table → risk/migration notes → next milestones.

## Motion

Sparing and purposeful: fade/slide sections in, stagger related cards, reveal terminal/demo lines sequentially, animate a diagram only when it clarifies. `base.html` ships the `prefers-reduced-motion` fallback; keep it.

## Content voice

Write like a technical operator explaining a strategy: direct, concrete, high-signal. Use specific nouns (deploys, incidents, telemetry, migrations, queues, rollback, ownership). Mix leadership framing with implementation detail. No marketing claims or fluffy slogans, except an optional final punchline. Avoid em dashes in body copy; use commas or periods instead.

- Good: "Investigation is table stakes. Resolution is the product." / "The moat is not the model. It is the operating context." / "Name the risk, then show the control."
- Avoid: "revolutionary," "seamless," "unlock your potential," decorative blobs, generic gradients.

## Completion checklist

Single source of truth for what "done" means. Before finalizing:

- [ ] Opens and works from the raw HTML file (Inter falls back to the system stack offline; no other required assets).
- [ ] External dependencies limited to the Inter font and, if used, D3.
- [ ] Responsive at the shipped breakpoints (820px and 520px): no text overflow or horizontal scroll at ~375px, grids collapse to one column, deck dots hidden.
- [ ] Cards, metrics, and tables align cleanly.
- [ ] Motion has the reduced-motion fallback.
- [ ] Deck branch: arrow/space keyboard nav works and section dots track position.
- [ ] Deck branch: progress bar animates transform, not width.
- [ ] Dense branch: fixed top nav stays put on scroll.

## Notes

- The **narrative deck** branch is validated against a real reference deck. The **dense page** branch, tables, count-up metrics, and D3 are house-style extrapolations with no reference implementation — treat them as conventions, not proven patterns.
- Bespoke interactions the base intentionally omits (access gate, modal, click-to-pin, stepping diagrams) are left to the composing skill so this base stays non-prescriptive.
