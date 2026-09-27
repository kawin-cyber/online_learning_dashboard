export default function Page({ title, subtitle, actions, children }) {
  return (
    <div>
      {(title || actions) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
          <div>
            {title && <h1 className="page-title">{title}</h1>}
            {subtitle && <p className="page-sub">{subtitle}</p>}
          </div>
          {actions}
        </div>
      )}
      <div className="animate-in" style={{ display: 'grid', gap: 16 }}>{children}</div>
    </div>
  );
}
