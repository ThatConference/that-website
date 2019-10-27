import React from 'react';
import styled from 'styled-components';

const OutlineLink = styled.a`
  border: 2px solid
    ${({ borderColor, theme }) =>
      borderColor ? theme.colors[borderColor] : theme.colors.primary};
  margin: auto;
  margin-top: 2rem;
  min-width: 20rem;
  background-color: ${({ theme }) => theme.colors.white};

  &:hover {
    cursor: pointer;
  }

  p {
    color: ${({ color, theme }) =>
      color ? theme.colors[color] : theme.colors.primary};
    margin: 1.3rem;
    text-align: center;
  }
`;

const LinkButton = props => {
  return (
    <div style={{ display: 'flex' }}>
      <OutlineLink
        href={props.href}
        color={props.color}
        className={props.className}
        borderColor={props.borderColor}
      >
        <p>{props.label}</p>
      </OutlineLink>
    </div>
  );
};

export default LinkButton;
