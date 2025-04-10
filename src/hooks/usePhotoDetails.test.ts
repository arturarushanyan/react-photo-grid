import { renderHook, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { usePhotoDetails } from './usePhotoDetails';
import { useApi } from './useApi';

// Mock useApi hook
vi.mock('./useApi');

const mockPhotoData = {
  id: 1,
  width: 1200,
  height: 800,
  url: 'https://example.com/photo',
  photographer: 'Jane Smith',
  photographer_url: 'https://example.com/photographer',
  description: 'A beautiful landscape',
  alt: 'Landscape photo',
  avg_color: '#FF0000',
  liked: false,
  src: {
    original: 'original.jpg',
    large2x: 'large2x.jpg',
    large: 'large.jpg',
    medium: 'medium.jpg',
    small: 'small.jpg',
  },
};

describe('usePhotoDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns loading state initially', () => {
    (useApi as vi.Mock).mockReturnValue({
      fetchData: vi.fn(),
      loading: true,
      error: null,
    });

    const { result } = renderHook(() => usePhotoDetails('1'));

    expect(result.current.loading).toBe(true);
    expect(result.current.photo).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('returns photo data when fetch is successful', async () => {
    const mockFetchData = vi.fn().mockResolvedValue(mockPhotoData);
    (useApi as vi.Mock).mockReturnValue({
      fetchData: mockFetchData,
      loading: false,
      error: null,
    });

    const { result } = renderHook(() => usePhotoDetails('1'));

    await waitFor(() => {
      expect(result.current.photo).toEqual(mockPhotoData);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  it('handles error state', async () => {
    const mockError = 'Failed to fetch';
    (useApi as vi.Mock).mockReturnValue({
      fetchData: vi.fn(),
      loading: false,
      error: mockError,
    });

    const { result } = renderHook(() => usePhotoDetails('1'));

    expect(result.current.error).toBe(mockError);
    expect(result.current.photo).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('does not fetch when id is undefined', () => {
    const mockFetchData = vi.fn();
    (useApi as vi.Mock).mockReturnValue({
      fetchData: mockFetchData,
      loading: false,
      error: null,
    });

    renderHook(() => usePhotoDetails(undefined));

    expect(mockFetchData).not.toHaveBeenCalled();
  });
}); 