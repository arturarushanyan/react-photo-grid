import React from "react";
import { usePexelsPhotos } from '../../hooks/usePexelsPhotos';
import { MasonryGrid } from "../../components/MasonryGrid/MasonryGrid";
import mockPhotos from '../../mockData/mock-photo-response.json';
import { GridItem } from "../../types";

const Home = () => {
  const { photos, loading, error, loadMore } = usePexelsPhotos();
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
    </div>
  );

  if (error) {
    return <div>Error: {error}</div>;
  }

    return (
      <div>
        <h1>Masonry grid</h1>
        <MasonryGrid
        items={photos}
        columnCount={3}
        columnGap={16}
        rowGap={16}
        renderItem={renderItem}
        onLoadMore={loadMore}
        loading={loading}
      />
      </div>
    );
  };
  
export default Home;