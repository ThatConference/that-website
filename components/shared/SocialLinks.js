import React from 'react';
import styled from 'styled-components';

import Icon from './Icon';
import { below } from '../../utilities';

const SocialLinksContainer = styled.div`
  display: flex;
  justify-content: center;

  a {
    ${below.med`
      margin-bottom: 1rem;
    `};

    &:hover {
      svg {
        fill: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`;

const SocialLinks = ({ className }) => {
  const iconHeight = '29';
  const iconWidth = '29';

  return (
    <SocialLinksContainer className={className}>
      <a href="https://www.facebook.com/sandbarandislandgrill/" target="_blank">
        <Icon icon="facebook" height={iconHeight} width={iconWidth} />
      </a>
      <a
        href="https://www.instagram.com/sandbarandislandgrill/"
        target="_blank"
        rel="noreferrer noopener"
      >
        <Icon icon="instagram" height={iconHeight} width={iconWidth} />
      </a>
      <a
        href="https://www.tripadvisor.com/Restaurant_Review-g60341-d2224176-Reviews-Sand_Bar_and_Island_Grill-Twin_Lakes_Wisconsin.html"
        target="_blank"
        rel="noreferrer noopener"
      >
        <Icon icon="tripAdvisor" height={iconHeight} width={iconWidth} />
      </a>
      <a
        href="https://www.yelp.com/biz/sand-bar-and-island-grill-twin-lakes"
        target="_blank"
        rel="noreferrer noopener"
      >
        <Icon icon="yelp" height={iconHeight} width={iconWidth} />
      </a>
    </SocialLinksContainer>
  );
};

export default styled(SocialLinks)``;
