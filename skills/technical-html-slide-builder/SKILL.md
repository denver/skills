---
name: technical-html-slide-builder
description: Generate standalone HTML presentations, technical slide decks, roadmap pages, changelog pages, strategy briefings, competitive analysis pages, and interactive technical demos in a dark, polished, PowerPoint-like executive technical style.
metadata:
  short-description: Build polished technical HTML decks
---

# Technical HTML Slide Builder

Use this skill when creating:

- PowerPoint-like HTML slide decks
- Technical strategy presentations
- Product or engineering roadmap pages
- Changelog or release narrative pages
- Competitive landscape or market analysis pages
- Interactive technical demos or visual simulations

The output should usually be a standalone `.html` file with inline CSS and inline JavaScript, unless the user asks for another format.

## Style Goal

Create a polished, executive technical presentation with the feel of a dark production-operations command center: calm, sharp, high-signal, data-rich, and slightly cinematic.

The style should feel like:

- Technical founder or staff engineer presentation
- Product strategy deck
- Modern incident-response or infrastructure product narrative
- Dense enough for technical readers, polished enough for leadership

Avoid generic SaaS landing-page design. This is not marketing fluff. It should feel like an interactive deck or technical briefing.

## Output Contract

Generate a complete HTML document:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>...</title>
<style>
/* all CSS here */
</style>
</head>
<body>
<!-- presentation/page content -->
<script>
/* all JS here */
</script>
</body>
</html>
```

Use:

- Inline CSS
- Inline vanilla JavaScript
- No build system
- No framework unless explicitly requested
- Optional D3 only for data simulations or diagrams
- Responsive layout
- Keyboard navigation for slide decks
- Reduced-motion support
- Clean semantic structure

## Core Visual System

Use Inter as the primary font:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
```

Use this token set as the base:

```css
:root {
  --bg: #080c14;
  --surface: #0d1117;
  --surface-raised: #131922;
  --border: rgba(59, 130, 246, 0.15);
  --border-hover: rgba(59, 130, 246, 0.4);
  --text: #e2e8f0;
  --text-muted: #94a3b8;
  --accent: #3B82F6;
  --accent-light: #60A5FA;
  --accent-deep: #2563EB;
  --accent-glow: rgba(59, 130, 246, 0.25);
  --violet: #a78bfa;
  --green: #34d399;
  --red: #f87171;
  --amber: #fbbf24;
  --x: 50%;
  --y: 50%;
}
```

Base page styling:

```css
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
```

Add a subtle mouse-following spotlight:

```html
<div id="spotlight"></div>
```

```css
#spotlight {
  position: fixed;
  inset: 0;
  background: radial-gradient(
    600px circle at var(--x) var(--y),
    rgba(59, 130, 246, 0.06),
    transparent 60%
  );
  pointer-events: none;
  z-index: 0;
}
```

```js
document.addEventListener('mousemove', e => {
  document.documentElement.style.setProperty('--x', e.clientX + 'px');
  document.documentElement.style.setProperty('--y', e.clientY + 'px');
});
```

## Typography

Use large, confident headings with tight line height.

```css
h1 {
  font-size: 3.5rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
}

h2 {
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin-bottom: 1rem;
}

h3 {
  font-size: 1.25rem;
  font-weight: 600;
}

.text-muted { color: var(--text-muted); }

.text-gradient {
  background: linear-gradient(135deg, #2563EB, #3B82F6 70%, #60A5FA);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

Use compact section labels:

```css
.section-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--accent-light);
  margin-bottom: 1.5rem;
}
```

## Layout Modes

### Narrative Slide Deck

Use for PowerPoint-like presentations.

```css
html {
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  overflow-y: scroll;
}

section {
  min-height: 100vh;
  scroll-snap-align: start;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  padding: 60px 80px;
}

.section-inner {
  max-width: 1100px;
  width: 100%;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.section-inner.visible {
  opacity: 1;
  transform: translateY(0);
}
```

For narrative decks, include:

- Fixed top progress bar
- Right-side section dots
- Arrow key navigation
- Spacebar navigation
- IntersectionObserver reveal behavior
- Optional section-specific animations

### Dense Appendix, Roadmap, Or Changelog Page

Use for competitive analysis, release notes, roadmap briefs, implementation plans, or code changelogs.

```css
.top-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(8, 12, 20, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
  padding: 0 48px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.page-container {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 88px 48px 80px;
}
```

Use this mode for:

- Roadmap milestones
- Changelog entries
- Release trains
- Competitor matrices
- Implementation plans
- Dependency maps
- Architecture summaries

## Component Patterns

### Cards

```css
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px 28px;
  transition: border-color 0.3s ease, transform 0.2s ease;
}

.card:hover {
  border-color: var(--border-hover);
  transform: translateY(-2px);
}
```

### Metric Boxes

```css
.metrics-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.metric-box {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 24px;
  text-align: center;
}

.metric-value {
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  font-variant-numeric: tabular-nums;
}

.metric-label {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-top: 0.25rem;
}
```

Use gradient variants for major numbers:

```css
.gradient-green {
  background: linear-gradient(135deg, #10b981, #34d399 70%, #6ee7b7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gradient-blue {
  background: linear-gradient(135deg, #2563EB, #3B82F6 70%, #60A5FA);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gradient-violet {
  background: linear-gradient(135deg, #8b5cf6, #a78bfa 70%, #c4b5fd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gradient-red {
  background: linear-gradient(135deg, #f87171, #ef4444);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Pills

```css
.pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.pill {
  font-size: 0.8rem;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(59, 130, 246, 0.08);
  border: 1px solid rgba(59, 130, 246, 0.2);
  color: var(--text);
  font-weight: 500;
}
```

### Tables

Use for comparisons, changelogs, matrices, release notes, and risk summaries.

```css
.table-wrap {
  overflow-x: auto;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--surface);
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

th {
  background: var(--surface-raised);
  padding: 14px 18px;
  text-align: left;
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  border-bottom: 1px solid var(--border);
}

td {
  padding: 12px 18px;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  color: var(--text-muted);
}

td:first-child {
  color: var(--text);
  font-weight: 600;
}

tr:hover {
  background: rgba(59, 130, 246, 0.04);
}
```

Status colors:

- Success: `#34d399`
- Risk/error: `#f87171`
- Partial/warning: `#fbbf24`
- Primary/action: `#60A5FA`

## Slide Types

For technical presentations, prefer this arc:

1. Title / thesis slide
2. Vision or problem punchline
3. Current state / pain
4. Product or technical mechanism
5. Architecture / flow / closed loop
6. Evidence / metrics
7. Risks / exposed assumptions
8. Roadmap / 30-60-90 / next steps
9. Closing thesis

For changelog or roadmap HTML, prefer this structure:

1. Header with title, date/range, and short thesis
2. Metric row showing release counts, risk, velocity, and impact
3. Timeline or release train
4. Grouped cards by area: API, frontend, infrastructure, data, security
5. Table of notable changes
6. Risk / migration notes
7. Next milestones

## Technical Demo Patterns

When the source material benefits from a demo, use a framed technical surface:

- Terminal-like incident transcript
- Animated timeline
- Conveyor / queue / pipeline visualization
- System architecture loop
- Release train
- Roadmap swimlanes
- Risk matrix
- Dependency graph

For terminal-like demos:

- Use a dark card with a thin border
- Add small red/yellow/green window dots
- Use monospace content
- Reveal lines sequentially with `data-time` or staggered delays
- Use color-coded spans for alert, agent, muted, highlight, and resolved states

For simulations:

- Use SVG or D3
- Keep controls compact
- Use sliders for rates and numeric settings
- Use a toggle switch for binary modes
- Keep metrics visible above the simulation

## Motion Rules

Use motion sparingly:

- Fade/slide sections into view
- Stagger cards by 120-200ms
- Count up metrics
- Reveal terminal/demo lines sequentially
- Animate simple diagrams only when they clarify the concept

Always include reduced-motion support:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  html { scroll-behavior: auto; }

  .section-inner {
    opacity: 1;
    transform: none;
  }
}
```

## JavaScript Behaviors

For slide decks, include:

- Section dot generation
- Progress bar update
- Current slide reveal
- ArrowDown / Space to advance
- ArrowUp to go back
- Optional Escape handling for modals

Use vanilla JS and IntersectionObserver.

Avoid heavy JavaScript unless building a simulation. If building an interactive technical visual, D3 is acceptable.

## Content Voice

Write like a technical operator explaining a strategy:

- Direct
- Concrete
- High-signal
- No generic marketing claims
- No fluffy slogans unless used as a final punchline
- Use specific nouns: deploys, incidents, telemetry, code context, migrations, queues, validation, rollback, ownership
- Mix leadership framing with implementation detail

Good slide copy:

- "Investigation is table stakes. Resolution is the product."
- "The moat is not the model. It is the operating context."
- "Ship the fix, validate the fix, close the loop."
- "Name the risk, then show the control."

Avoid:

- "Revolutionary"
- "Seamless"
- "Unlock your potential"
- Generic gradients and SaaS landing sections
- Decorative blobs or abstract illustrations

## Implementation Checklist

Before finalizing:

- The page works by opening the HTML file directly.
- Text does not overflow on mobile.
- Slide decks support keyboard navigation.
- Dense pages have fixed top nav.
- Cards, tables, and metrics align cleanly.
- Motion has reduced-motion fallback.
- No required assets are missing.
- External dependencies are limited to fonts and, if needed, D3.

## Reusable Agent Prompt

Use this prompt when asking another agent to generate HTML in this style:

```text
Generate a standalone HTML file for [topic].

Use a dark executive technical presentation style: background #080c14, surfaces #0d1117, Inter font, blue accent gradients, thin translucent borders, subtle mouse-following radial spotlight, polished cards, metric boxes, dense comparison tables, and restrained motion.

The output should feel like a technical strategy deck or production-operations briefing, not a marketing landing page.

If this is a narrative presentation, make it full-screen scroll-snapped sections with a top progress bar, right-side section dots, keyboard navigation, and IntersectionObserver fade-up reveals.

If this is a roadmap/changelog/appendix page, use a fixed translucent top nav, constrained 1200px content width, dense cards, metric rows, tables, and grouped sections.

Use inline CSS and inline vanilla JavaScript. Do not require a build step. Use D3 only if a real interactive simulation or data visualization is needed.

Include reduced-motion support. Make it responsive. Keep the copy direct, technical, and specific. Favor thesis-driven headings, compact uppercase section labels, metrics, risk notes, implementation details, and clear next steps.

Content to include:
[paste source material, roadmap, changelog, outline, or technical notes here]

Generate the complete HTML document.
```
