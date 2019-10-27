import styled from 'styled-components';
import React from 'react';
import { above, below } from '../../utilities';
import SocialLinks from '../shared/SocialLinks';

const Copyright = styled.p`
  color: ${({ theme }) => theme.colors.fonts.light};
  margin: 0;
`;

const DesignedBy = styled.p`
  color: ${({ theme }) => theme.colors.fonts.light};
  align-self: flex-start;
  margin: 0;
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

  display: flex;
  justify-content: space-between;

  ${below.med`
    flex-direction: column;
  `};
`;
