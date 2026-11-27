import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export function useCollectionTheme(): string | null {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    let collectionClass = '';

    if (path.includes('/collections/monolith') || path.includes('/product/monolith-')) {
      collectionClass = 'collection-monolith';
    } else if (path.includes('/collections/lumen') || path.includes('/product/lumen-')) {
      collectionClass = 'collection-lumen';
    } else if (path.includes('/collections/strata') || path.includes('/product/strata-')) {
      collectionClass = 'collection-strata';
    }

    // Remove all collection classes
    document.documentElement.classList.remove('collection-monolith', 'collection-lumen', 'collection-strata');
    // Add current collection class
    if (collectionClass) {
      document.documentElement.classList.add(collectionClass);
    }

    return () => {
      document.documentElement.classList.remove('collection-monolith', 'collection-lumen', 'collection-strata');
    };
  }, [location.pathname]);

  // Return current collection for conditional rendering
  if (location.pathname.includes('/collections/monolith') || location.pathname.includes('/product/monolith-')) {
    return 'monolith';
  }
  if (location.pathname.includes('/collections/lumen') || location.pathname.includes('/product/lumen-')) {
    return 'lumen';
  }
  if (location.pathname.includes('/collections/strata') || location.pathname.includes('/product/strata-')) {
    return 'strata';
  }
  return null;
}