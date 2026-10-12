// Homepage motion (styles/home-steep.css → "Scroll motion"), modelled on
// steep.app's hero.
//
// 1. Pinned hero (desktop): the hero sticks for PIN_PX of scroll and the
//    scroll position scrubs a sequence:
//      0    → 0.45  pill and headline shrink, rise and fade away
//      0    → 0.55  the four product cards glide from around the headline
//                   and dock onto the edges of the app window, which rises
//                   in from below; the warm background drifts up
//      0.62 → 0.80  the cards fade out and the window switches to its
//                   second screen (bulk item dimensions)
//      0.80 → 1     hold, then the page scrolls on
// 2. Reveal: sections below the hero fade in and rise once as they enter.
//
// Everything is gated on <html>.st-motion, which pages/_document.js adds
// before first paint (never for reduced motion; removed by a failsafe if
// the bundle doesn't run), so there's no flash and nothing gets stuck.
// Returns a cleanup function.

// Must match the pinned-hero media query in home-steep.css.
const PIN_QUERY = '(min-width: 901px) and (min-height: 620px)';
const PIN_PX = 1500;

// Docked card centres, relative to the window: fraction of its width and
// height from its centre, plus a px nudge so each card overlaps the edge.
const DOCK = {
  'st-f1': { fx: -0.5, fy: -0.22, ox: 28 },
  'st-f2': { fx: 0.5, fy: -0.26, ox: -28 },
  'st-f3': { fx: -0.5, fy: 0.24, ox: 28 },
  'st-f4': { fx: 0.5, fy: 0.26, ox: -28 },
};

// Must match the reveal selector list in home-steep.css.
const REVEAL = [
  '.st-h2', '.st-body-lg', '.st-numlist li', '.st-card', '.st-note',
  '.st-steps li', '.st-sec .st-split > div > .st-link', '.st-accent',
].join(',');
const STAGGER_GROUPS = ['.st-cards', '.st-steps', '.st-numlist'];

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const span = (p, a, b) => clamp01((p - a) / (b - a));
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const lerp = (a, b, t) => a + (b - a) * t;

function initReveal(root) {
  STAGGER_GROUPS.forEach((sel) => {
    root.querySelectorAll(sel).forEach((group) => {
      Array.from(group.children).forEach((el, i) => el.style.setProperty('--st-d', Math.min(i * 70, 350) + 'ms'));
    });
  });
  const targets = Array.from(root.querySelectorAll(REVEAL));
  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('st-in'));
    return () => {};
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('st-in');
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  targets.forEach((el) => io.observe(el));
  return () => io.disconnect();
}

function initPinnedHero(root) {
  const hero = root.querySelector('.st-hero');
  if (!hero) return () => {};
  const copy = hero.querySelector('.st-hero-copy');
  const pill = hero.querySelector('.st-pill');
  const bg = hero.querySelector('.st-hero-bg');
  const win = hero.querySelector('.st-window');
  const screen2 = hero.querySelector('.st-screen-2');
  const cap1 = hero.querySelector('.st-cap-1');
  const cap2 = hero.querySelector('.st-cap-2');
  const cards = Array.from(hero.querySelectorAll('.st-float')).map((el) => {
    const key = Object.keys(DOCK).find((k) => el.classList.contains(k));
    const cs = getComputedStyle(el);
    return { el, dock: DOCK[key], sx: parseFloat(cs.getPropertyValue('--sx')) || 0, sy: parseFloat(cs.getPropertyValue('--sy')) || 0 };
  });
  const mq = window.matchMedia(PIN_QUERY);
  hero.style.setProperty('--st-pin', PIN_PX + 'px');

  const clear = () => {
    [copy, pill, bg, win, screen2, cap1, cap2, ...cards.map((c) => c.el)].forEach((el) => {
      if (el) { el.style.transform = ''; el.style.opacity = ''; }
    });
  };

  let frame = 0;
  const render = () => {
    frame = 0;
    if (!mq.matches) { clear(); return; }
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const top = hero.getBoundingClientRect().top;
    const p = clamp01(-top / PIN_PX);

    // Headline block + pill
    const out = easeOut(span(p, 0, 0.5));
    copy.style.transform = `translateY(${(-18 * out).toFixed(2)}vh) scale(${(1 - 0.45 * out).toFixed(4)})`;
    copy.style.opacity = (1 - span(p, 0, 0.42)).toFixed(3);
    if (pill) pill.style.opacity = (1 - span(p, 0, 0.18)).toFixed(3);

    // Background drift
    if (bg) bg.style.transform = `translateY(${(-130 * span(p, 0, 0.55)).toFixed(1)}px)`;

    // Window rises in
    const dock = easeInOut(span(p, 0, 0.55));
    win.style.transform = `translate(-50%, calc(-50% + ${(64 * (1 - dock)).toFixed(2)}vh)) scale(${(0.92 + 0.08 * dock).toFixed(4)})`;
    win.style.opacity = span(p, 0.04, 0.3).toFixed(3);

    // Cards glide from around the headline to the window edges. Docked
    // positions come from the window's final (unscaled, unshifted) box.
    const nav = 64;
    const winW = win.offsetWidth;
    const winH = win.offsetHeight;
    const cx = vw / 2;
    const cy = nav + (vh - nav) * 0.52;
    const fadeCards = 1 - span(p, 0.62, 0.78);
    cards.forEach((c) => {
      const sx = cx + (c.sx / 100) * vw;
      const sy = vh / 2 + (c.sy / 100) * vh;
      const ex = cx + c.dock.fx * winW + c.dock.ox;
      const ey = cy + c.dock.fy * winH;
      const x = lerp(sx, ex, dock) - vw / 2;
      const y = lerp(sy, ey, dock) - vh / 2;
      c.el.style.transform = `translate(calc(-50% + ${x.toFixed(1)}px), calc(-50% + ${y.toFixed(1)}px))`;
      c.el.style.opacity = fadeCards.toFixed(3);
    });

    // Second screen
    const swap = span(p, 0.64, 0.8);
    screen2.style.opacity = swap.toFixed(3);
    cap1.style.opacity = (1 - swap).toFixed(3);
    cap2.style.opacity = swap.toFixed(3);
  };
  const onScroll = () => { if (!frame) frame = requestAnimationFrame(render); };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  if (mq.addEventListener) mq.addEventListener('change', onScroll);
  render();

  return () => {
    if (frame) cancelAnimationFrame(frame);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
    if (mq.removeEventListener) mq.removeEventListener('change', onScroll);
  };
}

export function initHomeMotion(root) {
  if (!root || !document.documentElement.classList.contains('st-motion')) return () => {};
  const stopReveal = initReveal(root);
  const stopHero = initPinnedHero(root);
  return () => { stopReveal(); stopHero(); };
}
