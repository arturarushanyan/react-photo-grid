import React, { useRef, useEffect } from 'react';

interface VirtualizedGridProps {
  onLoadMore?: () => void;
  loading?: boolean;
  children: React.ReactNode;
}

export const VirtualizedGrid: React.FC<VirtualizedGridProps> = ({
  onLoadMore,
  loading = false,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    if (!onLoadMore || loading) return;

    // Create a sentinel element at the bottom of the grid
    const sentinel = document.createElement('div');
    sentinel.style.height = '1px';
    sentinel.style.width = '100%';
    sentinel.style.position = 'absolute';
    sentinel.style.bottom = '0';
    
    if (containerRef.current) {
      containerRef.current.appendChild(sentinel);
    }

    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          console.log('Sentinel is visible, loading more...');
          onLoadMore();
        }
      },
      {
        root: null,
        rootMargin: '100px',
        threshold: 0.1,
      }
    );

    // Start observing the sentinel
    if (sentinel) {
      observerRef.current.observe(sentinel);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (sentinel && sentinel.parentNode) {
        sentinel.parentNode.removeChild(sentinel);
      }
    };
  }, [onLoadMore, loading]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        position: 'relative',
      }}
    >
      {children}
    </div>
  );
}; 