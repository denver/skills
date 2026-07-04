// Narrative slide deck behavior — paste into base.html <script> (after the spotlight handler).
// Expects <div id="progress"></div>, <div id="dots"></div>, and <section> elements each
// wrapping a .section-inner. Mirrors the reference deck: width-based progress bar.

(() => {
  const sections = Array.from(document.querySelectorAll('section'));
  const progress = document.getElementById('progress');
  const dotsWrap = document.getElementById('dots');

  // Build one dot per section
  const dots = sections.map((s, i) => {
    const b = document.createElement('button');
    b.addEventListener('click', () => s.scrollIntoView({ behavior: 'smooth' }));
    dotsWrap.appendChild(b);
    return b;
  });

  // Reveal on scroll + sync progress bar and active dot
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelector('.section-inner')?.classList.add('visible');
      const idx = sections.indexOf(entry.target);
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
      progress.style.width = ((idx + 1) / sections.length) * 100 + '%';
    });
  }, { threshold: 0.5 });
  sections.forEach(s => observer.observe(s));

  // Keyboard navigation
  const currentIndex = () =>
    sections.findIndex(s => s.getBoundingClientRect().top >= -window.innerHeight / 2);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === ' ') {
      e.preventDefault();
      const c = currentIndex();
      if (c !== -1) sections[Math.min(c + 1, sections.length - 1)].scrollIntoView({ behavior: 'smooth' });
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const c = currentIndex();
      if (c !== -1) sections[Math.max(c - 1, 0)].scrollIntoView({ behavior: 'smooth' });
    }
  });
})();
