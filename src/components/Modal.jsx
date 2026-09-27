export default function Modal({ title, children, onClose }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.45)',
        backdropFilter: 'blur(3px)',
        display: 'grid',
        placeItems: 'center',
        padding: 16,
        zIndex: 99,
      }}
      onClick={onClose}
      role="presentation"
    >
      <div
        className="vx-card"
        style={{
          maxWidth: 540,
          width: '100%',
          maxHeight: '85vh',
          overflow: 'auto',
          padding: 24,
          boxShadow: '0 12px 32px rgba(0,0,0,0.18)',
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#0c2621' }}>{title}</h2>
          <button
            className="vx-btn vx-btn-white"
            onClick={onClose}
            aria-label="Close dialog"
            style={{ padding: '4px 10px', border: '1px solid var(--border-color)', fontSize: 14 }}
          >
            ✕
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
