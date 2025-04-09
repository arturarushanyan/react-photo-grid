import React from 'react';
import { LayoutContainer, Header, Main, Footer } from './Layout.styles';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Header>
        <h1>Photo Grid</h1>
      </Header>
      <Main>{children}</Main>
      <Footer>
        <p>© {new Date().getFullYear()} Photo Grid. Pexels API was used</p>
      </Footer>
    </LayoutContainer>
  );
}; 