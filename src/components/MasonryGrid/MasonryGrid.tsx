import React, { useMemo, useRef, useState, useEffect } from 'react';
import { GridItem, Column } from '../../types';

interface MasonryGridProps {
  items: GridItem[];
  columnCount: number;
  columnGap: number;
  rowGap: number;
  renderItem: (item: GridItem) => React.ReactNode;
}

export const MasonryGrid: React.FC<MasonryGridProps> = ({
  items,
  columnCount,
  columnGap,
  rowGap,
  renderItem,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Update container width on resize
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

  // Organize items into columns
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