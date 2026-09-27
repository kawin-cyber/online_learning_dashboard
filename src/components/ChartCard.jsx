export default function ChartCard({ title, sub, children }) {
  return (
    <div className="vx-card" style={{ padding: 20 }}>
      <h3 style={{ fontWeight: 800, fontSize: 16, color: '#0c2621' }}>{title}</h3>
      {sub && <div style={{ fontSize: 12, color: 'var(--text-muted)', margin: '4px 0 14px' }}>{sub}</div>}
      {children}
    </div>
  );
}

export function BarRow({ label, value, color = '#054e46' }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 600, marginBottom: 5, color: '#0c2621' }}>
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="vx-progress-track">
        <div className="vx-progress-fill" style={{ width: `${value}%`, background: color }} />
      </div>
    </div>
  );
}

export function SimpleBars({ data, color = '#0d9488' }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 160, paddingTop: 12 }}>
      {data.map((d) => (
        <div key={d.label} style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#0c2621' }}>
            {d.value}
            {d.suffix || ''}
          </div>
          <div
            style={{
              height: `${Math.max(8, (d.value / max) * 110)}px`,
              background: color,
              borderRadius: '6px 6px 3px 3px',
              margin: '6px 0',
              transition: 'height 0.4s ease',
            }}
          />
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{d.label}</div>
        </div>
      ))}
    </div>
  );
}
