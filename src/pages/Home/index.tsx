import React from 'react';
import { VirtualizedGrid } from '../../components/VirtualizedGrid/VirtualizedGrid';
import { MasonryGrid } from '../../components/MasonryGrid/MasonryGrid';
import { ErrorBoundary } from '../../components/ErrorBoundary/ErrorBoundary';
import { usePexelsPhotos } from '../../hooks/usePexelsPhotos';
import { useResponsiveColumns } from '../../hooks/useResponsiveColumns';
import { HomeContainer } from './Home.styles';
import { PageIntro } from './components/PageIntro';

const Home: React.FC = () => {
  const { photos, loading, loadMore } = usePexelsPhotos();
  const columnCount = useResponsiveColumns();

  return (
    <HomeContainer>
      <PageIntro />
      <ErrorBoundary variant="api">
        <VirtualizedGrid
          onLoadMore={loadMore}
          loading={loading}
        >
          <MasonryGrid
            items={photos}
            columnCount={columnCount}
            columnGap={16}
            rowGap={16}
          />
        </VirtualizedGrid>
      </ErrorBoundary>
    </HomeContainer>
  );
};

export default Home;
