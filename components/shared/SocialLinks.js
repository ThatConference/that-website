import React from 'react';
import styled from 'styled-components';

import Icon from './Icon';
import { below } from '../../utilities';

const SocialLinksContainer = styled.div`
  display: flex;
  flex-direction: ${props => props.rowOrColumn};
  justify-content: center;

  a {
    height: 3.5rem;
    background-color: ${({ theme }) => theme.colors.highlight};
    border-radius: 3.5rem;
    margin-right: ${props => (props.rowOrColumn === 'row' ? '0.6rem' : '0')};
    margin-top: ${props => (props.rowOrColumn === 'column' ? '0.6rem' : '0')};

    ${below.med`
      margin-bottom: 1rem;
    `};

    svg {
      position: relative;
      top: 0.6rem;
      left: 0.6rem;
      fill: ${({ theme }) => theme.colors.white};
    }

    &:hover {
      svg {
        fill: ${({ theme }) => theme.colors.white};
      }
    }
  }
`;

const SocialLinks = ({ className, flexDirection }) => {
  const iconHeight = '38';
  const iconWidth = '38';
  const rowOrColumn = flexDirection || 'row';
  console.log('rowOrColumn', rowOrColumn);
  return (
    <SocialLinksContainer className={className} rowOrColumn={rowOrColumn}>
      <a
        href="https://www.facebook.com/ThatConference/"
        target="_blank"
        rel="noreferrer noopener"
      >
        <Icon icon="facebook" height={iconHeight} width={iconWidth} />
      </a>
      <a
        href="https://www.instagram.com/thatconference/"
        target="_blank"
        rel="noreferrer noopener"
      >
        <Icon icon="instagram" height={iconHeight} width={iconWidth} />
      </a>
      <a
        href="https://twitter.com/ThatConference"
        target="_blank"
        rel="noreferrer noopener"
      >
        <Icon icon="twitter" height={iconHeight} width={iconWidth} />
      </a>
      <a
        href="https://medium.com/that-conference"
        target="_blank"
        rel="noreferrer noopener"
      >
        <Icon icon="medium" height={iconHeight} width={iconWidth} />
      </a>
      <a
        href="https://www.youtube.com/thatconference/"
        target="_blank"
        rel="noreferrer noopener"
      >
        <Icon icon="youtube" height="70" width="70" />
      </a>
    </SocialLinksContainer>
  );
};

export default styled(SocialLinks)``;
