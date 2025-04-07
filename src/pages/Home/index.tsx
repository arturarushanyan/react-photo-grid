import React from 'react';
import { VirtualizedMasonryGrid } from '../../components/VirtualizedMasonryGrid/VirtualizedMasonryGrid';
import { usePexelsPhotos } from '../../hooks/usePexelsPhotos';

const Home: React.FC = () => {
  const { photos, loading, error, loadMore } = usePexelsPhotos();

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
      }}
    >
      <VirtualizedMasonryGrid
        items={photos}
        columnCount={3}
        columnGap={16}
        rowGap={16}
        windowHeight={window.innerHeight}
        onLoadMore={loadMore}
        loading={loading}
      />
      {loading && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '10px 20px',
            background: 'rgba(0,0,0,0.7)',
            color: 'white',
            borderRadius: '20px',
          }}
        >
          Loading more photos...
        </div>
      )}
    </div>
  );
};

export default Home;
