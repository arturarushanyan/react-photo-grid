import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useApi } from './useApi';

describe('useApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should handle successful fetch', async () => {
    const mockData = { success: true };
    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData)
    } as Response);

    const { result } = renderHook(() => useApi<typeof mockData>());
    
    // Check initial state
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    
    // Wrap in act to handle state updates
    let response;
    await act(async () => {
      response = await result.current.fetchData('https://api.example.com');
    });

    expect(response).toEqual(mockData);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle fetch error', async () => {
    const mockError = new Error('Network error');
    vi.mocked(global.fetch).mockRejectedValue(mockError);

    const { result } = renderHook(() => useApi());

    await act(async () => {
      try {
        await result.current.fetchData('https://api.example.com');
      } catch (error) {
        // Expected to throw
      }
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Network error');
  });

  it('should handle non-ok response', async () => {
    vi.mocked(global.fetch).mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found'
    } as Response);

    const { result } = renderHook(() => useApi());

    await act(async () => {
      try {
        await result.current.fetchData('https://api.example.com');
      } catch (error) {
        // Expected to throw
      }
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Request failed with status: 404 Not Found');
  });

  it('should set loading state during fetch', async () => {
    let resolvePromise: (value: Response) => void;
    const fetchPromise = new Promise<Response>(resolve => {
      resolvePromise = resolve;
    });

    vi.mocked(global.fetch).mockImplementation(() => fetchPromise);

    const { result } = renderHook(() => useApi());

    const dataPromise = act(async () => {
      const promise = result.current.fetchData('https://api.example.com');
      // Check loading state is true during the fetch
      expect(result.current.loading).toBe(true);
      
      resolvePromise!({
        ok: true,
        json: () => Promise.resolve({ success: true })
      } as Response);

      await promise;
    });

    await dataPromise;
    expect(result.current.loading).toBe(false);
  });
}); 