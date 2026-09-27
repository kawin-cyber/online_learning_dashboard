export default function StatCard({ icon, value, label, accent, extra }) {
  return (
    <div className="card hoverable card-accent" style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
      <div style={{
        width: 48, height: 48, borderRadius: 12, display: 'grid', placeItems: 'center',
        fontSize: 22, background: `${accent}1a`, color: accent, flexShrink: 0,
      }}>{icon}</div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 24, fontWeight: 800 }}>{value}</div>
        <div className="muted" style={{ fontSize: 13 }}>{label}</div>
        {extra}
      </div>
    </div>
  );
}
