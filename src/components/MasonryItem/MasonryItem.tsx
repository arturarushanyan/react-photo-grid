import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Image, PhotoInfo } from './MasonryItem.styles';

export interface MasonryItemProps {
  id: number;
  src: string;
  photographer: string;
}

const MasonryItem: React.FC<MasonryItemProps> = ({
  id,
  src,
  photographer,
}) => (
  <Link to={`/photo/${id}`} style={{ textDecoration: 'none' }}>
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
  </Link>
);

export default MasonryItem;
