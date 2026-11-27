import { useState, useEffect } from 'react';
import { ImageFallback } from './ImageFallback.tsx';
import { PlaceholderComposition } from './PlaceholderComposition.tsx';

interface CampaignImageProps {
  src: string;
  alt: string;
  className?: string;
  composition?: 'hero' | 'collection-hero' | 'product-hero' | 'editorial' | 'atelier' | 'detail';
  priority?: boolean;
  sizes?: string;
  loading?: 'eager' | 'lazy';
  onLoad?: () => void;
  onError?: () => void;
}

export function CampaignImage({
  src,
  alt,
  className = '',
  composition = 'hero',
  priority = false,
  sizes,
  loading,
  onLoad,
  onError
}: CampaignImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (priority) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsLoading(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '100px', threshold: 0.01 }
    );

    const img = document.querySelector(`img[data-src="${src}"]`) as HTMLImageElement;
    if (img) observer.observe(img);

    return () => observer.disconnect();
  }, [src, priority]);

  const handleLoad = () => {
    setIsLoading(false);
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  if (hasError) {
    return (
      <ImageFallback composition={composition} className={className} alt={alt} />
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden={!!alt === false}>
      {isLoading && (
        <div
          className="absolute inset-0 image-loading"
          aria-hidden="true"
        />
      )}
      <img
        data-src={src}
        src={priority || isLoaded ? src : undefined}
        alt={alt}
        className={`
          w-full h-full object-cover transition-opacity duration-300
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
        `}
        onLoad={handleLoad}
        onError={handleError}
        loading={loading ?? (priority ? 'eager' : 'lazy')}
        sizes={sizes}
        aria-hidden={!alt}
      />
      {isLoading && (
        <ImageFallback
          composition={composition}
          className="absolute inset-0 opacity-50 pointer-events-none"
          alt={alt}
        />
      )}
    </div>
  );
}

interface StaticCampaignImageProps {
  src: string;
  alt: string;
  className?: string;
  composition?: 'hero' | 'collection-hero' | 'product-hero' | 'editorial' | 'atelier' | 'detail';
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Simplified static image component for non-lazy-loaded critical images
 * (e.g., hero images above the fold)
 */
export function StaticCampaignImage({
  src,
  alt,
  className = '',
  composition = 'hero',
  onLoad,
  onError
}: StaticCampaignImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <PlaceholderComposition
        composition={composition}
        className={className}
        alt={alt}
        aria-hidden="true"
      />
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden={!!alt === false}>
      <div className="absolute inset-0 image-loading" aria-hidden="true" />
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-opacity duration-300"
        onLoad={() => onLoad?.()}
        onError={() => { setHasError(true); onError?.(); }}
        loading="eager"
        aria-hidden={!alt}
      />
    </div>
  );
}