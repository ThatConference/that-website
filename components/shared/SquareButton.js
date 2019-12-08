import React from 'react';
import styled from 'styled-components';
import Icon from './Icon';
import * as gtag from '../../lib/gtag';

const SquareButton = ({
  className,
  color,
  backgroundColor,
  borderColor,
  icon,
  iconClass,
  isSubmit,
  onClick,
  label,
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
    // eslint-disable-next-line react/button-has-type
    <button
      className={className}
      color={color}
      backgroundcolor={backgroundColor}
      bordercolor={borderColor}
      onClick={() => clickTracking(`${icon} - ${iconClass}`)}
      type={isSubmit ? 'submit' : 'button'}
    >
      {label && <p>{label}</p>}
      {icon && <Icon icon={icon} className={iconClass} />}
    </button>
  );
};

SquareButton.defaultProps = {
  onClick: () => {},
};

export default styled(SquareButton)`
  width: ${({ width }) => width || '4rem'};
  height: ${({ height }) => height || '4rem'};
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor ? theme.colors[backgroundColor] : theme.colors.thatBlue};
  border: ${({ borderColor, theme }) =>
    borderColor ? `2px solid ${theme.colors[borderColor]}` : 'none'};
  color: ${({ color, theme }) =>
    color ? theme.colors.fonts[color] : theme.colors.fonts.light};
  margin: 0.2rem;
  padding: 0;

  &.inactive {
  }

  &:hover {
    cursor: pointer;
  }

  p {
    margin: 0;
    color: ${({ color, theme }) =>
      color ? theme.colors.fonts[color] : theme.colors.fonts.light};
  }

  svg {
    fill: ${({ theme }) => theme.colors.fonts.light};
  }
`;
