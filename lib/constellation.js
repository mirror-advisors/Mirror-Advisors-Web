// Decorative particle constellation (redesign).
//
// Finds <canvas data-constellation="shape"> elements inside a root node and
// draws a field of tiny outlined triangles that drift in from scattered
// positions and settle into one organic shape. Purely decorative: canvases
// are aria-hidden in markup, colours come from CSS custom properties
// (--d-p1 … --d-p6) so a palette swap only touches the token block, and
// under prefers-reduced-motion the final shape is drawn once, static.

const COLOR_VARS = ['--d-p1', '--d-p1', '--d-p2', '--d-p2', '--d-p3', '--d-p4', '--d-p5', '--d-p6'];

// Small deterministic PRNG so every load draws the same constellation.
function rng(seed) {
  let s = seed >>> 0;
  return function () {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function gauss(r) {
  return (r() + r() + r() - 1.5) / 1.5;
}

// A point inside an organic, slightly lobed blob centred on (cx, cy).
function blob(r, cx, cy, rad, sx, sy, ph) {
  const a = r() * Math.PI * 2;
  const edge =
    1 +
    0.13 * Math.sin(3 * a + ph) +
    0.08 * Math.sin(5 * a + ph * 1.7) +
    0.05 * Math.sin(8 * a + ph * 0.6);
  let d = Math.pow(r(), 0.62) * edge * rad;
  if (r() < 0.08) d *= 1 + Math.abs(gauss(r)) * 0.45; // a little spill past the edge
  return [cx + Math.cos(a) * d * sx, cy + Math.sin(a) * d * sy];
}

function scattered(r) {
  const a = r() * Math.PI * 2;
  const d = 0.55 + r() * 0.5;
  return [Math.cos(a) * d * 1.3, Math.sin(a) * d];
}

// Each shape returns [{tx, ty, sx, sy}] in unit space (roughly -0.5…0.5).
const SHAPES = {
  // Six separate clusters converge into one shape: one system.
  one(r, n) {
    const out = [];
    const centres = [];
    for (let k = 0; k < 6; k++) {
      const a = (k / 6) * Math.PI * 2 + 0.4;
      centres.push([Math.cos(a) * 0.62, Math.sin(a) * 0.5]);
    }
    for (let i = 0; i < n; i++) {
      const [tx, ty] = blob(r, 0, 0, 0.36, 1.18, 0.92, 0.9);
      const c = centres[i % 6];
      out.push({ tx, ty, sx: c[0] + gauss(r) * 0.07, sy: c[1] + gauss(r) * 0.07 });
    }
    return out;
  },
  // Two systems, then the connection forms between them.
  bridge(r, n) {
    const out = [];
    for (let i = 0; i < n; i++) {
      const pick = r();
      let tx, ty, sx, sy;
      if (pick < 0.38) {
        [tx, ty] = blob(r, -0.3, 0.02, 0.2, 1, 1.05, 1.3);
        sx = tx + gauss(r) * 0.03; sy = ty + gauss(r) * 0.03;
      } else if (pick < 0.76) {
        [tx, ty] = blob(r, 0.3, -0.02, 0.2, 1, 1.05, 2.6);
        sx = tx + gauss(r) * 0.03; sy = ty + gauss(r) * 0.03;
      } else {
        const u = r();
        tx = -0.2 + u * 0.4 + gauss(r) * 0.015;
        ty = Math.sin(u * Math.PI * 2) * 0.05 + gauss(r) * 0.028;
        [sx, sy] = scattered(r);
      }
      out.push({ tx, ty, sx, sy });
    }
    return out;
  },
  // Five stages along a rising arc, linked into one path.
  path(r, n) {
    const out = [];
    const nodes = [];
    for (let k = 0; k < 5; k++) {
      const u = k / 4;
      nodes.push([-0.42 + u * 0.84, 0.26 - Math.sin(u * Math.PI * 0.85) * 0.36 - u * 0.08, 0.07 + k * 0.018]);
    }
    for (let i = 0; i < n; i++) {
      let tx, ty;
      if (r() < 0.8) {
        const nd = nodes[Math.floor(r() * 5)];
        [tx, ty] = blob(r, nd[0], nd[1], nd[2], 1, 1, nd[0] * 7);
      } else {
        const k = Math.floor(r() * 4);
        const a = nodes[k], b = nodes[k + 1], u = r();
        tx = a[0] + (b[0] - a[0]) * u + gauss(r) * 0.012;
        ty = a[1] + (b[1] - a[1]) * u + gauss(r) * 0.012;
      }
      const [sx, sy] = scattered(r);
      out.push({ tx, ty, sx, sy });
    }
    return out;
  },
  // A lens: an organic ring with a dense core.
  ring(r, n) {
    const out = [];
    for (let i = 0; i < n; i++) {
      let tx, ty;
      if (r() < 0.7) {
        const a = r() * Math.PI * 2;
        const d = 0.34 * (1 + 0.07 * Math.sin(4 * a + 1)) + gauss(r) * 0.03;
        tx = Math.cos(a) * d * 1.08; ty = Math.sin(a) * d;
      } else {
        [tx, ty] = blob(r, 0, 0, 0.13, 1, 1, 2);
      }
      const [sx, sy] = scattered(r);
      out.push({ tx, ty, sx, sy });
    }
    return out;
  },
  cloud(r, n) {
    const out = [];
    for (let i = 0; i < n; i++) {
      const [tx, ty] = blob(r, 0, 0, 0.32, 1.15, 0.9, 2.2);
      const [sx, sy] = scattered(r);
      out.push({ tx, ty, sx, sy });
    }
    return out;
  },
};

function readColors() {
  const cs = getComputedStyle(document.documentElement);
  const cols = COLOR_VARS.map((v) => cs.getPropertyValue(v).trim()).filter(Boolean);
  return cols.length ? cols : ['#ffffff'];
}

function mount(canvas) {
  const shapeName = canvas.getAttribute('data-constellation') || 'cloud';
  const shape = SHAPES[shapeName] || SHAPES.cloud;
  const seed = parseInt(canvas.getAttribute('data-seed') || '7', 10);
  const density = parseFloat(canvas.getAttribute('data-density') || '1');
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  const colors = readColors();
  const r = rng(seed * 9973 + shapeName.length);
  const count = Math.round(780 * density);
  const parts = shape(r, count).map((p) => ({
    ...p,
    size: 1.8 + Math.pow(r(), 2.2) * 4.2,
    rot: r() * Math.PI * 2,
    spin: (r() - 0.5) * 0.6,
    col: Math.floor(r() * colors.length),
    alpha: r() < 0.25 ? 0.45 : r() < 0.6 ? 0.75 : 1,
    delay: r() * 0.4,
    ph: r() * Math.PI * 2,
  }));
  const ambient = [];
  const ambientCount = Math.round(70 * density);
  for (let i = 0; i < ambientCount; i++) {
    ambient.push({
      x: r(), y: r(), size: 1.6 + r() * 2.6, rot: r() * Math.PI * 2,
      spin: (r() - 0.5) * 0.3, col: Math.floor(r() * colors.length), ph: r() * Math.PI * 2,
    });
  }

  let w = 0, h = 0, dpr = 1, raf = 0, start = 0, visible = true, alive = true;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    dpr = Math.min(2, window.devicePixelRatio || 1);
    w = Math.max(1, rect.width);
    h = Math.max(1, rect.height);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
  }

  function tri(x, y, s, a) {
    for (let k = 0; k < 3; k++) {
      const ang = a + (k * Math.PI * 2) / 3;
      const px = x + Math.cos(ang) * s;
      const py = y + Math.sin(ang) * s;
      if (k === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.closePath();
  }

  function ease(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function draw(now) {
    const elapsed = reduce ? 1e9 : start < 0 ? 0 : now - start;
    const prog = Math.min(1, elapsed / 2800);
    const time = elapsed / 1000;
    const unit = Math.min(w * 0.92, h * 1.15);
    const cx = w / 2, cy = h / 2;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.lineWidth = 1;
    ctx.lineJoin = 'miter';

    // Batch strokes by colour + alpha bucket.
    for (let c = 0; c < colors.length; c++) {
      ctx.strokeStyle = colors[c];
      for (const alpha of [0.45, 0.75, 1]) {
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        for (let i = 0; i < parts.length; i++) {
          const p = parts[i];
          if (p.col !== c || p.alpha !== alpha) continue;
          const local = Math.max(0, Math.min(1, (prog - p.delay) / (1 - p.delay)));
          const e = ease(local);
          const drift = reduce ? 0 : 0.006 * e;
          const x = p.sx + (p.tx - p.sx) * e + Math.sin(time * 0.6 + p.ph) * drift;
          const y = p.sy + (p.ty - p.sy) * e + Math.cos(time * 0.5 + p.ph) * drift;
          tri(cx + x * unit, cy + y * unit, p.size, p.rot + (reduce ? 0 : time * p.spin));
        }
        ctx.stroke();
      }
      // Ambient field, low opacity, across the whole canvas.
      ctx.globalAlpha = 0.28;
      ctx.beginPath();
      for (let i = 0; i < ambient.length; i++) {
        const a = ambient[i];
        if (a.col !== c) continue;
        const dx = reduce ? 0 : Math.sin(time * 0.15 + a.ph) * 6;
        const dy = reduce ? 0 : Math.cos(time * 0.12 + a.ph) * 6;
        tri(a.x * w + dx, a.y * h + dy, a.size, a.rot + (reduce ? 0 : time * a.spin));
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  function loop(now) {
    if (!alive) return;
    draw(now);
    // Keep going while visible, or until a started convergence has settled.
    const settling = start >= 0 && now - start < 3000;
    if (!reduce && (visible || settling) && !document.hidden) raf = requestAnimationFrame(loop);
    else raf = 0;
  }

  function kick() {
    if (!raf && alive && !reduce) raf = requestAnimationFrame(loop);
  }

  // The convergence starts the first time the canvas scrolls into view.
  const hasIO = typeof IntersectionObserver !== 'undefined';
  start = hasIO ? -1 : performance.now();
  visible = !hasIO;
  resize();
  draw(performance.now());
  kick();

  const ro = typeof ResizeObserver !== 'undefined'
    ? new ResizeObserver(() => { resize(); draw(performance.now()); })
    : null;
  if (ro) ro.observe(canvas);

  const io = hasIO
    ? new IntersectionObserver((entries) => {
        visible = !!(entries[0] && entries[0].isIntersecting);
        if (visible && start < 0) start = performance.now();
        if (visible) kick();
      })
    : null;
  if (io) io.observe(canvas);

  const onVis = () => { if (!document.hidden) kick(); };
  document.addEventListener('visibilitychange', onVis);

  return () => {
    alive = false;
    if (raf) cancelAnimationFrame(raf);
    if (ro) ro.disconnect();
    if (io) io.disconnect();
    document.removeEventListener('visibilitychange', onVis);
  };
}

export function mountConstellations(root) {
  if (typeof window === 'undefined' || !root) return () => {};
  const cleanups = [];
  root.querySelectorAll('canvas[data-constellation]').forEach((c) => {
    try { cleanups.push(mount(c)); } catch (e) { /* decorative only */ }
  });
  return () => cleanups.forEach((fn) => fn());
}
