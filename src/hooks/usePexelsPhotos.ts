import { useState, useEffect, useRef } from 'react';
import { fetchPhotos } from '../api/api';
import { Photo, GridItem } from '../types';

interface UsePexelsPhotosResult {
  photos: GridItem[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
}

export const usePexelsPhotos = (): UsePexelsPhotosResult => {
  const [photos, setPhotos] = useState<GridItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const loadingRef = useRef(false);

  // Load photos for a specific page
  const loadPhotosForPage = async (pageNum: number) => {
    if (loadingRef.current || !hasMore) {
      console.log('Skipping load - loading:', loadingRef.current, 'hasMore:', hasMore);
      return;
    }
    
    try {
      setLoading(true);
      loadingRef.current = true;
      console.log(`Loading page ${pageNum}`);
      
      const response = await fetchPhotos(pageNum);
      
      if (response.photos.length === 0) {
        console.log('No more photos available');
        setHasMore(false);
        return;
      }
      
      const newPhotos: GridItem[] = response.photos.map((photo: Photo) => ({
        id: photo.id,
        height: photo.height,
        width: photo.width,
        url: photo.url,
        photographer: photo.photographer,
        src: photo.src.medium,
      }));
      
      setPhotos((prev) => [...prev, ...newPhotos]);
    } catch (err) {
      setError('Failed to load photos');
      console.error(err);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  };

  // Load initial photos
  useEffect(() => {
    loadPhotosForPage(1);
  }, []);

  // Handle load more request
  const loadMore = () => {
    console.log('loadMore called, current page:', page);
    if (!loadingRef.current && hasMore) {
      const nextPage = page + 1;
      console.log('Incrementing to page:', nextPage);
      setPage(nextPage);
      loadPhotosForPage(nextPage);
    }
  };

  return {
    photos,
    loading,
    error,
    hasMore,
    loadMore,
  };
}; 