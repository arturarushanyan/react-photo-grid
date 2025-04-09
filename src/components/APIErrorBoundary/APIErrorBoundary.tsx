import React from 'react';
import styled from 'styled-components';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';

const APIErrorContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const APIErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const APIErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ErrorBoundary
    fallback={
      <APIErrorContainer>
        <APIErrorMessage>
          Unable to load data from the server. Please check your internet connection and try again.
        </APIErrorMessage>
      </APIErrorContainer>
    }
  >
    {children}
  </ErrorBoundary>
); 