import { useEffect, useState } from 'react';

/* Floating ID | DE switch (top-right). The two decks live at "/" and "/de" and
   mirror each other slide for slide, so switching keeps the current slide (#n).
   Fades out with the mouse idle like the dock, never renders in the presenter
   tab, and the L key toggles it too. */
export default function LangSwitch({ lang }: { lang: 'id' | 'de' }) {
  const [awake, setAwake] = useState(true);
  const isPresenter = new URLSearchParams(window.location.search).has('presenter');

  const go = (to: 'id' | 'de') => {
    if (to === lang) return;
    window.location.href = (to === 'de' ? '/de' : '/') + (window.location.hash || '#1');
  };

  useEffect(() => {
    if (isPresenter) return;
    let t = window.setTimeout(() => setAwake(false), 2500);
    const wake = () => {
      setAwake(true);
      window.clearTimeout(t);
      t = window.setTimeout(() => setAwake(false), 2500);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== 'l' || e.ctrlKey || e.metaKey || e.altKey) return;
      const el = e.target as HTMLElement | null;
      if (el && (el.isContentEditable || /^(INPUT|TEXTAREA)$/.test(el.tagName))) return;
      go(lang === 'de' ? 'id' : 'de');
    };
    window.addEventListener('mousemove', wake);
    window.addEventListener('touchstart', wake, { passive: true });
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('mousemove', wake);
      window.removeEventListener('touchstart', wake);
      window.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, isPresenter]);

  if (isPresenter) return null;

  const btn = (code: 'id' | 'de', label: string) => {
    const active = code === lang;
    return (
      <button
        type="button"
        onClick={() => go(code)}
        aria-pressed={active}
        title={code === 'de' ? 'Deutsche Version (L)' : 'Versi Indonesia (L)'}
        style={{
          border: 0,
          cursor: active ? 'default' : 'pointer',
          padding: '6px 12px',
          borderRadius: 999,
          font: '600 12px/1 var(--font-body)',
          letterSpacing: '0.08em',
          background: active ? 'var(--primary)' : 'transparent',
          color: active ? 'var(--accent-ink)' : 'var(--fg-muted)',
          transition: 'background var(--dur) var(--ease), color var(--dur) var(--ease)',
        }}
      >
        {label}
      </button>
    );
  };

  return (
    <div
      role="group"
      aria-label="Bahasa / Sprache"
      onMouseEnter={() => setAwake(true)}
      style={{
        position: 'fixed',
        top: 16,
        right: 16,
        zIndex: 95,
        display: 'flex',
        gap: 2,
        padding: 3,
        borderRadius: 999,
        background: 'color-mix(in srgb, var(--bg) 80%, transparent)',
        border: '1px solid var(--hair)',
        backdropFilter: 'blur(8px)',
        opacity: awake ? 1 : 0,
        pointerEvents: awake ? 'auto' : 'none',
        transition: 'opacity var(--dur) var(--ease)',
      }}
    >
      {btn('id', 'ID')}
      {btn('de', 'DE')}
    </div>
  );
}
