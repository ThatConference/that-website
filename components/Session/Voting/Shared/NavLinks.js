import React from 'react';
import styled from 'styled-components';

const Links = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: absolute;
  top: 30px;
  right: 0;
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
      <StyledLink href="/wi/session/voting/start">
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
