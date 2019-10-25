import React, { useState } from 'react';
import styled from 'styled-components';
import { applyStyleModifiers } from 'styled-components-modifiers';
import moment from 'moment';
import MobileFooter from './MobileFooter';
import SocialLinks from '../shared/SocialLinks';
import { above, below, siteInfo } from '../../utilities';

const FOOTER_MODIFIERS = {
  site: ({ theme }) => `
    background-color: ${theme.colors.dark};
    color: ${theme.colors.fonts.light};
  `,
};

const Logo = styled.img`
  display: block;
  width: 40%;
  height: auto;
  max-width: 18rem;

  ${above.med`
    margin-right: 2rem;
  `};
`;

const Heading = styled.h3`
  text-transform: uppercase;
  font-size: 1.5rem;
  line-height: 2;
  color: ${({ theme }) => theme.colors.primary};
  border: 3px solid ${({ theme }) => theme.colors.primary};
  text-align: center;
  width: 100%;
`;

const Text = styled.p`
  margin: 0;
  line-height: 1.5;
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.highlight};

  a {
    color: ${({ theme }) => theme.colors.highlight};

    &:hover {
      color: ${({ theme }) => theme.colors.tertiary};
      cursor: pointer;
    }
  }
`;

const FooterColumn = styled.div`
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 27rem;

  ${below.med`
    :not(:first-child) {
      padding-top: 1.4rem;
    }
  `};

  ${above.med`
    min-height: 10rem;
  `};
`;

const FooterSocials = styled(SocialLinks)`
  a {
    padding: 0 0.4rem;
  }

  svg {
    fill: ${({ theme }) => theme.colors.fonts.light};
    width: 2rem;
    margin: auto;
    position: relative;
    top: 1rem;
  }

  ${above.med`
    position: relative;
    top: -1rem;
  `};
`;

const Trademark = styled.p`
  text-align: center;
  font-size: 10px;
  margin-top: 0;

  a {
    color: ${({ theme }) => theme.colors.highlight};

    &:hover {
      color: ${({ theme }) => theme.colors.tertiary};
      cursor: pointer;
    }
  }

  ${below.med`
    padding-bottom: 7rem;
  `};
`;

const Footer = ({ className }) => {
  return (
    <footer className={className}>
      <section>
        <Logo src={siteInfo.logoPath} />
        <FooterColumn>
          <Heading>Phone</Heading>
          <Text>
            <a href={`tel:${siteInfo.linkPhone}`}>{siteInfo.formattedPhone}</a>
          </Text>
        </FooterColumn>
        <FooterColumn>
          <Heading>Address</Heading>
          <Text>
            <a
              href="https://goo.gl/maps/9fvZcNvVcsiJ82Hj6"
              target="_blank"
              rel="noreferrer noopener"
              dangerouslySetInnerHTML={{ __html: siteInfo.multilineAddress }}
            />
          </Text>
        </FooterColumn>
        <FooterColumn>
          <Heading>Hours</Heading>
          <Text>
            Sunday - Thursday 11-11
            <br />
            Friday & Saturday 11-12
          </Text>
        </FooterColumn>
      </section>
      <FooterSocials />
      <Trademark>
        © {moment().year()} {siteInfo.name} ™, Made with ❤️ by{' '}
        <a
          href="http://unspecified.io"
          target="_blank"
          rel="noreferrer noopener"
        >
          Unspecified Software Co.
        </a>
      </Trademark>
      <MobileFooter />
    </footer>
  );
};

// use that media query...
export default styled(Footer)`
  font-size: 1.3rem;
  position: relative;
  top: -1rem;

  section {
    margin: 2rem;
    display: flex;
    justify-content: center;

    ${below.small`
      flex-direction: column;
      align-items: center;
    `} ${above.small`
      flex-direction: row;
    `}

    ${above.med`
      margin-bottom: 0;
      align-items: center;
    `}

    svg {
      height: 2rem;

      padding-right: 1rem;
    }
  }

  ${applyStyleModifiers(FOOTER_MODIFIERS)};
`;
