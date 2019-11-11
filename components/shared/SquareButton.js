import React from 'react';
import styled from 'styled-components';
import Icon from './Icon';
import * as gtag from '../../lib/gtag';

const SquareButton = ({ className, icon, iconClass, onClick }) => {
  const clickTracking = label => {
    gtag.event({
      clientWindow: window,
      action: 'click',
      category: 'square button',
      label,
    });
    onClick();
  };

  return (
    <button
      className={className}
      onClick={() => clickTracking(`${icon} - ${iconClass}`)}
    >
      {icon && <Icon icon={icon} className={iconClass} />}
    </button>
  );
};

SquareButton.defaultProps = {
  onClick: () => {},
};

export default styled(SquareButton)`
  width: 4rem;
  height: 4rem;
  background-color: ${({ theme }) => theme.colors.thatBlue};
  border: none;
  color: ${({ theme }) => theme.colors.fonts.light};
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
