/**
 * Small square button used
 */

/* eslint-disable react/button-has-type */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Icon from './Icon';
import * as gtag from '../../lib/gtag';

const SquareButton = ({
  backgroundColor,
  borderColor,
  className,
  color,
  icon,
  iconClass,
  iconHeight,
  iconWidth,
  isSubmit,
  label,
  onClick,
  tabIndex,
}) => {
  const clickTracking = () => {
    gtag.event({
      clientWindow: window,
      action: 'click',
      category: 'square button',
      label,
    });
    onClick();
  };

  return (
    // KNOWN bug: https://github.com/yannickcr/eslint-plugin-react/issues/1555
    <button
      className={className}
      color={color}
      backgroundcolor={backgroundColor}
      bordercolor={borderColor}
      hoverbordercolor="thatBlue"
      hoverbackgroundcolor="thatBlue"
      hovercolor="white"
      onClick={() => clickTracking(`${label} || ${icon} - ${iconClass}`)}
      type={isSubmit ? 'submit' : 'button'}
      tabIndex={tabIndex}
      ariaLabel={label || `${icon} button`}
    >
      {label && <p>{label}</p>}
      {icon && (
        <Icon
          icon={icon}
          height={iconHeight}
          width={iconWidth}
          className={iconClass}
        />
      )}
    </button>
  );
};

SquareButton.propTypes = {
  className: PropTypes.string,
  backgroundColor: PropTypes.string.isRequired,
  borderColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  iconClass: PropTypes.string.isRequired,
  iconHeight: PropTypes.string.isRequired,
  iconWidth: PropTypes.string.isRequired,
  isSubmit: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  tabIndex: PropTypes.string.isRequired,
};

SquareButton.defaultProps = {
  className: '',
  onClick: () => {},
};

export default styled(SquareButton)`
  width: ${({ width }) => width || '4rem'};
  height: ${({ height }) => height || '4rem'};
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor ? theme.colors[backgroundColor] : theme.colors.thatBlue};
  border: ${({ borderColor, theme }) =>
    borderColor
      ? `2px solid ${theme.colors[borderColor]}`
      : '2px solid transparent'};
  color: ${({ color, theme }) =>
    color
      ? theme.colors.fonts[color] || theme.colors[color]
      : theme.colors.fonts.light};
  margin: 0.2rem;
  padding: 0;
  tabindex: ${({ tabIndex }) => tabIndex || 0};

  &.inactive {
    background: ${({ theme }) => theme.colors.mediumGray};
    border-color: ${({ theme }) => theme.colors.mediumGray};
    cursor: not-allowed;
    pointer-events: none;

    p {
      color: ${({ theme }) => theme.colors.darkGray};
    }
  }

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
    margin: 0;
    color: ${({ color, theme }) =>
      color
        ? theme.colors.fonts[color] || theme.colors[color]
        : theme.colors.fonts.light};
  }

  svg {
    fill: ${({ theme }) => theme.colors.fonts.light};
  }
`;
