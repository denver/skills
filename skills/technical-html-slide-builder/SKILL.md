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

1. Copy `assets/base.html`. It is the complete, openable skeleton: `:root` tokens, base body, mouse-spotlight, typography, and every shared component (cards, metric boxes, pills, tables, gradient numbers, status/text helpers, reduced-motion). This file is the single source of truth for the palette — never restate hex; reference the tokens.
2. Pick a branch and paste its stylesheet into `base.html`:
   - **Narrative slide deck** → `assets/deck.css` + `assets/deck.js`. Full-screen scroll-snapped sections, fade-up reveals, top progress bar, right-side section dots, arrow/space keyboard nav via IntersectionObserver.
   - **Dense page** (roadmap, changelog, release notes, competitor matrix, implementation plan, architecture summary) → `assets/page.css`. Fixed translucent top nav, constrained 1200px content, stacked cards/metrics/tables.
3. Fill in content. Keep everything inline: inline CSS, inline vanilla JS, no build step, no framework. Use D3 only for a genuine interactive simulation or data viz.

## Content structure

Narrative deck arc: title/thesis → problem punchline → current pain → mechanism → architecture/closed loop → evidence/metrics → risks/assumptions → roadmap or 30-60-90 → closing thesis.

Dense page: header (title, date/range, thesis) → metric row → timeline or release train → cards grouped by area (API, frontend, infra, data, security) → notable-changes table → risk/migration notes → next milestones.

## Motion

Sparing and purposeful: fade/slide sections in, stagger related cards, reveal terminal/demo lines sequentially, animate a diagram only when it clarifies. `base.html` ships the `prefers-reduced-motion` fallback; keep it.

## Content voice

Write like a technical operator explaining a strategy: direct, concrete, high-signal. Use specific nouns (deploys, incidents, telemetry, migrations, queues, rollback, ownership). Mix leadership framing with implementation detail. No marketing claims or fluffy slogans, except an optional final punchline.

- Good: "Investigation is table stakes. Resolution is the product." / "The moat is not the model. It is the operating context." / "Name the risk, then show the control."
- Avoid: "revolutionary," "seamless," "unlock your potential," decorative blobs, generic gradients.

## Completion checklist

Single source of truth for what "done" means. Before finalizing:

- [ ] Opens and works from the raw HTML file (Inter falls back to the system stack offline; no other required assets).
- [ ] External dependencies limited to the Inter font and, if used, D3.
- [ ] Responsive: no text overflow or horizontal scroll on mobile.
- [ ] Cards, metrics, and tables align cleanly.
- [ ] Motion has the reduced-motion fallback.
- [ ] Deck branch: arrow/space keyboard nav works and section dots track position.
- [ ] Dense branch: fixed top nav stays put on scroll.

## Notes

- The **narrative deck** branch is validated against a real reference deck. The **dense page** branch, tables, count-up metrics, and D3 are house-style extrapolations with no reference implementation — treat them as conventions, not proven patterns.
- Bespoke interactions the base intentionally omits (access gate, modal, click-to-pin, stepping diagrams) are left to the composing skill so this base stays non-prescriptive.
