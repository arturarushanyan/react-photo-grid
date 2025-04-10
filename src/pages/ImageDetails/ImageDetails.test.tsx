import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ImageDetails } from './index';
import { theme } from '../../styles/theme';
import { usePhotoDetails } from '../../hooks/usePhotoDetails';

// Mock the hook
vi.mock('../../hooks/usePhotoDetails');

const mockPhotoDetails = {
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

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <MemoryRouter initialEntries={['/photo/1']}>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/photo/:id" element={component} />
        </Routes>
      </ThemeProvider>
    </MemoryRouter>
  );
};

describe('ImageDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state', () => {
    (usePhotoDetails as vi.Mock).mockReturnValue({
      photo: null,
      loading: true,
      error: null,
    });

    renderWithProviders(<ImageDetails />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    (usePhotoDetails as vi.Mock).mockReturnValue({
      photo: null,
      loading: false,
      error: 'Failed to load',
    });

    renderWithProviders(<ImageDetails />);
    expect(screen.getByText('Failed to load photo details.')).toBeInTheDocument();
  });

  it('renders photo details', () => {
    (usePhotoDetails as vi.Mock).mockReturnValue({
      photo: mockPhotoDetails,
      loading: false,
      error: null,
    });

    renderWithProviders(<ImageDetails />);

    expect(screen.getByText(`Photo by ${mockPhotoDetails.photographer}`)).toBeInTheDocument();
    expect(screen.getByText(mockPhotoDetails.description!)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockPhotoDetails.src.large2x);
    expect(screen.getByRole('link', { name: /back to gallery/i })).toHaveAttribute('href', '/');
  });

  it('renders back button that links to home', () => {
    (usePhotoDetails as vi.Mock).mockReturnValue({
      photo: mockPhotoDetails,
      loading: false,
      error: null,
    });

    renderWithProviders(<ImageDetails />);
    
    const backButton = screen.getByRole('link', { name: /back to gallery/i });
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveAttribute('href', '/');
  });
}); 