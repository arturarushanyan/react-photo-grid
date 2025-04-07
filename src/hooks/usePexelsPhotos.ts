import { useState, useEffect, useRef } from 'react';
import { useApi } from './useApi';
import { GridItem } from '../types';

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

const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY; // Replace with your actual API key
const PEXELS_API_URL = 'https://api.pexels.com/v1';

export const usePexelsPhotos = (): UsePexelsPhotosResult => {
  const [photos, setPhotos] = useState<GridItem[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const loadingRef = useRef(false);
  
  const { fetchData, loading: apiLoading, error: apiError } = useApi<PexelsResponse>();

  // Load photos for a specific page
  const loadPhotosForPage = async (pageNum: number) => {
    if (loadingRef.current || !hasMore) {
      console.log('Skipping load - loading:', loadingRef.current, 'hasMore:', hasMore);
      return;
    }
    
    try {
      loadingRef.current = true;
      console.log(`Loading page ${pageNum}`);
      
      const url = `${PEXELS_API_URL}/curated?page=${pageNum}&per_page=30`;
      const response = await fetchData(url, {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      });
      
      if (response.photos.length === 0) {
        console.log('No more photos available');
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
    loading: apiLoading || loadingRef.current,
    error: apiError,
    hasMore,
    loadMore,
  };
}; 