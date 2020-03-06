import React from 'react';
import styled from 'styled-components';
import { below } from '../../../../utilities/breakpoint';

const Links = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  align-self: center;
  flex-grow: 2;

  ${below.med`
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    position: relative;
    top: 1.5rem;
  `}
`;

const StyledLink = styled.a`
  cursor: pointer;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.thatBlue};

  &:hover {
    color: ${({ theme }) => theme.colors.tertiary};
  }
`;

const NavLinks = ({ showForwardLink, forwardLabel, forwardLink }) => {
  return (
    <Links>
      <StyledLink href="/wi/voting">
        <span>Voting Help</span>
      </StyledLink>
      {showForwardLink !== false && (
        <StyledLink href={forwardLink} className="float-right">
          <span>{forwardLabel}</span>
        </StyledLink>
      )}
    </Links>
  );
};

export default NavLinks;
