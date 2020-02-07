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

const Footer = ({ className }) => {
  const copyrightMessage = `All Rights Reserved. Copyright ${new Date().getFullYear()} THAT Conference.
        Version 4.0.`;
  return (
    <div className={className}>
      <Copyright>{copyrightMessage}</Copyright>
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
