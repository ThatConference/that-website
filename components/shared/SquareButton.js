import React from 'react';
import styled from 'styled-components';
import Icon from './Icon';
import * as gtag from '../../lib/gtag';

const SquareButton = props => {
  const clickTracking = label => {
    gtag.event({
      clientWindow: window,
      action: 'click',
      category: 'square button',
      label,
    });
    props.onClick();
  };

  return (
    <button
      className={props.className}
      color={props.color}
      backgroundcolor={props.backgroundColor}
      bordercolor={props.borderColor}
      onClick={() => clickTracking(`${props.icon} - ${props.iconClass}`)}
      type={props.isSubmit ? 'submit' : 'button'}
    >
      {props.label && <p>{props.label}</p>}
      {props.icon && <Icon icon={props.icon} className={props.iconClass} />}
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

  svg {
    fill: ${({ theme }) => theme.colors.fonts.light};
  }
`;
