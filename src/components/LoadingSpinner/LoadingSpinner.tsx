import React from 'react';
import { SpinnerContainer, Spinner } from './LoadingSpinner.styles';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'medium' }) => (
  <SpinnerContainer>
    <Spinner $size={size} />
  </SpinnerContainer>
); 