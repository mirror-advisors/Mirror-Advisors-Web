// Homepage scroll motion (styles/home-steep.css → "Scroll motion").
//
// 1. Reveal: blocks fade in and rise as they enter the viewport, once.
//    They start hidden only while <html> has .st-motion, which the inline
//    script in pages/_document.js adds before first paint (and removes
//    again if the app bundle never runs), so there's no flash and no
//    content stuck invisible.
// 2. Hero float: on desktop the two stat cards drift a few pixels against
//    the screenshot while scrolling.
//
// Returns a cleanup function. No-op when <html> lacks .st-motion (reduced
// motion, or the failsafe already fired).

// Must match the selector list in home-steep.css.
const REVEAL = [
  '.st-display', '.st-lead', '.st-actions', '.st-tagline', '.st-stage',
  '.st-h2', '.st-body-lg', '.st-numlist li', '.st-card', '.st-note',
  '.st-steps li', '.st-sec .st-split > div > .st-link', '.st-accent',
].join(',');

// Stagger siblings that arrive together.
const STAGGER_GROUPS = ['.st-cards', '.st-steps', '.st-numlist'];
const HERO_ORDER = ['.st-display', '.st-lead', '.st-actions', '.st-tagline', '.st-stage'];

export function initHomeMotion(root) {
  const html = document.documentElement;
  if (!root || !html.classList.contains('st-motion')) return () => {};

  const targets = Array.from(root.querySelectorAll(REVEAL));
  HERO_ORDER.forEach((sel, i) => {
    const el = root.querySelector('.st-hero ' + sel);
    if (el) el.style.setProperty('--st-d', i * 90 + 'ms');
  });
  STAGGER_GROUPS.forEach((sel) => {
    root.querySelectorAll(sel).forEach((group) => {
      Array.from(group.children).forEach((el, i) => el.style.setProperty('--st-d', Math.min(i * 70, 350) + 'ms'));
    });
  });

  let io = null;
  if ('IntersectionObserver' in window) {
    io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('st-in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    targets.forEach((el) => io.observe(el));
  } else {
    targets.forEach((el) => el.classList.add('st-in'));
  }

  // Hero float. Progress runs -1 → 1 as the stage crosses the viewport.
  const stage = root.querySelector('.st-stage');
  const statA = root.querySelector('.st-stat-a');
  const statB = root.querySelector('.st-stat-b');
  const wide = window.matchMedia('(min-width: 901px)');
  let frame = 0;
  const float = () => {
    frame = 0;
    if (!stage || !statA || !statB) return;
    if (!wide.matches) {
      statA.style.removeProperty('--st-float');
      statB.style.removeProperty('--st-float');
      return;
    }
    const r = stage.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / vh));
    statA.style.setProperty('--st-float', (p * 28).toFixed(1) + 'px');
    statB.style.setProperty('--st-float', (p * -20).toFixed(1) + 'px');
  };
  const onScroll = () => { if (!frame) frame = requestAnimationFrame(float); };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  float();

  return () => {
    if (io) io.disconnect();
    if (frame) cancelAnimationFrame(frame);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
  };
}
