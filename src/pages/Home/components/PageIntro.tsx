import React from 'react';
import { HeaderContainer, Title, Subtitle } from './PageIntro.styles';

export const PageIntro: React.FC = () => {
  return (
    <HeaderContainer>
      <Title>Discover Amazing Photos</Title>
      <Subtitle>A curated collection of beautiful images from Pexels</Subtitle>
    </HeaderContainer>
  );
}; 