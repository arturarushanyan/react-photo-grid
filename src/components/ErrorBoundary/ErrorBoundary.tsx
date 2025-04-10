import { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorContainer, ErrorTitle, ErrorMessage, RetryButton } from './ErrorBoundary.styles';

interface Props {
  children: ReactNode;
  variant?: 'default' | 'api';
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  private renderError() {
    if (this.props.fallback) {
      return this.props.fallback;
    }

    if (this.props.variant === 'api') {
      return (
        <ErrorContainer>
          <ErrorTitle>Connection Error</ErrorTitle>
          <ErrorMessage>
            Unable to load data from the server. Please check your internet connection.
          </ErrorMessage>
          <RetryButton onClick={this.handleRetry}>
            Try Again
          </RetryButton>
        </ErrorContainer>
      );
    }

    return (
      <ErrorContainer>
        <ErrorTitle>Something went wrong</ErrorTitle>
        <ErrorMessage>
          {this.state.error?.message || 'An unexpected error occurred'}
        </ErrorMessage>
        <RetryButton onClick={this.handleRetry}>
          Try Again
        </RetryButton>
      </ErrorContainer>
    );
  }

  public render() {
    if (this.state.hasError) {
      return this.renderError();
    }

    return this.props.children;
  }
} 