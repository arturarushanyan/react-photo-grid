import React from 'react';
import styled from 'styled-components';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';

const ErrorMessage = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

export const MasonryGridErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ErrorBoundary
    fallback={
      <ErrorMessage>
        Unable to load the photo grid. Please try again later.
      </ErrorMessage>
    }
  >
    {children}
  </ErrorBoundary>
); 