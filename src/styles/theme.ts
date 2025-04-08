export const theme = {
  colors: {
    primary: '#007AFF',
    background: '#FFFFFF',
    text: {
      primary: '#000000',
      secondary: '#666666',
      light: '#FFFFFF'
    },
    overlay: {
      dark: 'rgba(0, 0, 0, 0.7)',
      gradient: 'linear-gradient(transparent, rgba(0, 0, 0, 0.7))'
    }
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '16px'
  },
  typography: {
    fontSize: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '20px',
      xl: '24px'
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      bold: 700
    }
  },
  transitions: {
    default: '0.3s ease'
  }
};

export type Theme = typeof theme; 