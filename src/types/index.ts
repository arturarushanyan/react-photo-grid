// Base interface for common photo properties
interface BasePhoto {
  id: number;
  height: number;
  width: number;
  url: string;
  photographer: string;
}

// Interface for grid items (used in the masonry grid)
export interface GridItem extends BasePhoto {
  src: string; // Single URL for grid view
}

// Interface for detailed photo view
export interface PhotoDetails extends BasePhoto {
  description: string | null;
  alt: string;
  photographer_url: string;
  avg_color: string;
  liked: boolean;
  taken_at?: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
  };
}

// Response from Pexels API
export interface Photo extends BasePhoto {
  photographer_url: string;
  avg_color: string;
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

export interface PhotoResponse {
  page: number;
  per_page: number;
  photos: Photo[];
  total_results: number;
  next_page: string;
}

export interface Column {
  items: GridItem[];
  height: number;
}
