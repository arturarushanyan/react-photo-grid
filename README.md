# React Photo Grid

A responsive photo gallery application built with React and the Pexels API, featuring a masonry grid layout for displaying high-quality images.

## Features

- Responsive masonry grid layout
- Integration with Pexels API
- Infinite scroll for loading more images
- TypeScript for type safety
- Styled Components for styling
- Unit testing with Vitest
- Image details view
- Loading skeletons for better UX
- Error handling and fallbacks

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Pexels API key (get one at [Pexels](https://www.pexels.com/api/))

### Environment Setup

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Add your Pexels API key to the `.env` file:
```bash
VITE_PEXELS_API_KEY=your_api_key_here
VITE_PEXELS_API_URL=https://api.pexels.com/v1
```

### Installation

```bash
npm install
# or
yarn
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
# or
yarn build
```

### Running Tests

```bash
# Run tests in watch mode
npm test
# or
yarn test

# Run tests with coverage
npm run test:coverage
# or
yarn test:coverage
```

## Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── MasonryGrid/    # Main grid component
│   ├── MasonryItem/    # Individual image items
│   └── PhotoModal/     # Image details modal
├── hooks/         # Custom React hooks
│   ├── useApi          # Generic API hook
│   ├── usePexelsPhotos # Pexels API integration
│   └── usePhotoDetails # Single photo details
├── pages/         # Page components
│   ├── Home           # Main gallery page
│   └── ImageDetails   # Individual image view
├── styles/        # Global styles and theme
├── config/        # Configuration files
├── types/         # TypeScript type definitions
├── test/          # Test setup and utilities
└── assets/        # Static assets
```

## Technical Implementation

### Core Components

1. **MasonryGrid**
   - Responsive layout adapting to viewport size
   - Dynamic column count based on screen width
   - Efficient reflow handling

2. **MasonryItem**
   - Lazy loading of images
   - Skeleton loading states
   - Click handling for image details

3. **PhotoModal**
   - Detailed image view
   - Photographer attribution
   - Download options

### Custom Hooks

1. **useApi**
   - Generic hook for API calls
   - Loading and error state management
   - TypeScript generics for type safety

2. **usePexelsPhotos**
   - Pexels API integration
   - Infinite scroll implementation
   - Photo list state management

3. **usePhotoDetails**
   - Individual photo data fetching
   - Caching of viewed photos
   - Error handling

### Performance Optimizations

- Infinite scroll with intersection observer
- Image lazy loading
- Skeleton loading states
- Debounced scroll handling
- Memoized components where beneficial

### SEO & Accessibility

- Semantic HTML structure
- Meta descriptions
- robots.txt configuration
- Alt text for images
- Keyboard navigation support

## Environment Variables

```
VITE_PEXELS_API_KEY  # Your Pexels API key
VITE_PEXELS_API_URL  # Pexels API base URL (https://api.pexels.com/v1)
```

## Available Scripts

- `dev`: Runs development server
- `build`: Builds for production
- `preview`: Preview production build
- `test`: Runs tests in watch mode
- `test:coverage`: Runs tests with coverage
- `test:ui`: Runs tests with UI
- `lint`: Runs ESLint

## Dependencies

### Main Dependencies
- React 19.0.0
- React Router DOM 7.5.0
- Styled Components 6.1.17

### Development Dependencies
- TypeScript 5.7.2
- Vite 6.2.0
- Vitest 3.1.1
- Testing Library React 16.3.0
- ESLint 9.21.0

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Improvements

1. Add search functionality
2. Implement image caching
3. Add photo categories
4. Improve test coverage
5. Add E2E tests with Cypress
6. Add photo filtering options
7. Implement user collections
8. Add sharing functionality

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.