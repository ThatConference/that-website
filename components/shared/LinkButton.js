import React from 'react';
import styled from 'styled-components';
import * as gtag from '../../lib/gtag';

const OutlineLink = styled.a`
  border: 2px solid
    ${({ borderColor, theme }) =>
      borderColor ? theme.colors[borderColor] : theme.colors.primary};
  margin: auto;
  margin-top: 2rem;
  min-width: 20rem;
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor ? theme.colors[backgroundColor] : theme.colors.white};

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
  const clickTracking = e => {
    gtag.event({
      clientWindow: window,
      action: 'click',
      category: 'link button',
      label: props.label,
    });
  };

  return (
    <div style={{ display: 'flex' }}>
      <OutlineLink
        href={props.href}
        onClick={clickTracking}
        color={props.color}
        className={props.className}
        borderColor={props.borderColor}
        backgroundColor={props.backgroundColor}
      >
        <p>{props.label}</p>
      </OutlineLink>
    </div>
  );
};

export default LinkButton;
