import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: none;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  transition: color ${({ theme }) => theme.transitions.default};

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(300px, 2fr) 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.skeleton.base};
  grid-column: 1;

  @media (max-width: 1024px) {
    grid-column: 1;
    grid-row: 1;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

export const InfoSection = styled.div`
  padding: 0 ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: ${({ theme }) => theme.spacing.lg};
  grid-column: 2;

  @media (max-width: 1024px) {
    grid-column: 1;
    grid-row: 2;
    position: static;
  }
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const Description = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const MetaInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const MetaItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  align-items: center;

  &:last-child {
    border-bottom: none;
  }
`;

export const MetaLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const MetaValue = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const PhotographerLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  transition: opacity ${({ theme }) => theme.transitions.default};

  &:hover {
    opacity: 0.8;
  }
`; 