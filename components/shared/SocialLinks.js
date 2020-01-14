import React from 'react';
import styled from 'styled-components';

import Icon from './Icon';
import { below, socialConstants } from '../../utilities';
import * as gtag from '../../lib/gtag';

const SocialLinksContainer = styled.div`
  display: flex;
  flex-direction: ${props => props.rowOrColumn};
  justify-content: center;

  a {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 3.5rem;
    height: 3.5rem;
    width: 3.5rem;
    background-color: ${({ theme }) => theme.colors.highlight};
    border-radius: 3.5rem;
    margin-right: ${props => (props.rowOrColumn === 'row' ? '0.6rem' : '0')};
    margin-top: ${props => (props.rowOrColumn === 'column' ? '0.6rem' : '0')};

    ${below.med`
      margin-bottom: 1rem;
    `};

    svg {
      position: relative;
      height: 100%;
      max-height: 52%;
      fill: ${({ theme }) => theme.colors.white};
    }

    .is-bigger {
      max-height: 60%;
    }

    &:hover {
      svg {
        fill: ${({ theme }) => theme.colors.white};
      }
    }
  }
`;

const SocialLinks = ({ className, flexDirection, socialLinks }) => {
  const iconHeight = '38';
  const iconWidth = '38';
  const rowOrColumn = flexDirection || 'row';

  const clickTracking = label => {
    gtag.event({
      clientWindow: window,
      action: 'click',
      category: 'social',
      label,
    });
  };

  const socialLinksToDisplay = socialLinks || socialConstants.thatSocialLinks;

  return (
    <SocialLinksContainer className={className} rowOrColumn={rowOrColumn}>
      {Object.keys(socialLinksToDisplay).map(key => {
        return (
          <a
            href={socialLinksToDisplay[key]}
            target="_blank"
            rel="noreferrer noopener"
            key={key}
            onClick={() => clickTracking(key)}
          >
            <Icon
              icon={socialConstants.socialIcons[key].icon.name}
              height={
                socialConstants.socialIcons[key].icon.height || iconHeight
              }
              width={socialConstants.socialIcons[key].icon.width || iconWidth}
              className={socialConstants.socialIcons[key].className}
            />
          </a>
        );
      })}
    </SocialLinksContainer>
  );
};

export default styled(SocialLinks)``;
