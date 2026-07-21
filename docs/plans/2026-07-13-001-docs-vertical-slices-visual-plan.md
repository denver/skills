---
title: Vertical Slices vs Horizontal Phases Visual - Plan
type: docs
date: 2026-07-13
topic: vertical-slices-visual
artifact_contract: ce-unified-plan/v1
artifact_readiness: requirements-only
product_contract_source: ce-brainstorm
execution: code
---

# Vertical Slices vs Horizontal Phases Visual - Plan

## Goal Capsule

- **Objective:** Ship a checked-in, docs/slides-ready visual contrasting horizontal phase layering (anti-pattern) with vertical slicing (target) in implementation outlines, per Linear SKI-1.
- **Product authority:** Linear SKI-1 acceptance criteria; concept sourced from Dex (HumanLayer) note on the outline phase.
- **Open blockers:** None.

## Product Contract

### Summary

Add a side-by-side diagram to this repo showing that horizontal plans produce nothing runnable until the end while vertical plans end every phase at a runnable checkpoint, rendered as hand-authored SVG in light and dark variants with a preview page.

### Key Decisions

- **Hand-authored SVG over Excalidraw.** SVG source is diffable, self-contained, renders crisply at any size in docs and slides, and needs no editor dependency. The ticket accepts either; SVG is the more durable source of truth.
- **Two theme variants, one geometry.** `vertical-slices-vs-horizontal-phases.svg` (light) and `...-dark.svg` share identical layout and differ only in palette, so the visual works on light docs and dark slides without a runtime theme dependency.
- **Location `docs/visuals/`.** The repo has no `docs/` tree yet; this establishes the home for shared visual assets without touching the skills packaging layout.

### Requirements

- R1. The diagram presents two panels side by side: horizontal phases (labeled as the anti-pattern, "nothing works until everything works") and vertical slices (labeled as the target, "every phase ships something runnable").
- R2. In the horizontal panel, phases 1 and 2 visibly end with nothing runnable; only the final phase reaches a working state.
- R3. In the vertical panel, every phase visibly ends at a runnable/testable checkpoint (checkmark plus "runnable" marker per phase).
- R4. The diagram carries the callout: "Fixing the outline costs a sentence; fixing the code costs an afternoon."
- R5. The diagram carries the rule of thumb: "If a phase has nothing meaningful to test on its own, ask for a re-slice."
- R6. Both SVG variants are self-contained: no external fonts, images, or scripts; text uses a system font stack.
- R7. `docs/visuals/README.md` embeds the diagram with a `<picture>` element so GitHub serves the dark variant in dark mode, and links both source files.

### Scope Boundaries

- No Excalidraw source (SVG is the source of truth; convertible later if editing demand appears).
- No PNG/PDF exports checked in — render from SVG on demand.
- No changes to the repo root README or skills packaging.
