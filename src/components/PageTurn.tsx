import { useEffect } from 'react';

/* Mobile layer that sits BESIDE the engine (src/deck stays untouched):
   1. Swipe left / right → the same ArrowRight / ArrowLeft the keyboard sends,
      so builds, hash and presenter sync all keep working.
   2. Book page-turn: a MutationObserver sees the engine swap `.slide-stage`
      (before paint) and turns the outgoing page away on its left spine
      (next) or lays the incoming page back over it (prev). Only transform +
      opacity are animated → GPU-composited, cheap on phones.
   Phones / touch only; honours prefers-reduced-motion. */

const TOUCH_QUERY = '(max-width: 820px), (hover: none) and (pointer: coarse)';
const TURN_MS = 640;
const NO_SWIPE =
  '.noir-rail, .noir-grid, .noir-dock, .ann-bar, .dtable, .tabs-bar, input, textarea';

export default function PageTurn() {
  useEffect(() => {
    if (new URLSearchParams(window.location.search).has('presenter')) return;
    const deck = document.querySelector('.deck');
    if (!deck) return;

    const touch = window.matchMedia(TOUCH_QUERY);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const root = document.documentElement;

    const counter = () =>
      parseInt(document.querySelector('.noir-counter-now')?.textContent ?? '', 10);
    let last = counter();
    let intent: 'next' | 'prev' = 'next';
    let finish: (() => void) | null = null;

    /* ── page turn ─────────────────────────────────────────────── */
    const turn = (incoming: HTMLElement, outgoing: HTMLElement, dir: 'next' | 'prev') => {
      finish?.();
      outgoing.dataset.pt = '1';
      outgoing.setAttribute('aria-hidden', 'true');
      outgoing.style.pointerEvents = 'none';
      // next: old page lies ON TOP and turns away; prev: old page lies UNDER
      // and the new one is laid back over it.
      deck.insertBefore(outgoing, dir === 'next' ? incoming.nextSibling : incoming);
      const leaf = dir === 'next' ? outgoing : incoming;
      const under = dir === 'next' ? incoming : outgoing;
      leaf.classList.add('pt-leaf', dir === 'next' ? 'pt-out' : 'pt-in');
      under.classList.add('pt-under');
      root.classList.add('pt-turning');

      const timer = window.setTimeout(() => finish?.(), TURN_MS + 80);
      finish = () => {
        window.clearTimeout(timer);
        outgoing.remove();
        incoming.classList.remove('pt-leaf', 'pt-in', 'pt-out', 'pt-under');
        root.classList.remove('pt-turning');
        finish = null;
      };
    };

    const mo = new MutationObserver((records) => {
      const isStage = (n: Node): n is HTMLElement =>
        n instanceof HTMLElement && n.classList.contains('slide-stage') && !n.dataset.pt;
      const added = records.flatMap((r) => Array.from(r.addedNodes)).find(isStage);
      const removed = records.flatMap((r) => Array.from(r.removedNodes)).find(isStage);
      if (!added || !removed) return;
      const now = counter();
      const dir = Number.isNaN(now) || Number.isNaN(last) || now === last ? intent : now > last ? 'next' : 'prev';
      last = now;
      if (!touch.matches || reduce.matches) return;
      turn(added, removed, dir);
    });
    mo.observe(deck, { childList: true });

    /* ── intent (for when the counter is hidden with H) ─────────── */
    const onKey = (e: KeyboardEvent) => {
      if (['ArrowRight', 'ArrowDown', ' ', 'PageDown', 'End'].includes(e.key)) intent = 'next';
      if (['ArrowLeft', 'ArrowUp', 'PageUp', 'Home'].includes(e.key)) intent = 'prev';
    };
    window.addEventListener('keydown', onKey, true);

    /* ── swipe ─────────────────────────────────────────────────── */
    let sx = 0;
    let sy = 0;
    let st = 0;
    let tracking = false;
    const onStart = (e: TouchEvent) => {
      const t = e.target as Element | null;
      tracking =
        e.touches.length === 1 &&
        !document.querySelector('.ann-bar') && // annotate mode: touches draw
        !(t && t.closest(NO_SWIPE));
      if (!tracking) return;
      sx = e.touches[0].clientX;
      sy = e.touches[0].clientY;
      st = performance.now();
    };
    const onEnd = (e: TouchEvent) => {
      if (!tracking) return;
      tracking = false;
      const p = e.changedTouches[0];
      const dx = p.clientX - sx;
      const dy = p.clientY - sy;
      if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.4 || performance.now() - st > 900)
        return;
      const key = dx < 0 ? 'ArrowRight' : 'ArrowLeft';
      window.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
    };
    window.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchend', onEnd, { passive: true });

    /* ── one-time hint on phones ───────────────────────────────── */
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
        root.lang === 'de' ? '← Wischen zum Blättern →' : '← Geser untuk membalik halaman →';
      document.body.appendChild(hint);
      window.setTimeout(() => hint?.remove(), 3200);
    }

    return () => {
      mo.disconnect();
      finish?.();
      hint?.remove();
      window.removeEventListener('keydown', onKey, true);
      window.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchend', onEnd);
    };
  }, []);

  return null;
}
