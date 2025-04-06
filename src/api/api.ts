import { PhotoResponse } from '../types';

const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
const BASE_URL = 'https://api.pexels.com/v1';

export const fetchPhotos = async (page: number = 1, perPage: number = 30): Promise<PhotoResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}/curated?page=${page}&per_page=${perPage}`,
      {
        headers: {
          Authorization: API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch photos');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
}; 