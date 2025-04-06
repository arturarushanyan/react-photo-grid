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
  renderItem: (item: GridItem) => React.ReactNode;
  onLoadMore?: () => void;
  loading?: boolean;
}

export const VirtualizedMasonryGrid: React.FC<VirtualizedMasonryGridProps> = (props) => {
  return (
    <VirtualizedGrid
      onLoadMore={props.onLoadMore}
      loading={props.loading}
    >
      <MasonryGrid
        items={props.items}
        columnCount={props.columnCount}
        columnGap={props.columnGap}
        rowGap={props.rowGap}
        renderItem={props.renderItem}
      />
    </VirtualizedGrid>
  );
}; 