import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from '../deck/useInView';
import { useDeck } from '../deck/DeckContext';

/* Horizontal bar chart for categories with long labels. Bars draw in on view;
   `hint` shows a secondary figure (e.g. percentage) after the value.
   Rows flagged `highlight` get the accent, the rest a muted fill. */
export default function HBarChart({
  data,
}: {
  data: { label: string; value: number; hint?: string; highlight?: boolean }[];
}) {
  const { isStatic } = useDeck();
  const reduce = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  const animate = !isStatic && !reduce;
  const max = Math.max(...data.map((d) => d.value)) || 1;

  return (
    <div
      ref={ref}
      className="hb"
      style={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, max-content) 1fr',
        columnGap: 14,
        rowGap: 'clamp(6px,1.1vh,11px)',
        alignItems: 'center',
        fontFeatureSettings: "'tnum' 1",
      }}
    >
      {data.map((d, i) => (
        <div key={d.label} style={{ display: 'contents' }}>
          <div
            style={{
              fontSize: 'clamp(13px,1.2vw,16px)',
              color: d.highlight ? 'var(--fg)' : 'var(--fg-muted)',
              fontWeight: d.highlight ? 600 : 400,
              textAlign: 'right',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {d.label}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
            <div
              style={{
                flex: '1 1 auto',
                height: 'clamp(14px,2vh,20px)',
                borderRadius: 999,
                background: 'var(--surface)',
                overflow: 'hidden',
              }}
            >
              <motion.div
                initial={animate ? { width: 0 } : false}
                animate={{ width: inView ? `${(d.value / max) * 100}%` : 0 }}
                transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  height: '100%',
                  borderRadius: 999,
                  background: d.highlight
                    ? 'var(--accent)'
                    : 'color-mix(in srgb, var(--fg) 22%, transparent)',
                }}
              />
            </div>
            <div
              className="hb-val"
              style={{
                flex: '0 0 auto',
                minWidth: '5.5em',
                fontSize: 'clamp(13px,1.2vw,16px)',
                color: 'var(--fg)',
              }}
            >
              <strong>{d.value}</strong>
              {d.hint && (
                <span className="hb-hint" style={{ color: 'var(--fg-faint)' }}>
                  {' '}
                  · {d.hint}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
