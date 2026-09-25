import { useEffect, useLayoutEffect, useRef, useState, type ReactElement } from 'react';
import { createPortal } from 'react-dom';

/* Touch-screen page turning that follows the thumb — a layer BESIDE the
   engine (src/deck stays untouched).

   Model: a flat paper fold. The page's right edge point P0 is dragged to P;
   the fold line L is the perpendicular bisector of P0→P. Everything of the
   leaf beyond L is reflected across L (the flap — the back of the paper, with
   the print faintly showing through), the part before L stays flat, and the
   page underneath shows beyond L. Horizontal thumb movement moves the fold,
   vertical movement tilts it.

   Layers (all static, only transforms/opacity change per frame):
     under  – the page revealed underneath (+ the flap's cast shadow)
     clip   – a half-plane clipper aligned to L, holding
       front – the flat part of the leaf
       flap  – the leaf reflected across L (paper + sheen)

   Current page = a DOM clone of the live slide (keeps scroll/tab state);
   the other page = a static React render of that slide (final state), so
   nothing pops in mid-turn. Navigation goes through the URL hash, which the
   engine already listens to (jumps straight to a slide, ignoring builds —
   on touch screens builds are shown all at once, see mobile.css). */

const TOUCH_QUERY = '(hover: none) and (pointer: coarse)';
const NO_SWIPE =
  '.noir-rail, .noir-grid, .noir-dock, .ann-bar, .tabs-bar, button, a, input, textarea';
const K = 1.5; // page edge moves 1.5× the thumb → the fold moves 0.75×
const KY = 0.55; // vertical thumb movement → fold tilt
const MAX_TILT = 0.36; // rad (~20°)
const HOLD_MS = 1600; // keep the static page up while the live one plays its entrance

type Dir = 'next' | 'prev';
type Turn = { dir: Dir; to: number };
type Pt = { x: number; y: number };

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function PageTurn({ slides }: { slides: ReactElement[] }) {
  const [turn, setTurn] = useState<Turn | null>(null);
  const [box, setBox] = useState({ x: 0, y: 0, w: 0, h: 0 });

  const bookRef = useRef<HTMLDivElement>(null);
  const underSlot = useRef<HTMLDivElement>(null);
  const frontStatic = useRef<HTMLDivElement>(null);
  const frontSlot = useRef<HTMLDivElement>(null);
  const flapSlot = useRef<HTMLDivElement>(null);
  const clipOuter = useRef<HTMLDivElement>(null);
  const clipInner = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const castRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);

  // mutable gesture/animation state (no re-renders per frame)
  const g = useRef({
    phase: 'idle' as 'idle' | 'drag' | 'anim' | 'hold',
    dir: 'next' as Dir,
    to: 0,
    W: 0,
    H: 0,
    P0: { x: 0, y: 0 } as Pt,
    P: { x: 0, y: 0 } as Pt,
    ready: false, // static page mounted + first frame applied
    raf: 0,
    hold: 0,
  });

  /* ── geometry → styles ─────────────────────────────────────────── */
  const apply = () => {
    const s = g.current;
    const { W, H, P0, P } = s;
    const S = 3 * Math.max(W, H);
    let n = { x: 1, y: 0 };
    let M = { x: W + 2, y: P0.y }; // flat: fold just past the page edge
    const vx = P0.x - P.x;
    const vy = P0.y - P.y;
    const len = Math.hypot(vx, vy);
    if (len > 0.5) {
      M = { x: (P0.x + P.x) / 2, y: (P0.y + P.y) / 2 };
      // limit tilt, and never let the fold cut the spine (left edge)
      const maxA = Math.min(MAX_TILT, Math.atan(Math.max(0, M.x) / H));
      const a = clamp(Math.atan2(vy, vx), -maxA, maxA);
      n = { x: Math.cos(a), y: Math.sin(a) };
    }
    const phi = Math.atan2(n.y, n.x);
    const corners = [
      [0, 0],
      [W, 0],
      [0, H],
      [W, H],
    ];
    const uMax = Math.max(0, ...corners.map(([cx, cy]) => (cx - M.x) * n.x + (cy - M.y) * n.y));
    const t = clamp(1 - M.x / W, 0, 1); // 0 = flat, 1 = fully turned

    const frame = `translate(${M.x}px, ${M.y}px) rotate(${phi}rad)`;
    clipOuter.current!.style.transform = `${frame} translate(${-S}px, ${-S / 2}px)`;
    clipOuter.current!.style.width = clipOuter.current!.style.height = `${S}px`;
    clipInner.current!.style.transform = `translate(${S}px, ${S / 2}px) rotate(${-phi}rad) translate(${-M.x}px, ${-M.y}px)`;

    const md = 2 * (M.x * n.x + M.y * n.y);
    const a = 1 - 2 * n.x * n.x;
    const b = -2 * n.x * n.y;
    const d = 1 - 2 * n.y * n.y;
    flapRef.current!.style.transform = `matrix(${a}, ${b}, ${b}, ${d}, ${md * n.x}, ${md * n.y})`;

    const band = (el: HTMLDivElement, w: number) => {
      el.style.height = `${S}px`;
      el.style.transform = `${frame} translate(0px, ${-S / 2}px) scaleX(${Math.max(w, 0.01) / 100})`;
    };
    band(sheenRef.current!, uMax);
    band(castRef.current!, clamp(uMax * 0.45, 10, 90));
    castRef.current!.style.opacity = String(Math.min(1, t * 5) * Math.min(1, (1 - t) * 5));
  };

  const frameSoon = () => {
    const s = g.current;
    if (s.raf) return;
    s.raf = requestAnimationFrame(() => {
      s.raf = 0;
      if (s.ready) apply();
    });
  };

  /* ── setup / teardown ──────────────────────────────────────────── */
  const deckEl = () => document.querySelector<HTMLElement>('.deck');
  const liveSlide = () => {
    const deck = deckEl();
    const stage = deck
      ? Array.from(deck.children).find((c) => c.classList.contains('slide-stage'))
      : null;
    return (stage?.firstElementChild as HTMLElement | null) ?? null;
  };
  const cloneInto = (slot: HTMLElement | null, src: HTMLElement | null) => {
    if (!slot || !src) return;
    const c = src.cloneNode(true) as HTMLElement;
    slot.replaceChildren(c);
    c.scrollTop = src.scrollTop; // keep where the reader had scrolled to
  };
  const current = () => {
    const h = parseInt(window.location.hash.slice(1), 10);
    return Number.isNaN(h) ? 0 : clamp(h - 1, 0, slides.length - 1);
  };

  const begin = (dir: Dir, y0: number) => {
    const s = g.current;
    const to = current() + (dir === 'next' ? 1 : -1);
    if (to < 0 || to >= slides.length) return false;
    const r = deckEl()!.getBoundingClientRect();
    s.W = r.width;
    s.H = r.height;
    s.dir = dir;
    s.to = to;
    s.P0 = { x: s.W, y: clamp(y0 - r.top, s.H * 0.15, s.H * 0.85) };
    s.P = dir === 'next' ? { ...s.P0 } : { x: -s.W, y: s.P0.y };
    s.ready = false;
    s.phase = 'drag';
    // the current page is a clone of what's on screen right now
    const live = liveSlide();
    if (dir === 'next') {
      cloneInto(frontSlot.current, live);
      cloneInto(flapSlot.current, live);
    } else {
      cloneInto(underSlot.current, live);
    }
    setBox({ x: r.left, y: r.top, w: r.width, h: r.height });
    setTurn({ dir, to });
    return true;
  };

  const teardown = (fade = false) => {
    const s = g.current;
    cancelAnimationFrame(s.raf);
    s.raf = 0;
    window.clearTimeout(s.hold);
    const book = bookRef.current;
    const done = () => {
      underSlot.current?.replaceChildren();
      frontSlot.current?.replaceChildren();
      flapSlot.current?.replaceChildren();
      book?.classList.remove('on', 'fade');
      s.phase = 'idle';
      s.ready = false;
      setTurn(null);
    };
    if (fade && book) {
      book.classList.add('fade');
      s.hold = window.setTimeout(done, 170);
    } else done();
  };

  // static page is in the DOM → prev also needs its flap copy → show the book
  useLayoutEffect(() => {
    const s = g.current;
    if (!turn) return;
    if (turn.dir === 'prev') cloneInto(flapSlot.current, frontStatic.current?.firstElementChild as HTMLElement);
    s.ready = true;
    apply();
    bookRef.current?.classList.add('on');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turn]);

  /* ── animate to a target, then commit or cancel ────────────────── */
  const animateTo = (target: Pt, ms: number, ease: (t: number) => number, commit: boolean, arc = 0) => {
    const s = g.current;
    s.phase = 'anim';
    const from = { ...s.P };
    const t0 = performance.now();
    const step = (now: number) => {
      const k = clamp((now - t0) / ms, 0, 1);
      const e = ease(k);
      s.P = {
        x: from.x + (target.x - from.x) * e,
        y: from.y + (target.y - from.y) * e - arc * Math.sin(Math.PI * k),
      };
      if (s.ready) apply();
      if (k < 1) {
        s.raf = requestAnimationFrame(step);
        return;
      }
      s.raf = 0;
      if (!commit) return teardown();
      window.location.hash = '#' + (s.to + 1); // engine → go(to)
      s.phase = 'hold';
      s.hold = window.setTimeout(() => teardown(true), HOLD_MS);
    };
    s.raf = requestAnimationFrame(step);
  };

  const release = (vx: number) => {
    const s = g.current;
    const t = clamp(1 - (s.P0.x + s.P.x) / 2 / s.W, 0, 1);
    const done = s.dir === 'next' ? t : 1 - t; // how far toward completion
    const fling = s.dir === 'next' ? -vx : vx; // px/ms in the turning direction
    const commit = done > 0.28 || (fling > 0.35 && done > 0.03);
    const turned = { x: -s.W, y: s.P0.y };
    const target =
      s.dir === 'next' ? (commit ? turned : s.P0) : commit ? s.P0 : turned;
    const remaining = Math.abs(target.x - s.P.x) / (2 * s.W);
    animateTo(target, 170 + 360 * remaining, easeOut, commit);
  };

  // dock buttons on touch screens: an automatic turn along a gentle arc
  const autoTurn = (dir: Dir) => {
    const s = g.current;
    const y0 = window.innerHeight * 0.72;
    if (!begin(dir, y0)) return;
    const target = dir === 'next' ? { x: -s.W, y: s.P0.y } : { ...s.P0 };
    animateTo(target, 640, easeInOut, true, s.H * 0.1);
  };

  /* ── input ─────────────────────────────────────────────────────── */
  useEffect(() => {
    if (new URLSearchParams(window.location.search).has('presenter')) return;
    const touch = window.matchMedia(TOUCH_QUERY);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const s = g.current;
    let tracking = false;
    let locked = false;
    let x0 = 0;
    let y0 = 0;
    let dx = 0;
    let samples: { t: number; x: number }[] = [];

    const onStart = (e: TouchEvent) => {
      if (!touch.matches) return;
      if (s.phase === 'hold') teardown(); // reader is interacting: drop the cover now
      if (s.phase !== 'idle' || e.touches.length !== 1) return (tracking = false), undefined;
      const el = e.target as Element | null;
      if (document.querySelector('.ann-bar') || (el && el.closest(NO_SWIPE))) {
        tracking = false;
        return;
      }
      tracking = true;
      locked = false;
      x0 = e.touches[0].clientX;
      y0 = e.touches[0].clientY;
      dx = 0;
      samples = [{ t: performance.now(), x: x0 }];
    };

    const onMove = (e: TouchEvent) => {
      if (!tracking) return;
      const p = e.touches[0];
      dx = p.clientX - x0;
      const dy = p.clientY - y0;
      if (!locked) {
        if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
        if (Math.abs(dy) > Math.abs(dx)) {
          tracking = false; // vertical: let the slide scroll
          return;
        }
        locked = true;
        if (!reduce.matches && !begin(dx < 0 ? 'next' : 'prev', y0)) {
          tracking = false;
          return;
        }
      }
      e.preventDefault(); // horizontal drag belongs to the page, not the scroller
      samples.push({ t: performance.now(), x: p.clientX });
      if (samples.length > 6) samples.shift();
      if (reduce.matches) return;
      s.P =
        s.dir === 'next'
          ? { x: Math.min(s.W, s.W + K * dx), y: s.P0.y + KY * dy }
          : { x: Math.max(-s.W, -s.W + K * dx), y: s.P0.y + KY * dy };
      frameSoon();
    };

    const onEnd = () => {
      if (!tracking || !locked) return (tracking = false), undefined;
      tracking = false;
      const a = samples[0];
      const b = samples[samples.length - 1];
      const vx = b && a && b.t > a.t ? (b.x - a.x) / (b.t - a.t) : 0;
      if (reduce.matches) {
        // no animation: just change page on a clear swipe
        if (Math.abs(dx) > 50) {
          const to = current() + (dx < 0 ? 1 : -1);
          if (to >= 0 && to < slides.length) window.location.hash = '#' + (to + 1);
        }
        return;
      }
      cancelAnimationFrame(s.raf);
      s.raf = 0;
      if (s.ready) apply();
      release(vx);
    };

    const onCancel = () => {
      if (!tracking) return;
      tracking = false;
      if (locked && s.phase === 'drag') release(0);
    };

    // dock ‹ › buttons: turn with the animation instead of stepping builds
    const onClick = (e: MouseEvent) => {
      if (!touch.matches) return;
      const btn = (e.target as Element | null)?.closest(
        '.noir-dock button[aria-label="Next"], .noir-dock button[aria-label="Previous"]'
      );
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();
      if (s.phase === 'hold') teardown();
      if (s.phase !== 'idle') return;
      const dir: Dir = btn.getAttribute('aria-label') === 'Next' ? 'next' : 'prev';
      if (reduce.matches) {
        const to = current() + (dir === 'next' ? 1 : -1);
        if (to >= 0 && to < slides.length) window.location.hash = '#' + (to + 1);
      } else autoTurn(dir);
    };

    const onResize = () => {
      if (s.phase !== 'idle') teardown();
    };

    window.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onEnd, { passive: true });
    window.addEventListener('touchcancel', onCancel, { passive: true });
    document.addEventListener('click', onClick, true);
    window.addEventListener('resize', onResize);

    /* one-time hint on phones */
    let hint: HTMLDivElement | null = null;
    let seen = false;
    try {
      seen = sessionStorage.getItem('pt-hint') === '1';
      sessionStorage.setItem('pt-hint', '1');
    } catch {
      /* storage blocked — just show the hint */
    }
    if (touch.matches && !seen) {
      hint = document.createElement('div');
      hint.className = 'pt-hint';
      hint.textContent =
        document.documentElement.lang === 'de'
          ? '← Wischen zum Blättern →'
          : '← Geser untuk membalik halaman →';
      document.body.appendChild(hint);
      window.setTimeout(() => hint?.remove(), 3200);
    }

    return () => {
      window.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
      window.removeEventListener('touchcancel', onCancel);
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('resize', onResize);
      hint?.remove();
      cancelAnimationFrame(s.raf);
      window.clearTimeout(s.hold);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length]);

  const page = { width: box.w, height: box.h };
  return createPortal(
    <div
      ref={bookRef}
      className="pt-book"
      aria-hidden
      style={{ left: box.x, top: box.y, width: box.w, height: box.h }}
    >
      <div className="pt-page" style={page}>
        <div className="pt-fill">{turn?.dir === 'next' ? slides[turn.to] : null}</div>
        <div className="pt-fill" ref={underSlot} />
        <div className="pt-band pt-cast" ref={castRef} />
      </div>
      <div className="pt-clip" ref={clipOuter}>
        <div className="pt-clip-inner" ref={clipInner}>
          <div className="pt-page" style={page}>
            <div className="pt-fill" ref={frontStatic}>
              {turn?.dir === 'prev' ? slides[turn.to] : null}
            </div>
            <div className="pt-fill" ref={frontSlot} />
          </div>
          <div className="pt-page pt-flap" style={page} ref={flapRef}>
            <div className="pt-fill" ref={flapSlot} />
            <div className="pt-paper" />
            <div className="pt-band pt-sheen" ref={sheenRef} />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
