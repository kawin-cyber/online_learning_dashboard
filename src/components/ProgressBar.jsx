export default function ProgressBar({ value, color }) {
  return (
    <div className="progress" role="progressbar" aria-valuenow={value} aria-valuemin="0" aria-valuemax="100">
      <div style={{ width: `${Math.min(100, Math.max(0, value))}%`, background: color }} />
    </div>
  );
}
