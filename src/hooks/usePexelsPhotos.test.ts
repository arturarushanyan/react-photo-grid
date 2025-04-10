import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, Mock } from 'vitest';
import { usePexelsPhotos } from './usePexelsPhotos';
import { useApi } from './useApi';
import { config } from '../config';

vi.mock('./useApi');

const mockPhotosResponse = {
  page: 1,
  per_page: 30,
  photos: [
    {
      id: 1,
      width: 1200,
      height: 800,
      url: 'https://example.com/photo1',
      photographer: 'John Doe',
      src: {
        medium: 'medium1.jpg',
        original: 'original1.jpg',
        large2x: 'large2x1.jpg',
        large: 'large1.jpg',
        small: 'small1.jpg',
        portrait: 'portrait1.jpg',
        landscape: 'landscape1.jpg',
        tiny: 'tiny1.jpg',
      }
    },
    {
      id: 2,
      width: 800,
      height: 1200,
      url: 'https://example.com/photo2',
      photographer: 'Jane Smith',
      src: {
        medium: 'medium2.jpg',
        original: 'original2.jpg',
        large2x: 'large2x2.jpg',
        large: 'large2.jpg',
        small: 'small2.jpg',
        portrait: 'portrait2.jpg',
        landscape: 'landscape2.jpg',
        tiny: 'tiny2.jpg',
      }
    }
  ],
  total_results: 100
};

describe('usePexelsPhotos', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch initial photos on mount', async () => {
    const mockFetchData = vi.fn().mockResolvedValue(mockPhotosResponse);
    (useApi as Mock).mockReturnValue({
      fetchData: mockFetchData,
      loading: false,
      error: null
    });

    const { result } = renderHook(() => usePexelsPhotos());

    // Wait for the initial effect to run
    await act(async () => {
      await Promise.resolve();
    });

    expect(mockFetchData).toHaveBeenCalledWith(
      `${config.api.pexels.baseUrl}${config.api.pexels.endpoints.curated}?page=1&per_page=${config.grid.defaultPageSize}`,
      {
        headers: {
          Authorization: config.api.pexels.apiKey
        }
      }
    );
  });

  it('should transform photos data correctly', async () => {
    const mockFetchData = vi.fn().mockResolvedValue(mockPhotosResponse);
    (useApi as Mock).mockReturnValue({
      fetchData: mockFetchData,
      loading: false,
      error: null
    });

    const { result } = renderHook(() => usePexelsPhotos());

    // Wait for the effect and state updates
    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.photos).toHaveLength(2);
    expect(result.current.photos[0]).toEqual({
      id: 1,
      height: 800,
      width: 1200,
      url: 'https://example.com/photo1',
      photographer: 'John Doe',
      src: 'medium1.jpg'
    });
  });

  it('should handle load more correctly', async () => {
    const mockFetchData = vi.fn()
      .mockResolvedValueOnce(mockPhotosResponse)
      .mockResolvedValueOnce({
        ...mockPhotosResponse,
        page: 2
      });

    (useApi as Mock).mockReturnValue({
      fetchData: mockFetchData,
      loading: false,
      error: null
    });

    const { result } = renderHook(() => usePexelsPhotos());

    // Wait for initial load
    await act(async () => {
      await Promise.resolve();
    });

    // Trigger load more
    await act(async () => {
      result.current.loadMore();
      await Promise.resolve();
    });

    expect(mockFetchData).toHaveBeenCalledTimes(2);
    expect(mockFetchData).toHaveBeenLastCalledWith(
      expect.stringContaining('page=2'),
      expect.any(Object)
    );
  });

  it('should handle loading state', async () => {
    const mockFetchData = vi.fn().mockImplementation(() => new Promise(() => {})); // Never resolves
    (useApi as Mock).mockReturnValue({
      fetchData: mockFetchData,
      loading: true,
      error: null
    });

    const { result } = renderHook(() => usePexelsPhotos());
    expect(result.current.loading).toBe(true);
  });

  it('should handle error state', async () => {
    const mockError = 'Failed to fetch';
    const mockFetchData = vi.fn().mockRejectedValue(new Error(mockError));
    (useApi as Mock).mockReturnValue({
      fetchData: mockFetchData,
      loading: false,
      error: mockError
    });

    const { result } = renderHook(() => usePexelsPhotos());

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.error).toBe(mockError);
  });
}); 