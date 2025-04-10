import { render, screen, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, Mock } from 'vitest';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import Home from './index';
import { usePexelsPhotos } from '../../hooks/usePexelsPhotos';
import { theme } from '../../styles/theme';
import { config } from '../../config';

vi.mock('../../hooks/usePexelsPhotos');

const mockPhotos = [
  {
    id: 1,
    height: 800,
    width: 1200,
    url: 'https://example.com/photo1',
    photographer: 'John Doe',
    src: 'medium1.jpg'
  },
  {
    id: 2,
    height: 1200,
    width: 800,
    url: 'https://example.com/photo2',
    photographer: 'Jane Smith',
    src: 'medium2.jpg'
  }
];

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('Home', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render photos grid', async () => {
    (usePexelsPhotos as Mock).mockReturnValue({
      photos: mockPhotos,
      loading: false,
      error: null,
      hasMore: true,
      loadMore: vi.fn()
    });

    renderWithProviders(<Home />);

    await waitFor(() => {
      mockPhotos.forEach(photo => {
        expect(screen.getByAltText(`Photo by ${photo.photographer}`)).toBeInTheDocument();
      });
    });
  });

  it('should handle loading state', async () => {
    (usePexelsPhotos as Mock).mockReturnValue({
      photos: [],
      loading: true,
      error: null,
      hasMore: true,
      loadMore: vi.fn()
    });

    renderWithProviders(<Home />);

    await waitFor(() => {
      expect(screen.getAllByTestId('loading-skeleton')).toHaveLength(config.grid.defaultPageSize);
    });
  });

  it('should handle error state', async () => {
    const mockError = 'Failed to load photos';
    (usePexelsPhotos as Mock).mockReturnValue({
      photos: [],
      loading: false,
      error: mockError,
      hasMore: false,
      loadMore: vi.fn()
    });

    renderWithProviders(<Home />);

    await waitFor(() => {
      expect(screen.getByText(mockError)).toBeInTheDocument();
    });
  });

  it('should handle infinite scroll', async () => {
    const mockLoadMore = vi.fn();
    (usePexelsPhotos as Mock).mockReturnValue({
      photos: mockPhotos,
      loading: false,
      error: null,
      hasMore: true,
      loadMore: mockLoadMore
    });

    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null
    });
    window.IntersectionObserver = mockIntersectionObserver;

    renderWithProviders(<Home />);

    // Simulate intersection observer callback
    const [observerCallback] = mockIntersectionObserver.mock.calls[0];
    observerCallback([{ isIntersecting: true }]);

    await waitFor(() => {
      expect(mockLoadMore).toHaveBeenCalled();
    });
  });
}); 