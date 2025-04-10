# React Photo Grid

A responsive photo gallery application built with React and the Pexels API, featuring a masonry grid layout for displaying high-quality images.

Alright, here I'll briefly explain what I did overall.
First of all, to make reviewer's life a bit easier, I've included the .env file in the repo along side with my api key. Of course it should not be done n a real project.

Now, the implementation. 
For virtualized fuctionality I've decided to go with the Intersection Observer. Just because it was relatively faster to implement. I know, as you'll see, it's not a 'true' virtualization as the images does not remove from the dom when not visible. Unfortunaltely, I didn't had time to implement this.
Some other implementation variant was to use the method descibed here [text](https://dev.to/adamklein/build-your-own-virtual-scroll-part-i-11ib)
The problem with that is that for dynamic height this approach had a lot of bugs to fix. Thus, I went with another.

As suggested, I used mainly Lighthouse to see what's going on with the performance.
I'll mention right away, there are still a lot of stuff that cou;d be improved.
Mainly I would've focused more on image optimization. For example using webp format.

In any case, here are some key things to mention overall:

- Used Intersection Observer API instead of scroll events to reduce performance overhead
- Implemented through usePexelsPhotos hook with a reference-based loading state to prevent    unnecessary re-renders
- Batched state updates when loading new photos to minimize render cycles
- Utilized the Pexels API's different image sizes (medium size for grid view)
- Implemented skeleton loading states using MasonryItemSkeleton component to improve perceived performance
- Used native lazy loading with loading="lazy" attribute on images
- Custom useApi hook manages API state efficiently with proper error boundaries
- Used useRef for loading states to prevent unnecessary re-renders
- Implemented proper cleanup in hooks to prevent memory leaks
- Grid items are properly keyed for efficient DOM updates
- Used useCallback for event handlers and callbacks that are passed as props
- Implemented proper dependency arrays in useEffect hooks
- Using Vite as the build tool for faster development and optimized production builds
- Proper code splitting through React Router
- Vite's built-in optimizations

IMPORTANT NOTE: Please use production build for checking app's performance.

Other things to mention:

There are still some issues to solve for which unfortunately I didn't have time. 
Some of the issues include:

- Remove 'any' types
- Some tests are failing so need to fix those

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

then run:

```bash
npm run preview
# or
yarn preview
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

## License

This project is licensed under the MIT License.