import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  position: relative;
`;

export const GridContainer = styled.div<{ $columnGap: number }>`
  display: flex;
  gap: ${({ $columnGap }) => `${$columnGap}px`};
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const Column = styled.div<{ $rowGap: number }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ $rowGap }) => `${$rowGap}px`};
`; 