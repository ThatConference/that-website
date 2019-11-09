import React, { Component } from 'react';
import styled from 'styled-components';

import Icon from './Icon';
import { below } from '../../utilities';
import * as gtag from '../../lib/gtag';

const SOCIALS = [
  {
    href: 'https://www.facebook.com/ThatConference/',
    icon: {
      name: 'facebook',
    },
  },
  {
    href: 'https://www.instagram.com/thatconference/',
    icon: {
      name: 'instagram',
    },
  },
  {
    href: 'https://twitter.com/ThatConference',
    icon: {
      name: 'twitter',
    },
  },
  {
    href: 'https://medium.com/that-conference',
    icon: {
      name: 'medium',
    },
  },
  {
    href: 'https://www.youtube.com/thatconference/',
    icon: {
      name: 'youtube',
      height: 70,
      width: 70,
    },
  },
];

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

  const clickTracking = label => {
    gtag.event({
      clientWindow: window,
      action: 'click',
      category: 'social',
      label,
    });
  };

  return (
    <SocialLinksContainer className={className} rowOrColumn={rowOrColumn}>
      {SOCIALS.map((item, index) => {
        return (
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer noopener"
            key={index}
            onClick={() => clickTracking(item.icon.name)}
          >
            <Icon
              icon={item.icon.name}
              height={item.icon.height || iconHeight}
              width={item.icon.width || iconWidth}
            />
          </a>
        );
      })}
    </SocialLinksContainer>
  );
};

export default styled(SocialLinks)``;
