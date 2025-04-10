import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import MasonryItem from './MasonryItem';
import { theme } from '../../styles/theme';

const mockProps = {
  id: 1,
  src: 'test-image.jpg',
  photographer: 'John Doe',
};

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('MasonryItem', () => {
  it('renders the image with correct attributes', () => {
    renderWithProviders(<MasonryItem {...mockProps} />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockProps.src);
    expect(image).toHaveAttribute('alt', `Photo by ${mockProps.photographer}`);
    expect(image).toHaveAttribute('loading', 'lazy');
  });

  it('renders photographer name', () => {
    renderWithProviders(<MasonryItem {...mockProps} />);
    
    expect(screen.getByText(`Photo by ${mockProps.photographer}`)).toBeInTheDocument();
  });

  it('links to the correct photo detail page', () => {
    renderWithProviders(<MasonryItem {...mockProps} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/photo/${mockProps.id}`);
  });
}); 