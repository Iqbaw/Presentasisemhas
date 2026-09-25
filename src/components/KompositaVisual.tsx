import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from '../deck/useInView';
import { useDeck } from '../deck/DeckContext';

/* Morphological breakdown of a German Nominalkompositum:
   Bestimmungswort + (Fugenelement) + Grundwort → Kompositum → Indonesian rendering.
   Pieces cascade in when the slide enters. Token-driven, no dependencies. */
export type KompositaPart = {
  word: string;
  gloss?: string;
  role: string;
  genus?: string;
  head?: boolean;
};

export default function KompositaVisual({
  parts,
  fuge,
  result,
  genus,
  target,
  targetNote,
  targetLabel = 'Bahasa Indonesia',
}: {
  parts: [KompositaPart, KompositaPart];
  fuge?: string;
  result: string;
  genus?: string;
  target: string;
  targetNote?: string;
  targetLabel?: string;
}) {
  const { isStatic } = useDeck();
  const reduce = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  const animate = !isStatic && !reduce;
  const step = (i: number) => ({
    initial: animate ? { opacity: 0, y: 14 } : false,
    animate: inView ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.5, delay: 0.15 + i * 0.18, ease: [0.16, 1, 0.3, 1] },
  });

  const chip = (p: KompositaPart) => (
    <div
      style={{
        flex: '1 1 0',
        minWidth: 0,
        padding: 'clamp(12px,1.6vw,20px)',
        borderRadius: 'var(--radius-sm)',
        background: p.head
          ? 'color-mix(in srgb, var(--primary) 12%, var(--surface))'
          : 'var(--surface)',
        border: `1px solid ${
          p.head ? 'color-mix(in srgb, var(--primary) 45%, transparent)' : 'var(--hair)'
        }`,
        textAlign: 'center',
      }}
    >
      <div className="kicker" style={{ fontSize: 11, marginBottom: 6 }}>
        {p.role}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-head)',
          fontSize: 'clamp(22px,2.6vw,34px)',
          fontWeight: 600,
          color: p.head ? 'var(--primary)' : 'var(--fg)',
          lineHeight: 1.1,
        }}
      >
        {p.genus && (
          <span style={{ fontSize: '0.55em', color: 'var(--fg-faint)', marginRight: 6 }}>
            {p.genus}
          </span>
        )}
        {p.word}
      </div>
      {p.gloss && (
        <div style={{ color: 'var(--fg-muted)', fontSize: 15, marginTop: 4 }}>
          ‘{p.gloss}’
        </div>
      )}
    </div>
  );

  const arrow = (
    <div
      aria-hidden
      style={{ textAlign: 'center', color: 'var(--fg-faint)', fontSize: 22, lineHeight: 1 }}
    >
      ↓
    </div>
  );

  return (
    <div
      ref={ref}
      className="kv"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 520,
        marginInline: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(10px,1.6vh,16px)',
      }}
    >
      <motion.div {...step(0)} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {chip(parts[0])}
        <div style={{ color: 'var(--fg-faint)', fontSize: 20, textAlign: 'center' }}>
          +
          {fuge && (
            <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)' }}>{fuge}</div>
          )}
        </div>
        {chip(parts[1])}
      </motion.div>
      <motion.div {...step(1)}>{arrow}</motion.div>
      <motion.div
        {...step(1)}
        style={{
          textAlign: 'center',
          fontFamily: 'var(--font-head)',
          fontSize: 'clamp(30px,3.8vw,52px)',
          fontWeight: 600,
          letterSpacing: '-0.02em',
        }}
      >
        {genus && (
          <span style={{ fontSize: '0.45em', color: 'var(--primary)', marginRight: 8 }}>
            {genus}
          </span>
        )}
        {result}
      </motion.div>
      <motion.div {...step(2)}>{arrow}</motion.div>
      <motion.div
        {...step(2)}
        style={{
          padding: 'clamp(14px,1.8vw,22px)',
          borderRadius: 'var(--radius)',
          background: 'var(--surface-2)',
          border: '1px solid var(--hair)',
          textAlign: 'center',
        }}
      >
        <div className="kicker" style={{ fontSize: 11, marginBottom: 6 }}>
          {targetLabel}
        </div>
        <div
          className="accent-text"
          style={{
            fontFamily: 'var(--font-head)',
            fontSize: 'clamp(24px,2.8vw,38px)',
            fontWeight: 600,
            display: 'inline-block',
          }}
        >
          {target}
        </div>
        {targetNote && (
          <div style={{ color: 'var(--fg-muted)', fontSize: 15, marginTop: 6 }}>
            {targetNote}
          </div>
        )}
      </motion.div>
    </div>
  );
}
