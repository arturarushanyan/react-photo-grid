import React, { useMemo, useRef, useState, useEffect } from 'react';
import { GridItem, Column as ColumnType } from '../../types';
import MasonryItem from '../MasonryItem/MasonryItem';
import { MasonryItemSkeleton } from '../MasonryItem/MasonryItemSkeleton';
import { Container, GridContainer, Column } from './MasonryGrid.styles';

interface MasonryGridProps {
  items: GridItem[];
  columnCount: number;
  columnGap: number;
  rowGap: number;
  loading?: boolean;
}

const SKELETON_HEIGHTS = [200, 300, 250, 350, 280, 320]; // Various heights for more natural looking skeletons

export const MasonryGrid: React.FC<MasonryGridProps> = ({
  items,
  columnCount,
  columnGap,
  rowGap,
  loading = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

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
    const newColumns: ColumnType[] = Array.from({ length: columnCount }, () => ({
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

  const renderSkeletons = () => {
    return Array.from({ length: columnCount }).map((_, columnIndex) => (
      <Column key={`skeleton-${columnIndex}`} $rowGap={rowGap}>
        {Array.from({ length: 4 }).map((_, itemIndex) => (
          <MasonryItemSkeleton
            key={`skeleton-${columnIndex}-${itemIndex}`}
            height={SKELETON_HEIGHTS[itemIndex % SKELETON_HEIGHTS.length]}
          />
        ))}
      </Column>
    ));
  };

  return (
    <Container ref={containerRef}>
      <GridContainer $columnGap={columnGap}>
        {loading && items.length === 0 ? (
          renderSkeletons()
        ) : (
          columns.map((column, columnIndex) => (
            <Column key={columnIndex} $rowGap={rowGap}>
              {column.items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    width: '100%',
                    height: item.height,
                  }}
                >
                  <MasonryItem 
                    id={item.id}
                    src={item.src} 
                    photographer={item.photographer}
                  />
                </div>
              ))}
            </Column>
          ))
        )}
      </GridContainer>
    </Container>
  );
}; 