import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Icon from './Icon';
import { below, socialConstants } from '../../utilities';
import * as gtag from '../../lib/gtag';

const SocialLinksContainer = styled.div`
  display: flex;
  flex-direction: ${props => props.rowOrColumn};
  justify-content: center;
`;

const SocialBlock = styled.div`
  width: ${props => props.size};
`;

const StyledLink = styled.a`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: ${props => props.size};
  background-color: ${({ theme }) => theme.colors.highlight};
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

  .is-round {
    max-height: 68%;
  }

  &:hover {
    svg {
      fill: ${({ theme }) => theme.colors.white};
    }
  }
`;

const SocialLinks = ({
  className,
  flexDirection,
  includeDescription,
  size,
  socialLinks,
}) => {
  const iconHeight = '38';
  const iconWidth = '38';

  const clickTracking = label => {
    gtag.event({
      clientWindow: window,
      action: 'click',
      category: 'social',
      label,
    });
  };

  return (
    <SocialLinksContainer className={className} rowOrColumn={flexDirection}>
      {Object.keys(socialLinks).map(key => {
        return (
          <SocialBlock size={size} className="social-block" key={key}>
            <StyledLink
              href={socialLinks[key].url}
              target="_blank"
              rel="noreferrer noopener"
              key={key}
              onClick={() => clickTracking(key)}
              size={size}
            >
              <Icon
                icon={socialConstants.socialIcons[key].icon.name}
                height={
                  socialConstants.socialIcons[key].icon.height || iconHeight
                }
                width={socialConstants.socialIcons[key].icon.width || iconWidth}
                className={socialConstants.socialIcons[key].className}
              />
            </StyledLink>
            {includeDescription && (
              <p className="centered-text social-description">
                {socialLinks[key].description}
              </p>
            )}
          </SocialBlock>
        );
      })}
    </SocialLinksContainer>
  );
};

SocialLinks.propTypes = {
  className: PropTypes.string,
  flexDirection: PropTypes.string,
  includeDescription: PropTypes.bool,
  size: PropTypes.string,
  socialLinks: PropTypes.shape({}),
};
SocialLinks.defaultProps = {
  className: '',
  flexDirection: 'row',
  includeDescription: false,
  size: '3.5rem',
  socialLinks: socialConstants.thatSocialLinks,
};

export default styled(SocialLinks)``;
