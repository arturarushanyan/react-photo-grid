import { useState, useEffect } from 'react';
import { useApi } from './useApi';
import { PhotoDetails } from '../types';
import { config } from '../config';

interface UsePhotoDetailsResult {
  photo: PhotoDetails | null;
  loading: boolean;
  error: string | null;
}

class PhotoDetailsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PhotoDetailsError';
  }
}

export const usePhotoDetails = (id: string | undefined): UsePhotoDetailsResult => {
  const [photo, setPhoto] = useState<PhotoDetails | null>(null);
  const { fetchData, loading, error } = useApi<PhotoDetails>();

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchPhotoDetails = async () => {
      try {
        const url = `${config.api.pexels.baseUrl}/photos/${id}`;
        const response = await fetchData(url, {
          headers: {
            Authorization: config.api.pexels.apiKey,
          },
        });

        if (!response) {
          throw new PhotoDetailsError('Failed to load photo details');
        }

        setPhoto(response);
      } catch (err) {
        // Error handling is managed by useApi
        console.error('Error fetching photo details:', err);
      }
    };

    fetchPhotoDetails();
  }, [id, fetchData]);

  return {
    photo,
    loading,
    error,
  };
}; 