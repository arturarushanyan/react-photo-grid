import { useState, useEffect, useRef } from 'react';
import { useApi } from './useApi';
import { GridItem } from '../types';
import { config } from '../config';

interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
}

interface PexelsResponse {
  page: number;
  per_page: number;
  photos: PexelsPhoto[];
  total_results: number;
  next_page?: string;
}

interface UsePexelsPhotosResult {
  photos: GridItem[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
}

export const usePexelsPhotos = (): UsePexelsPhotosResult => {
  const [photos, setPhotos] = useState<GridItem[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const loadingRef = useRef(false);
  
  const { fetchData, loading: apiLoading, error: apiError } = useApi<PexelsResponse>();

  const loadPhotosForPage = async (pageNum: number) => {
    if (loadingRef.current || !hasMore) {
      return;
    }
    
    try {
      loadingRef.current = true;
      
      const url = `${config.api.pexels.baseUrl}${config.api.pexels.endpoints.curated}?page=${pageNum}&per_page=${config.grid.defaultPageSize}`;
      const response = await fetchData(url, {
        headers: {
          Authorization: config.api.pexels.apiKey,
        },
      });
      
      if (response.photos.length === 0) {
        setHasMore(false);
        return;
      }
      
      const newPhotos: GridItem[] = response.photos.map((photo: PexelsPhoto) => ({
        id: photo.id,
        height: photo.height,
        width: photo.width,
        url: photo.url,
        photographer: photo.photographer,
        src: photo.src.medium,
      }));
      
      setPhotos((prev) => [...prev, ...newPhotos]);
    } catch (err) {
      console.error('Error loading photos:', err);
    } finally {
      loadingRef.current = false;
    }
  };

  useEffect(() => {
    loadPhotosForPage(1);
  }, []);

  const loadMore = () => {
    if (!loadingRef.current && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadPhotosForPage(nextPage);
    }
  };

  return {
    photos,
    loading: apiLoading || loadingRef.current,
    error: apiError,
    hasMore,
    loadMore,
  };
}; 