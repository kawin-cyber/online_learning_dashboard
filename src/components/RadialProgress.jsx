export default function RadialProgress({ value, size = 96, stroke = 9, color, label, sub }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.min(100, Math.max(0, value)) / 100) * c;
  return (
    <div className="radial" style={{ width: size, height: size }}>
      <svg width={size} height={size} aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(100,116,139,.18)" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={color || 'var(--primary)'} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset .9s cubic-bezier(.22,1,.36,1)' }}
        />
      </svg>
      <div className="radial-label">
        <div style={{ fontWeight: 800, fontSize: size / 5 }}>{label ?? `${value}%`}</div>
        {sub && <div className="muted" style={{ fontSize: 11 }}>{sub}</div>}
      </div>
    </div>
  );
}
