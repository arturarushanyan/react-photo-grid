// Configuration type definitions
interface PexelsConfig {
  apiKey: string;
  baseUrl: string;
  endpoints: {
    curated: string;
  };
}

interface GridConfig {
  defaultColumnCount: number;
  defaultPageSize: number;
  scrollThreshold: number;
}

interface AppConfig {
  api: {
    pexels: PexelsConfig;
  };
  grid: GridConfig;
}

// Validate environment variables
function validateEnvVariables(): void {
  if (!import.meta.env.VITE_PEXELS_API_KEY) {
    throw new Error('VITE_PEXELS_API_KEY is required');
  }

  if (!import.meta.env.VITE_PEXELS_API_URL) {
    throw new Error('VITE_PEXELS_API_URL is required');
  }
}

// Initialize configuration
function initializeConfig(): AppConfig {
  validateEnvVariables();

  return {
    api: {
      pexels: {
        apiKey: import.meta.env.VITE_PEXELS_API_KEY,
        baseUrl: import.meta.env.VITE_PEXELS_API_URL,
        endpoints: {
          curated: '/curated',
        },
      },
    },
    grid: {
      defaultColumnCount: 3,
      defaultPageSize: 30,
      scrollThreshold: 0.8,
    },
  };
}

export const config = initializeConfig(); 