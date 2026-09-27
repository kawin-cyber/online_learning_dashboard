import { useState } from 'react';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80';

export default function SafeImage({ src, alt, className, style, fallback = FALLBACK_IMAGE, ...props }) {
  const [imgSrc, setImgSrc] = useState(src || fallback);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallback);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt || 'Image'}
      className={className}
      style={style}
      onError={handleError}
      {...props}
    />
  );
}
