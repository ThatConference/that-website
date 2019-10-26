import React from 'react';
import styled from 'styled-components';
import Icon from './Icon';

const SquareButton = ({ className, icon, iconClass, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      {icon && <Icon icon={icon} className={iconClass} />}
    </button>
  );
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
    cursor: auto;
  }

  svg {
    fill: ${({ theme }) => theme.colors.fonts.light};
  }
`;
