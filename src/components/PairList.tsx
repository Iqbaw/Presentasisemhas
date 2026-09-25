/* A compact list of source → target translation pairs with a technique tag.
   Wraps into two columns on wide screens, one on phones. */
export type Pair = { src: string; tgt: string; tag: string; n?: number };

export default function PairList({ pairs }: { pairs: Pair[] }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
        gap: '8px 18px',
        textAlign: 'left',
      }}
    >
      {pairs.map((p) => (
        <div
          key={p.src + p.tgt}
          style={{
            display: 'flex',
            alignItems: 'baseline',
            flexWrap: 'wrap',
            gap: '2px 8px',
            padding: '10px 14px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--surface)',
            border: '1px solid var(--hair-2)',
            fontSize: 'clamp(14px,1.25vw,17px)',
          }}
        >
          <em style={{ fontStyle: 'italic', color: 'var(--fg)' }}>{p.src}</em>
          <span style={{ color: 'var(--fg-faint)' }}>→</span>
          <span style={{ color: 'var(--fg)' }}>{p.tgt}</span>
          {p.n && p.n > 1 && (
            <span style={{ color: 'var(--fg-faint)', fontSize: '0.85em' }}>×{p.n}</span>
          )}
          <span
            style={{
              marginLeft: 'auto',
              fontSize: 11,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--primary)',
            }}
          >
            {p.tag}
          </span>
        </div>
      ))}
    </div>
  );
}
