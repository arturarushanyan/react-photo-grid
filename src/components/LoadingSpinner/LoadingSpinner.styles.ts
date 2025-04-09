import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm};
`;

interface SpinnerProps {
  $size: 'small' | 'medium' | 'large';
}

const getSpinnerSize = (size: 'small' | 'medium' | 'large'): string => {
  switch (size) {
    case 'small':
      return '20px';
    case 'large':
      return '48px';
    case 'medium':
    default:
      return '32px';
  }
};

const getBorderWidth = (size: 'small' | 'medium' | 'large'): string => {
  switch (size) {
    case 'small':
      return '2px';
    case 'large':
      return '4px';
    case 'medium':
    default:
      return '3px';
  }
};

export const Spinner = styled.div<SpinnerProps>`
  width: ${({ $size }) => getSpinnerSize($size)};
  height: ${({ $size }) => getSpinnerSize($size)};
  border: ${({ $size, theme }) => `${getBorderWidth($size)} solid ${theme.colors.spinner.border}`};
  border-top-color: ${({ theme }) => theme.colors.spinner.active};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`; 