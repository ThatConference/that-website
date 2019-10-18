import React from 'react';
import styled from 'styled-components';

import ContentSection from './ContentSection';
import { below } from '../utilities/breakpoint';

const SpecialItem = styled.div`
  max-width: 25rem;
  text-align: center;

  ${below.med`
    &:not(:last-child){
      border: 2px ${({ theme }) => theme.colors.medium};
      border-bottom-style: dotted;
    }
    
    padding:  2rem 0;
  `};
`;

const SpecialTitle = styled.p`
  text-transform: uppercase;
  font-weight: 800;
  margin: 0 0 1rem 0;
  line-height: 1.7;
  background-color: ${({ theme }) => theme.colors.highlight};
  color: ${({ theme }) => theme.colors.secondary};
`;

const SpecialSubtitle = styled.p`
  text-transform: uppercase;
  margin: 0;
  line-height: 1.8;
  font-weight: 600;
`;

const SpecialDescription = styled.p`
  line-height: 1.8;
  margin: 1rem 0 0 0;
`;

const HighlightImage = styled.img`
  height: 20rem;
  width: auto;
  position: absolute;
  right: -5rem;
  top: 6rem;
`;

const Specials = ({ className }) => (
  <ContentSection title="Drink and Dinner Specials">
    <SpecialItem>
      <SpecialTitle>EVERY FRIDAY</SpecialTitle>
      <SpecialSubtitle>Fresh Oysters & Mussels</SpecialSubtitle>
      <SpecialDescription>
        Every Friday after 4PM through Sunday we ship in Fresh Plump Quality
        East Coast Oysters and Mussels. When they're gone, they're gone, well
        until next Friday.
      </SpecialDescription>
    </SpecialItem>

    <SpecialItem>
      <SpecialTitle>SUNDAY FUNDAY</SpecialTitle>
      <SpecialSubtitle>$1.50 Bloody Marys</SpecialSubtitle>
      <SpecialDescription>
        Every Sunday from open till close, Bloody Marys are just a $1.50.
      </SpecialDescription>
    </SpecialItem>

    <SpecialItem>
      <SpecialTitle>EVERYDAY</SpecialTitle>
      <SpecialSubtitle>Something Different Daily</SpecialSubtitle>
      <SpecialDescription>
        Each and every day we mix it up. That's right our chefs come up with a
        few crazy dishes. How about a tried and true Cuban Sandwich or Scallop
        Tacos? What will it be today?
      </SpecialDescription>
    </SpecialItem>

    <HighlightImage src="../static/images/tiki-drink.png" />
  </ContentSection>
);

export default styled(Specials)``;
