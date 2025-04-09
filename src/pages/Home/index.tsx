import React from 'react';
import { VirtualizedMasonryGrid } from '../../components/VirtualizedMasonryGrid/VirtualizedMasonryGrid';
import { usePexelsPhotos } from '../../hooks/usePexelsPhotos';
import { MasonryGridErrorBoundary } from '../../components/MasonryGrid/MasonryGridErrorBoundary';
import { APIErrorBoundary } from '../../components/APIErrorBoundary/APIErrorBoundary';

const Home: React.FC = () => {
  const { photos, loading, error, loadMore } = usePexelsPhotos();

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <APIErrorBoundary>
      <MasonryGridErrorBoundary>
        <VirtualizedMasonryGrid
          items={photos}
          columnCount={3}
          columnGap={16}
          rowGap={16}
          windowHeight={window.innerHeight}
          onLoadMore={loadMore}
          loading={loading}
        />
      </MasonryGridErrorBoundary>
    </APIErrorBoundary>
  );
};

export default Home;
