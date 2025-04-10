import styled from 'styled-components';
import { PhotoSkeleton, TextSkeleton } from '../Skeleton/Skeleton.styles';

const SkeletonContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const TextContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.overlay.gradient};
`;

interface MasonryItemSkeletonProps {
  height: number;
}

export const MasonryItemSkeleton: React.FC<MasonryItemSkeletonProps> = ({ height }) => (
  <div data-testid="loading-skeleton" style={{ height }}>
    <SkeletonContainer>
      <PhotoSkeleton $height={height} />
      <TextContainer>
        <TextSkeleton />
      </TextContainer>
    </SkeletonContainer>
  </div>
); 