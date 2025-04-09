import React, { useRef, useEffect } from 'react';
import { Container, LoadingIndicator, LoadingText } from './VirtualizedGrid.styles';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';

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

  useEffect(() => {
    if (!onLoadMore || loading) return;

    const sentinel = document.createElement('div');
    Object.assign(sentinel.style, {
      height: '1px',
      width: '100%',
      position: 'absolute',
      bottom: '0',
    });
    
    if (containerRef.current) {
      containerRef.current.appendChild(sentinel);
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          onLoadMore();
        }
      },
      {
        root: null,
        rootMargin: '100px',
        threshold: 0.1,
      }
    );

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
    <Container ref={containerRef}>
      {children}
      {loading && (
        <LoadingIndicator>
          <LoadingSpinner size="small" />
          <LoadingText>Loading more photos...</LoadingText>
        </LoadingIndicator>
      )}
    </Container>
  );
}; 