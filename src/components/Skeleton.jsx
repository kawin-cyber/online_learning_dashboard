export function Skeleton({ w = '100%', h = 16, style }) {
  return <div className="skeleton" style={{ width: w, height: h, ...style }} aria-hidden="true" />;
}

export function CardSkeleton() {
  return (
    <div className="card" style={{ display: 'grid', gap: 10 }}>
      <Skeleton h={44} w="44px" style={{ borderRadius: 12 }} />
      <Skeleton w="70%" h={16} />
      <Skeleton w="100%" h={8} />
      <Skeleton w="45%" h={14} />
      <Skeleton w="100%" h={38} style={{ borderRadius: 10 }} />
    </div>
  );
}
