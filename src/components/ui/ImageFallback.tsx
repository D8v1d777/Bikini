import { PlaceholderComposition } from './PlaceholderComposition.tsx';

interface ImageFallbackProps {
  composition?: 'hero' | 'collection-hero' | 'product-hero' | 'editorial' | 'atelier' | 'detail';
  className?: string;
  alt?: string;
}

export function ImageFallback({ composition = 'hero', className = '', alt }: ImageFallbackProps) {
  return (
    <PlaceholderComposition
      composition={composition}
      className={className}
      alt={alt}
      aria-hidden="true"
    />
  );
}