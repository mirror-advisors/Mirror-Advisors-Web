'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

// ─── PUZZLE MODEL ──────────────────────────────────────────────────────────────
// 13 pieces scatter across the hero stage. Tapping a piece reveals the first
// "group" (sub-puzzle) it belongs to; tapping the same piece again cycles
// through its other groups. Tapping empty stage or pressing Escape resets.

interface PieceData {
  key: string;
  label: string;
  groups: number[];
  color: string;
  initials: string;
}

interface GridPos {
  key: string;
  c: number;
  r: number;
}

interface GroupLayout {
  cols: number;
  rows: number;
  positions: GridPos[];
}

const GROUP_NAMES: Record<number, string> = {
  1: 'Retail & Commerce',
  2: 'AI Operations',
  3: 'Finance & Audit',
  4: 'Sales & Service',
  5: 'The Full Stack',
};

const PIECES_DATA: PieceData[] = [
  { key: 'shopify', label: 'Shopify', groups: [1], color: '#95BF47', initials: 'Sh' },
  { key: 'zoho_crm', label: 'Zoho CRM', groups: [1, 4], color: '#E42527', initials: 'CRM' },
  { key: 'google', label: 'Google Workspace', groups: [1, 4, 5], color: '#4285F4', initials: 'G' },
  { key: 'quickbooks', label: 'QuickBooks', groups: [1, 3], color: '#2CA01C', initials: 'qb' },
  { key: 'claude', label: 'Claude AI', groups: [1, 2, 4, 5], color: '#D97757', initials: 'C' },
  { key: 'chatgpt', label: 'ChatGPT', groups: [2, 4, 5], color: '#10A37F', initials: 'GPT' },
  { key: 'gemini', label: 'Gemini', groups: [2, 5], color: '#9168C0', initials: 'Gm' },
  { key: 'zoho_books', label: 'Zoho Books', groups: [1, 3], color: '#089949', initials: 'Bk' },
  { key: 'mirror', label: 'Mirror Advisors', groups: [2, 5], color: '#ECA934', initials: 'MA' },
  { key: 'zoho_one', label: 'Zoho One', groups: [3, 4, 5], color: '#FF6B35', initials: 'Z1' },
  { key: 'zoho_desk', label: 'Zoho Desk', groups: [4], color: '#226DB4', initials: 'Dk' },
  { key: 'zoho_expense', label: 'Zoho Expense', groups: [3], color: '#F7931E', initials: 'Ex' },
  { key: 'zoho', label: 'Zoho', groups: [5], color: '#E42527', initials: 'Zo' },
];

const GROUP_LAYOUTS: Record<number, GroupLayout> = {
  1: {
    cols: 3,
    rows: 2,
    positions: [
      { key: 'shopify', c: 0, r: 0 },
      { key: 'zoho_crm', c: 1, r: 0 },
      { key: 'google', c: 2, r: 0 },
      { key: 'quickbooks', c: 0, r: 1 },
      { key: 'claude', c: 1, r: 1 },
      { key: 'zoho_books', c: 2, r: 1 },
    ],
  },
  2: {
    cols: 2,
    rows: 2,
    positions: [
      { key: 'claude', c: 0, r: 0 },
      { key: 'chatgpt', c: 1, r: 0 },
      { key: 'gemini', c: 0, r: 1 },
      { key: 'mirror', c: 1, r: 1 },
    ],
  },
  3: {
    cols: 2,
    rows: 2,
    positions: [
      { key: 'quickbooks', c: 0, r: 0 },
      { key: 'zoho_books', c: 1, r: 0 },
      { key: 'zoho_expense', c: 0, r: 1 },
      { key: 'zoho_one', c: 1, r: 1 },
    ],
  },
  4: {
    cols: 3,
    rows: 2,
    positions: [
      { key: 'zoho_crm', c: 0, r: 0 },
      { key: 'zoho_desk', c: 1, r: 0 },
      { key: 'google', c: 2, r: 0 },
      { key: 'chatgpt', c: 0, r: 1 },
      { key: 'claude', c: 1, r: 1 },
      { key: 'zoho_one', c: 2, r: 1 },
    ],
  },
  5: {
    cols: 3,
    rows: 2,
    positions: [
      { key: 'zoho', c: 0, r: 0 },
      { key: 'mirror', c: 1, r: 0 },
      { key: 'claude', c: 2, r: 0 },
      { key: 'chatgpt', c: 0, r: 1 },
      { key: 'google', c: 1, r: 1 },
      { key: 'gemini', c: 2, r: 1 },
    ],
  },
};

const SCATTER_POSITIONS = [
  { x: 14, y: 12 }, { x: 38, y: 8 }, { x: 64, y: 14 }, { x: 87, y: 9 },
  { x: 11, y: 36 }, { x: 34, y: 32 }, { x: 58, y: 38 }, { x: 84, y: 33 },
  { x: 22, y: 62 }, { x: 50, y: 60 }, { x: 76, y: 64 }, { x: 35, y: 87 },
  { x: 70, y: 89 },
];

const SCATTER_ROTATIONS = [-12, 18, -7, 23, -19, 11, -25, 8, 16, -14, 22, -9, 14];

const PIECE_SIZE_PCT = 24;
const BODY_FRAC = 100 / 144;
const GRID_MAX_W = 70;
const GRID_MAX_H = 70;
const VB_PAD = 22;

// ─── PATH BUILDING — jigsaw edges with knobs ──────────────────────────────────
const edgeH = (c: number, r: number) => ((c * 7 + r * 13) % 2 === 0 ? 1 : -1);
const edgeV = (c: number, r: number) => ((c * 11 + r * 5) % 2 === 0 ? 1 : -1);

function getEdgesInGroup(groupId: number, key: string) {
  const layout = GROUP_LAYOUTS[groupId];
  const pos = layout.positions.find((p) => p.key === key);
  if (!pos) return { top: 0, right: 0, bottom: 0, left: 0 };
  const COLS = layout.cols;
  const ROWS = layout.rows;
  return {
    top: pos.r === 0 ? 0 : edgeH(pos.c, pos.r),
    bottom: pos.r === ROWS - 1 ? 0 : -edgeH(pos.c, pos.r + 1),
    left: pos.c === 0 ? 0 : edgeV(pos.c, pos.r),
    right: pos.c === COLS - 1 ? 0 : -edgeV(pos.c + 1, pos.r),
  };
}

function buildPiecePath(edges: { top: number; right: number; bottom: number; left: number }) {
  const W = 100;
  const H = 100;
  const T = 18;
  function knob(side: 'top' | 'right' | 'bottom' | 'left', sign: number) {
    const len = side === 'top' || side === 'bottom' ? W : H;
    const s = len * 0.35;
    const e = len * 0.65;
    const sweep = sign > 0 ? 1 : 0;
    if (side === 'top') return `L ${s} 0 A ${(e - s) / 2} ${T} 0 0 ${sweep} ${e} 0 `;
    if (side === 'right') return `L ${W} ${s} A ${T} ${(e - s) / 2} 0 0 ${sweep} ${W} ${e} `;
    if (side === 'bottom') return `L ${e} ${H} A ${(e - s) / 2} ${T} 0 0 ${sweep} ${s} ${H} `;
    return `L 0 ${e} A ${T} ${(e - s) / 2} 0 0 ${sweep} 0 ${s} `;
  }
  let d = 'M 0 0 ';
  d += edges.top === 0 ? `L ${W} 0 ` : knob('top', edges.top) + `L ${W} 0 `;
  d += edges.right === 0 ? `L ${W} ${H} ` : knob('right', edges.right) + `L ${W} ${H} `;
  d += edges.bottom === 0 ? `L 0 ${H} ` : knob('bottom', edges.bottom) + `L 0 ${H} `;
  d += edges.left === 0 ? 'L 0 0 ' : knob('left', edges.left) + 'L 0 0 ';
  return d + 'Z';
}

function groupMetrics(groupId: number) {
  const layout = GROUP_LAYOUTS[groupId];
  const cellSize = Math.min(GRID_MAX_W / layout.cols, GRID_MAX_H / layout.rows);
  const gridW = cellSize * layout.cols;
  const gridH = cellSize * layout.rows;
  return {
    layout,
    cellSize,
    pieceSize: cellSize / BODY_FRAC,
    gridLeft: (100 - gridW) / 2,
    gridTop: (100 - gridH) / 2,
  };
}

function assembledPosition(groupId: number, key: string) {
  const m = groupMetrics(groupId);
  const pos = m.layout.positions.find((p) => p.key === key);
  if (!pos) return null;
  return {
    x: m.gridLeft + m.cellSize * pos.c + m.cellSize / 2,
    y: m.gridTop + m.cellSize * pos.r + m.cellSize / 2,
    size: m.pieceSize,
  };
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────
const HINT_DEFAULT = 'Tap a piece to explore';
const HINT_AFTER_FIRST = 'Tap again to cycle groups';

export function HeroPuzzle() {
  // active group: 0 = neutral (all scattered), otherwise the group ID being shown
  const [activeGroup, setActiveGroup] = useState(0);
  // which piece was last clicked (for cycle tracking)
  const [activePieceKey, setActivePieceKey] = useState('');
  // per-piece cycle index — which entry in piece.groups[] is currently shown
  const [cycleIdx, setCycleIdx] = useState<Record<string, number>>({});
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Pre-compute path data for every (piece, group) combination
  const pathByPieceGroup = useMemo(() => {
    const map: Record<string, Record<number, string>> = {};
    for (const p of PIECES_DATA) {
      map[p.key] = {};
      for (const g of p.groups) {
        map[p.key][g] = buildPiecePath(getEdgesInGroup(g, p.key));
      }
    }
    return map;
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && activeGroup !== 0) {
        reset();
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeGroup]);

  function reset() {
    setActiveGroup(0);
    setActivePieceKey('');
    setCycleIdx({});
  }

  function onPieceClick(piece: PieceData) {
    setHasInteracted(true);

    let nextIdx: number;
    if (activePieceKey === piece.key && activeGroup !== 0) {
      const currentIdx = cycleIdx[piece.key] ?? 0;
      nextIdx = currentIdx + 1;
      if (nextIdx >= piece.groups.length) {
        reset();
        return;
      }
    } else {
      nextIdx = 0;
    }

    setCycleIdx({ [piece.key]: nextIdx });
    setActivePieceKey(piece.key);
    setActiveGroup(piece.groups[nextIdx]);
  }

  function onStageClick(e: React.MouseEvent) {
    // Only fire if click landed on the stage itself, not a piece
    if (e.target === e.currentTarget && activeGroup !== 0) {
      reset();
    }
  }

  const currentCycle = activeGroup !== 0 && activePieceKey
    ? { current: (cycleIdx[activePieceKey] ?? 0) + 1, total: PIECES_DATA.find((p) => p.key === activePieceKey)?.groups.length ?? 1 }
    : { current: 0, total: 0 };

  const headerText =
    hoverLabel && activeGroup === 0
      ? hoverLabel
      : activeGroup !== 0
        ? GROUP_NAMES[activeGroup]
        : hasInteracted
          ? HINT_AFTER_FIRST
          : HINT_DEFAULT;

  return (
    <div
      className={`hero-puzzle${activeGroup !== 0 ? ' is-active' : ''}`}
      id="heroPuzzle"
      aria-label="Interactive integration map"
    >
      <div className="hero-puzzle-header">
        <div className="hero-puzzle-header-pill">
          <span className="hp-hint-dot"></span>
          <span>{headerText}</span>
          {currentCycle.total > 1 && (
            <span className="hp-cycle" style={{ display: 'inline-flex' }}>
              <span className="hp-cycle-current">{currentCycle.current}</span>
              <span className="hp-cycle-sep">/</span>
              <span className="hp-cycle-total">{currentCycle.total}</span>
            </span>
          )}
        </div>
      </div>

      <div
        className="hero-puzzle-stage"
        aria-live="polite"
        onClick={onStageClick}
      >
        {PIECES_DATA.map((piece, idx) => {
          const scatter = SCATTER_POSITIONS[idx % SCATTER_POSITIONS.length];
          const rot = SCATTER_ROTATIONS[idx % SCATTER_ROTATIONS.length];

          let snapped = false;
          let pos: { x: number; y: number; size?: number } = {
            x: scatter.x,
            y: scatter.y,
            size: PIECE_SIZE_PCT,
          };
          let pathD = pathByPieceGroup[piece.key][piece.groups[0]];
          let dimmed = false;

          if (activeGroup !== 0) {
            if (piece.groups.includes(activeGroup)) {
              const asm = assembledPosition(activeGroup, piece.key);
              if (asm) {
                snapped = true;
                pos = asm;
                pathD = pathByPieceGroup[piece.key][activeGroup];
              } else {
                dimmed = true;
              }
            } else {
              dimmed = true;
            }
          }

          const vbMin = -VB_PAD;
          const vbSize = 100 + 2 * VB_PAD;

          return (
            <button
              key={piece.key}
              className={`puzzle-piece${snapped ? ' is-snapped' : ''}${dimmed ? ' is-dimmed' : ''}`}
              aria-label={piece.label}
              title={piece.label}
              style={
                {
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  width: `${pos.size ?? PIECE_SIZE_PCT}%`,
                  height: `${pos.size ?? PIECE_SIZE_PCT}%`,
                  ['--brand' as string]: piece.color,
                  ['--rot' as string]: snapped ? '0deg' : `${rot}deg`,
                } as React.CSSProperties
              }
              onClick={(e) => {
                e.stopPropagation();
                onPieceClick(piece);
              }}
              onMouseEnter={() => {
                if (activeGroup !== 0) return;
                if (hoverTimer.current) clearTimeout(hoverTimer.current);
                setHoverLabel(piece.label);
              }}
              onMouseLeave={() => {
                if (activeGroup !== 0) return;
                if (hoverTimer.current) clearTimeout(hoverTimer.current);
                hoverTimer.current = setTimeout(() => setHoverLabel(null), 120);
              }}
            >
              <svg
                className="pp-svg"
                viewBox={`${vbMin} ${vbMin} ${vbSize} ${vbSize}`}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path className="pp-path" d={pathD} />
                {/* Brand circle + initials fallback (no base64 logos in the new codebase) */}
                <circle cx="50" cy="50" r="22" fill={piece.color} opacity="0.18" />
                <text
                  x="50"
                  y="56"
                  textAnchor="middle"
                  fontFamily="Montserrat, sans-serif"
                  fontWeight="800"
                  fontSize={piece.initials.length > 2 ? 18 : 24}
                  fill={piece.color}
                >
                  {piece.initials}
                </text>
              </svg>
            </button>
          );
        })}
      </div>
    </div>
  );
}
