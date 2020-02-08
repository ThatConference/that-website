import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import Icon from './Icon';

import * as gtag from '../../lib/gtag';
import { below } from '../../utilities/breakpoint';

const StyledLink = styled.a`
  font-size: 1.4rem;
  text-align: center;
  color: ${props =>
    props.color
      ? props.theme.colors[props.color]
      : props.theme.colors.secondary};
  fill: ${props =>
    props.color
      ? props.theme.colors[props.color]
      : props.theme.colors.secondary};

  &:hover {
    color: ${({ theme }) => theme.colors.highlight};
    fill: ${({ theme }) => theme.colors.highlight};
  }

  ${below.med`
    font-size: 1.6rem;
  `};
`;

const NavImage = styled.img`
  width: ${props => (props.imageWidth ? props.imageWidth : '7rem')};
  margin-top: 1rem;
  margin-bottom: 0.3rem;
`;

const NavIcon = styled(Icon)`
  vertical-align: text-bottom;
  margin-left: 0.7rem;
`;

const ThatLink = ({
  color,
  href,
  icon,
  iconClass,
  image,
  imageWidth,
  isLocal,
  onClick,
  style,
  target,
  title,
}) => {
  const displayedLink = () => {
    if (image) {
      return <NavImage src={image} imageWidth={imageWidth} style={style} />;
    }

    if (icon) {
      return (
        <span>
          {title}
          <NavIcon icon={icon} height="20" width="20" className={iconClass} />
        </span>
      );
    }

    return title;
  };

  const clickTracking = () => {
    gtag.event({
      clientWindow: window,
      action: 'click',
      category: 'nav item',
      title,
    });
  };

  const handleClick = e => {
    clickTracking();
    onClick(e);
  };

  return (
    <>
      {isLocal ? (
        <Link href={href} passHref>
          <StyledLink
            onClick={handleClick}
            color={color}
            target={target}
            style={style}
          >
            {displayedLink()}
          </StyledLink>
        </Link>
      ) : (
        <StyledLink
          href={href}
          color={color}
          target={target}
          onClick={handleClick}
          style={style}
        >
          {displayedLink()}
        </StyledLink>
      )}
    </>
  );
};

ThatLink.propTypes = {
  color: PropTypes.string,
  href: PropTypes.string.isRequired,
  icon: PropTypes.string,
  iconClass: PropTypes.string,
  image: PropTypes.string,
  imageWidth: PropTypes.string,
  isLocal: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.shape({}),
  target: PropTypes.string,
  title: PropTypes.string,
};

ThatLink.defaultProps = {
  color: '',
  icon: '',
  iconClass: '',
  image: '',
  imageWidth: '',
  isLocal: true,
  onClick: () => {},
  style: {},
  target: '',
  title: '',
};

export default ThatLink;
