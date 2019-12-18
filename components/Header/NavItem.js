import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';

import { below } from '../../utilities/breakpoint';

const StyledLink = styled.a`
  font-size: 1.4rem;
  text-align: center;
  color: ${props =>
    props.color
      ? props.theme.colors[props.color]
      : props.theme.colors.secondary};

  &:hover {
    color: ${({ theme }) => theme.colors.highlight};
  }

  ${below.med`
    font-size: 2rem;
  `};
`;

const NavImage = styled.img`
  width: ${props => (props.imageWidth ? props.imageWidth : '7rem')};
  margin-top: 1rem;
  margin-bottom: 0.3rem;
`;

const NavItem = ({
  color,
  href,
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
    return title;
  };

  return (
    <>
      {isLocal ? (
        <Link href={href} passHref>
          <StyledLink onClick={onClick} color={color} target={target}>
            {displayedLink()}
          </StyledLink>
        </Link>
      ) : (
        <StyledLink href={href} color={color} target={target}>
          {displayedLink()}
        </StyledLink>
      )}
    </>
  );
};

NavItem.propTypes = {
  color: PropTypes.string,
  href: PropTypes.string.isRequired,
  image: PropTypes.string,
  imageWidth: PropTypes.string,
  isLocal: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.shape({}),
  target: PropTypes.string,
  title: PropTypes.string,
};

NavItem.defaultProps = {
  color: '',
  image: '',
  imageWidth: '',
  isLocal: true,
  onClick: () => {},
  style: {},
  target: '',
  title: '',
};

export default NavItem;
