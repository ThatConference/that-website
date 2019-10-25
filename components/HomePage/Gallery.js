import React from 'react';
import styled from 'styled-components';
import ContentSection from '../shared/ContentSection';
import { above, below } from '../../utilities';

const ImageContainer = styled.a`
  display: flex;

  ${below.med`
    flex-direction: column;
    max-width: 30rem;
  `};
`;

const ImageColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  &.large {
    flex-grow: 2;
  }
`;

const SquareImage = styled.img`
  max-height: 14rem;
  object-fit: cover;

  ${above.med`
    max-height: 28rem;
    padding: 0.6rem;
  `};
`;

const RectangleImage = styled.img`
  max-height: 14rem;
  object-fit: cover;

  ${above.med`
    padding: 0.6rem;
  `};
`;

const Gallery = ({ className }) => {
  return (
    <ContentSection title="Gallery" color="light" className={className}>
      <ImageContainer href="./gallery">
        <ImageColumn>
          <RectangleImage src="/static/images/bartender.jpg" />
          <RectangleImage src="/static/images/Gallery-Oysters2-1.jpg" />
        </ImageColumn>
        <ImageColumn className="large">
          <SquareImage src="/static/images/outside-night.jpg" />
        </ImageColumn>
        <ImageColumn>
          <RectangleImage src="/static/images/fish.jpg" />
          <RectangleImage src="/static/images/grill.jpg" />
        </ImageColumn>
      </ImageContainer>
    </ContentSection>
  );
};

export default styled(Gallery)``;
