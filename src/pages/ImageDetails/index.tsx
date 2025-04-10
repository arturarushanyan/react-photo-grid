import React from 'react';
import { useParams } from 'react-router-dom';
import { usePhotoDetails } from '../../hooks/usePhotoDetails';
import {
  Container,
  BackButton,
  ContentWrapper,
  ImageContainer,
  Image,
  InfoSection,
  Title,
  Description,
  MetaInfo,
  MetaItem,
  MetaLabel,
  MetaValue,
  PhotographerLink,
} from './ImageDetails.styles';

export const ImageDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { photo, loading, error } = usePhotoDetails(id);

  if (loading) {
    return (
      <Container>
        <BackButton to="/">← Back to Gallery</BackButton>
        <div>Loading...</div>
      </Container>
    );
  }

  if (error || !photo) {
    return (
      <Container>
        <BackButton to="/">← Back to Gallery</BackButton>
        <div>Failed to load photo details.</div>
      </Container>
    );
  }

  return (
    <Container>
      <BackButton to="/">← Back to Gallery</BackButton>
      
      <ContentWrapper>
        <ImageContainer>
          <Image
            src={photo.src.large2x}
            alt={photo.alt || `Photo by ${photo.photographer}`}
            loading="eager"
          />
        </ImageContainer>

        <InfoSection>
          <Title>Photo by {photo.photographer}</Title>
          {photo.description && (
            <Description>{photo.description}</Description>
          )}

          <MetaInfo>
            <MetaItem>
              <MetaLabel>Photographer</MetaLabel>
              <MetaValue>
                <PhotographerLink 
                  href={photo.photographer_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {photo.photographer}
                </PhotographerLink>
              </MetaValue>
            </MetaItem>

            {photo.taken_at && (
              <MetaItem>
                <MetaLabel>Date Taken</MetaLabel>
                <MetaValue>
                  {new Date(photo.taken_at).toLocaleDateString()}
                </MetaValue>
              </MetaItem>
            )}

            <MetaItem>
              <MetaLabel>Dimensions</MetaLabel>
              <MetaValue>{photo.width} × {photo.height}</MetaValue>
            </MetaItem>

            <MetaItem>
              <MetaLabel>Color</MetaLabel>
              <MetaValue style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px' 
              }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: photo.avg_color,
                  borderRadius: '4px'
                }} />
                {photo.avg_color}
              </MetaValue>
            </MetaItem>
          </MetaInfo>
        </InfoSection>
      </ContentWrapper>
    </Container>
  );
};

export default ImageDetails; 