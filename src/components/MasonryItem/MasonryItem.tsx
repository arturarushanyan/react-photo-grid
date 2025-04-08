import { Container, Image, PhotoInfo } from './MasonryItem.styles';

export interface MasonryItemProps {
  src: string;
  photographer: string;
}

const MasonryItem: React.FC<MasonryItemProps> = ({
  src,
  photographer,
}) => (
  <Container>
    <Image
      src={src}
      alt={`Photo by ${photographer}`}
      loading="lazy"
    />
    <PhotoInfo>
      Photo by {photographer}
    </PhotoInfo>
  </Container>
);

export default MasonryItem;
