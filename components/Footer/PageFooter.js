import styled from 'styled-components';
import React from 'react';
import { above, below } from '../../utilities';
import SocialLinks from '../shared/SocialLinks';

const Copyright = styled.p`
  color: ${({ theme }) => theme.colors.fonts.light};
  margin: 0;

  ${above.med`
    padding-right: 1.25rem;
  `};

  ${below.med`
    max-width: 22rem;
    margin: auto;
    text-align: center;
  `};
`;

const DesignedBy = styled.p`
  color: ${({ theme }) => theme.colors.fonts.light};
  margin: 0;

  ${above.med`
    flex-grow: 2;
    padding-left: 1.25rem;
    border-left: 1px solid white;
  `};

  ${below.med`
    align-self: auto;
    padding-bottom: 2rem;
  `};
`;

const Footer = ({ className }) => {
  return (
    <div className={className}>
      <Copyright>
        All Rights Reserved. Copyright 2019 THAT Conference. Version 4.0.
      </Copyright>
      <DesignedBy>Site by Drift.</DesignedBy>
      <SocialLinks />
    </div>
  );
};

export default styled(Footer)`
  padding: 1.7rem;
  width: 100vw;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 1.2rem;
  line-height: 1.2;

  display: flex;
  justify-content: space-between;
  align-items: center;

  ${below.med`
    flex-direction: column;
    align-items: center;
  `};
`;
