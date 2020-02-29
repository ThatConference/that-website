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
  backgroundColor,
  borderColor,
  className,
  color,
  hoverBackgroundColor,
  hoverBorderColor,
  hoverColor,
  href,
  isLocal,
  onClick,
  label,
  target,
}) => {
  const clickTracking = () => {
    gtag.event({
      clientWindow: window,
      action: 'click',
      category: 'link button',
      label,
    });
  };

  const ConditionalWrapper = ({ condition, wrapper, children }) =>
    condition ? wrapper(children) : children;

  return (
    <ConditionalWrapper
      condition={isLocal}
      wrapper={children => (
        <Link href={href} prefetch={false}>
          {children}
        </Link>
      )}
    >
      <StyledOutlineLink
        href={href}
        onClick={() => {
          onClick();
          clickTracking();
        }}
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
    </ConditionalWrapper>
  );
};

LinkButton.propTypes = {
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string,
  href: PropTypes.string.isRequired,
  isLocal: PropTypes.bool,
  label: PropTypes.string,
  onClick: PropTypes.func,
  target: PropTypes.string,
};

LinkButton.defaultProps = {
  backgroundColor: '',
  borderColor: '',
  className: '',
  color: '',
  isLocal: true,
  label: '',
  onClick: () => {},
  target: '',
};

export default LinkButton;
