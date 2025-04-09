import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  position: relative;
`;

export const Sentinel = styled.div`
  height: 1px;
  width: 100%;
  position: absolute;
  bottom: 0;
`;

export const LoadingIndicator = styled.div`
  position: fixed;
  bottom: ${({ theme }) => theme.spacing.lg};
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.colors.overlay.dark};
  color: ${({ theme }) => theme.colors.text.light};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  z-index: 1000;
`;

export const LoadingText = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`; 