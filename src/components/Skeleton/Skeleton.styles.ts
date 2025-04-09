import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

export const SkeletonBase = styled.div`
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.skeleton.base} 8%,
    ${({ theme }) => theme.colors.skeleton.highlight} 18%,
    ${({ theme }) => theme.colors.skeleton.base} 33%
  );
  background-size: 2000px 100%;
  animation: ${shimmer} 2s linear infinite;
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

export const PhotoSkeleton = styled(SkeletonBase)<{ $height: number }>`
  width: 100%;
  height: ${({ $height }) => `${$height}px`};
`;

export const TextSkeleton = styled(SkeletonBase)`
  height: 20px;
  width: 150px;
  margin-top: ${({ theme }) => theme.spacing.sm};
`; 