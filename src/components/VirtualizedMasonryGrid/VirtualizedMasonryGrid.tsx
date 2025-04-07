import React from 'react';
import { GridItem } from '../../types';
import { MasonryGrid } from '../MasonryGrid/MasonryGrid';
import { VirtualizedGrid } from '../VirtualizedGrid/VirtualizedGrid';

interface VirtualizedMasonryGridProps {
  items: GridItem[];
  columnCount: number;
  columnGap: number;
  rowGap: number;
  windowHeight: number;
  onLoadMore?: () => void;
  loading?: boolean;
}

export const VirtualizedMasonryGrid: React.FC<VirtualizedMasonryGridProps> = ({
  loading,
  items,
  columnCount,
  columnGap,
  rowGap,
  onLoadMore,
}) => {
  return (
    <VirtualizedGrid
      onLoadMore={onLoadMore}
      loading={loading}
    >
      <MasonryGrid
        items={items}
        columnCount={columnCount}
        columnGap={columnGap}
        rowGap={rowGap}
      />
    </VirtualizedGrid>
  );
}; 