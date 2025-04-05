import React, { useMemo, useRef, useState, useEffect } from 'react';
import { GridItem, Column } from '../../types';

interface MasonryGridProps {
  items: GridItem[];
  columnCount: number;
  columnGap: number;
  rowGap: number;
  renderItem: (item: GridItem) => React.ReactNode;
  onLoadMore?: () => void;
  loading?: boolean;
}

export const MasonryGrid: React.FC<MasonryGridProps> = ({
  items,
  columnCount,
  columnGap,
  rowGap,
  renderItem,
  onLoadMore,
  loading = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const columns = useMemo(() => {
    if (containerWidth === 0) return [];
    
    const columnWidth = (containerWidth - (columnCount - 1) * columnGap) / columnCount;
    const newColumns: Column[] = Array.from({ length: columnCount }, () => ({
      items: [],
      height: 0,
    }));

    items.forEach((item) => {
      const scaledHeight = (item.height / item.width) * columnWidth;
      const shortestColumn = newColumns.reduce((shortest, column) =>
        column.height < shortest.height ? column : shortest
      );

      shortestColumn.items.push({
        ...item,
        height: scaledHeight,
        width: columnWidth,
      });
      shortestColumn.height += scaledHeight + rowGap;
    });

    return newColumns;
  }, [items, columnCount, columnGap, rowGap, containerWidth]);

  useEffect(() => {
    if (!onLoadMore || loading) return;

    const sentinel = document.createElement('div');
    sentinel.style.height = '1px';
    sentinel.style.width = '100%';
    sentinel.style.position = 'absolute';
    sentinel.style.bottom = '0';
    
    if (containerRef.current) {
      containerRef.current.appendChild(sentinel);
    }

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
      <div
        style={{
          display: 'flex',
          gap: columnGap,
          padding: '20px',
        }}
      >
        {columns.map((column, columnIndex) => (
          <div
            key={columnIndex}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: rowGap,
            }}
          >
            {column.items.map((item) => (
              <div
                key={item.id}
                style={{
                  width: '100%',
                  height: item.height,
                }}
              >
                {renderItem(item)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}; 