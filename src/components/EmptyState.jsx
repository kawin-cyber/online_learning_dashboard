export default function EmptyState({ variant = 'search', title, message, action }) {
  const art = {
    search: (
      <svg width="140" height="100" viewBox="0 0 140 100" role="img" aria-label="Empty search illustration">
        <rect x="18" y="16" width="104" height="68" rx="12" fill="var(--primary-soft)" />
        <circle cx="62" cy="46" r="16" fill="none" stroke="var(--primary)" strokeWidth="4" />
        <line x1="74" y1="58" x2="86" y2="70" stroke="var(--primary)" strokeWidth="4" strokeLinecap="round" />
        <circle cx="108" cy="30" r="7" fill="var(--warning)" opacity=".8" />
        <circle cx="28" cy="76" r="5" fill="var(--success)" opacity=".8" />
      </svg>
    ),
    celebrate: (
      <svg width="140" height="100" viewBox="0 0 140 100" role="img" aria-label="Celebration illustration">
        <path d="M45 84 L62 40 L79 84 Z" fill="var(--primary-soft)" stroke="var(--primary)" strokeWidth="3" />
        <circle cx="62" cy="34" r="7" fill="var(--primary)" />
        <circle cx="95" cy="30" r="5" fill="var(--success)" />
        <circle cx="35" cy="34" r="4" fill="var(--warning)" />
        <circle cx="110" cy="62" r="6" fill="var(--info)" />
        <rect x="86" y="72" width="30" height="14" rx="7" fill="var(--primary-soft)" stroke="var(--primary)" strokeWidth="2" />
      </svg>
    ),
    inbox: (
      <svg width="140" height="100" viewBox="0 0 140 100" role="img" aria-label="Inbox illustration">
        <rect x="26" y="30" width="88" height="52" rx="10" fill="var(--primary-soft)" stroke="var(--primary)" strokeWidth="3" />
        <path d="M26 48 H58 L64 58 H76 L82 48 H114" fill="none" stroke="var(--primary)" strokeWidth="3" strokeLinejoin="round" />
        <circle cx="104" cy="28" r="8" fill="var(--success)" />
        <path d="M100 28 l3 3 l6 -7" stroke="#fff" strokeWidth="2" fill="none" />
      </svg>
    ),
  };
  return (
    <div className="empty card">
      {art[variant] || art.search}
      <h3>{title}</h3>
      <p>{message}</p>
      {action}
    </div>
  );
}
