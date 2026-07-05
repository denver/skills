#!/usr/bin/env node
// Regenerates assets/deck-skeleton.html and assets/page-skeleton.html from the
// canonical sources (base.html + deck.css/deck.js or page.css). Run from the
// skill directory: node scripts/build-skeletons.mjs
// Never edit the skeletons directly; change the source assets and regenerate.

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const assets = join(dirname(fileURLToPath(import.meta.url)), '..', 'assets');
const read = (f) => readFileSync(join(assets, f), 'utf8');

const base = read('base.html');

const STYLE_MARKER = /\/\* ADD your branch stylesheet here:[\s\S]*?\*\//;
const CONTENT_MARKER = '<!-- PAGE / PRESENTATION CONTENT GOES HERE -->';
const SCRIPT_MARKER = '// ADD assets/deck.js here for narrative decks.';

for (const marker of [STYLE_MARKER, CONTENT_MARKER, SCRIPT_MARKER]) {
  const found = typeof marker === 'string' ? base.includes(marker) : marker.test(base);
  if (!found) throw new Error(`base.html is missing a splice marker: ${marker}`);
}

const banner = (branch) => `<!--
  GENERATED FILE - do not edit the visual system here.
  Built from assets/base.html + ${branch} by scripts/build-skeletons.mjs.
  Edits to tokens, components, or behavior belong in those source assets;
  regenerate afterwards. This file is meant to be copied once and filled
  with content.
-->
`;

const deckBody = `<div id="progress"></div>
<div id="dots"></div>

<section>
  <div class="section-inner">
    <!-- Slide content -->
  </div>
</section>`;

const pageBody = `<nav class="top-nav">
  <strong>Title</strong>
  <span class="text-muted">Date or range</span>
</nav>

<main class="page-container">
  <!-- Page content -->
</main>`;

const deck = banner('assets/deck.css + assets/deck.js') +
  base
    .replace(STYLE_MARKER, read('deck.css').trimEnd())
    .replace(CONTENT_MARKER, deckBody)
    .replace(SCRIPT_MARKER, read('deck.js').trimEnd());

const page = banner('assets/page.css') +
  base
    .replace(STYLE_MARKER, read('page.css').trimEnd())
    .replace(CONTENT_MARKER, pageBody)
    .replace(SCRIPT_MARKER, '');

writeFileSync(join(assets, 'deck-skeleton.html'), deck);
writeFileSync(join(assets, 'page-skeleton.html'), page);
console.log('Wrote assets/deck-skeleton.html and assets/page-skeleton.html');
