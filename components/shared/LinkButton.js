import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'next/link';
import * as gtag from '../../lib/gtag';

import { below } from '../../utilities';

const StyledOutlineLink = styled.a`
  display: inline-block;
  border: 2px solid
    ${({ borderColor, theme }) =>
      borderColor ? theme.colors[borderColor] : theme.colors.primary};
  // margin: auto;
  margin-top: 2rem;
  min-width: 20rem;
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor ? theme.colors[backgroundColor] : theme.colors.white};

  ${below.small`
    width: 100%;
  `};

  &:hover {
    cursor: pointer;
    background-color: ${({ hoverBackgroundColor, theme }) =>
      hoverBackgroundColor
        ? theme.colors[hoverBackgroundColor]
        : theme.colors.primary};
    border: 2px solid
      ${({ hoverBorderColor, theme }) =>
        hoverBorderColor
          ? theme.colors[hoverBorderColor]
          : theme.colors.primary};

    p {
      color: ${({ hoverColor, theme }) =>
        hoverColor ? theme.colors[hoverColor] : theme.colors.white};
    }
  }

  p {
    color: ${({ color, theme }) =>
      color ? theme.colors[color] : theme.colors.primary};
    margin: 1.3rem;
    text-align: center;
  }
`;

const LinkButton = ({
  href,
  color,
  className,
  borderColor,
  backgroundColor,
  label,
  target,
  isLocal,
  hoverColor,
  hoverBackgroundColor,
  hoverBorderColor,
}) => {
  const clickTracking = () => {
    gtag.event({
      clientWindow: window,
      action: 'click',
      category: 'link button',
      label,
    });
  };

  const OutlineLink = () => {
    return (
      <StyledOutlineLink
        href={href}
        onClick={clickTracking}
        color={color}
        className={className}
        borderColor={borderColor}
        backgroundColor={backgroundColor}
        target={target}
        hoverColor={hoverColor}
        hoverBackgroundColor={hoverBackgroundColor}
        hoverBorderColor={hoverBorderColor}
      >
        <p>{label}</p>
      </StyledOutlineLink>
    );
  };

  return (
    <>
      {isLocal ? (
        <Link href={href}>
          <OutlineLink />
        </Link>
      ) : (
        <OutlineLink />
      )}
    </>
  );
};

LinkButton.propTypes = {
  color: PropTypes.string,
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  borderColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  isLocal: PropTypes.bool,
  target: PropTypes.string,
  label: PropTypes.string,
};

LinkButton.defaultProps = {
  color: '',
  className: '',
  borderColor: '',
  backgroundColor: '',
  isLocal: true,
  target: '',
  label: '',
};

export default LinkButton;
