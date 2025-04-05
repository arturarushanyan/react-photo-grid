import React from "react";
import { MasonryGrid } from "../../components/MasonryGrid/MasonryGrid";
import mockPhotos from '../../mockData/mock-photo-response.json';
import { GridItem } from "../../types";

const Home = () => { 
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
    return (
      <div>
        <h1>Masonry grid</h1>
        <MasonryGrid
        items={mockPhotos.photos as any}
        columnCount={3}
        columnGap={16}
        rowGap={16}
        renderItem={renderItem}
        onLoadMore={() => {}}
        loading={false}
      />
      </div>
    );
  };
  
export default Home;