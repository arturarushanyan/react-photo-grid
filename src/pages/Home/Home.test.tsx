import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, Mock } from 'vitest';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import Home from './index';
import { usePexelsPhotos } from '../../hooks/usePexelsPhotos';
import { theme } from '../../styles/theme';

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

  it('should render photos grid', () => {
    (usePexelsPhotos as Mock).mockReturnValue({
      photos: mockPhotos,
      loading: false,
      error: null,
      hasMore: true,
      loadMore: vi.fn()
    });

    renderWithProviders(<Home />);

    mockPhotos.forEach(photo => {
      expect(screen.getByAltText(`Photo by ${photo.photographer}`)).toBeInTheDocument();
    });
  });

  it('should handle loading state', () => {
    (usePexelsPhotos as Mock).mockReturnValue({
      photos: [],
      loading: true,
      error: null,
      hasMore: true,
      loadMore: vi.fn()
    });

    renderWithProviders(<Home />);

    // Check for loading indicators or skeletons
    // This will depend on your actual implementation
    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });

  it('should handle error state', () => {
    const mockError = 'Failed to load photos';
    (usePexelsPhotos as Mock).mockReturnValue({
      photos: [],
      loading: false,
      error: mockError,
      hasMore: false,
      loadMore: vi.fn()
    });

    renderWithProviders(<Home />);

    expect(screen.getByText(mockError)).toBeInTheDocument();
  });

  it('should handle infinite scroll', () => {
    const mockLoadMore = vi.fn();
    (usePexelsPhotos as Mock).mockReturnValue({
      photos: mockPhotos,
      loading: false,
      error: null,
      hasMore: true,
      loadMore: mockLoadMore
    });

    renderWithProviders(<Home />);

    // You might need to mock IntersectionObserver and trigger it
    // This will depend on your implementation of infinite scroll
  });
}); 