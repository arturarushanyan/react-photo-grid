import React from 'react';
import { VirtualizedMasonryGrid } from '../../components/VirtualizedMasonryGrid/VirtualizedMasonryGrid';
import { GridItem } from '../../types';
import { usePexelsPhotos } from '../../hooks/usePexelsPhotos';

const Home: React.FC = () => {
  const { photos, loading, error, loadMore } = usePexelsPhotos();

  // Render a photo item
  const renderItem = (item: GridItem) => (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '8px',
      }}
    >
      <img
        src={item.src}
        alt={`Photo by ${item.photographer}`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
        loading="lazy"
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '8px',
          background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
          color: 'white',
          fontSize: '14px',
        }}
      >
        Photo by {item.photographer}
      </div>
    </div>
  );

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
        renderItem={renderItem}
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
