import React from 'react';
import styled from 'styled-components';
import { below } from '../../utilities';
import PageFooter from './PageFooter';
import ContentSection from '../shared/ContentSection';
import NewsletterSignUpForm from '../shared/NewsletterSignupForm';
import * as gtag from '../../lib/gtag';

const Detail = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  ${below.large`
    flex-direction: column;
    align-items: center;
  `};
`;

const Logo = styled.img`
  height: 10rem;
`;

const FooterNav = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 2;
  justify-content: flex-end;

  ${below.large`
    margin: 3rem 0;
  `};
`;
const FooterNavColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 3.5rem;

  ${below.larger`
    padding-right: 4rem;
  `};

  ${below.large`
    padding: 0 2rem;
  `};
`;

const Title = styled.h5`
  font-weight: 800;
  font-size: 1.4rem;
  margin: 0;
  text-transform: uppercase;
`;

const NavLink = styled.a`
  margin: 0;
  color: ${({ theme }) => theme.colors.fonts.dark};
  font-size: 1.2rem;
  line-height: 2.1rem;

  &:hover {
    color: ${({ theme }) => theme.colors.highlight};
  }
`;

const Footer = () => {
  const clickTracking = label => {
    gtag.event({
      clientWindow: window,
      action: 'click',
      category: 'footer',
      label,
    });
  };

  return (
    <footer>
      <ContentSection id="newsletter">
        <Detail>
          <a href="/" onClick={() => clickTracking('logo')}>
            <Logo src="/svgs/THATConference.svg" alt="THAT Conference" />
          </a>
          <FooterNav>
            <FooterNavColumn>
              <Title>THAT</Title>
              <NavLink href="/about" onClick={() => clickTracking('about')}>
                About
              </NavLink>
              <NavLink href="/blog" onClick={() => clickTracking('blog')}>
                Blog
              </NavLink>
              <NavLink href="/contact" onClick={() => clickTracking('contact')}>
                Contact
              </NavLink>
              <NavLink href="/jobs" onClick={() => clickTracking('jobs')}>
                Jobs
              </NavLink>
              <NavLink
                href="/partners"
                onClick={() => clickTracking('partners')}
              >
                Partners
              </NavLink>
            </FooterNavColumn>
            <FooterNavColumn>
              <Title>WI</Title>
              <NavLink
                href="/wi/partners"
                onClick={() => clickTracking('wi/partners')}
              >
                Partners
              </NavLink>
              <NavLink
                href="/wi/tickets"
                onClick={() => clickTracking('wi/tickets')}
              >
                Tickets
              </NavLink>
            </FooterNavColumn>
            <FooterNavColumn>
              <Title>Resources</Title>
              <NavLink href="/wi/faq" onClick={() => clickTracking('faq')}>
                FAQ
              </NavLink>
              <NavLink
                href="/wi/code-of-conduct"
                onClick={() => clickTracking('terms')}
              >
                Code of Conduct
              </NavLink>
              <NavLink
                href="/wi/attendee-handbook"
                onClick={() => clickTracking('attendee-handbook')}
              >
                Attendee Handbook
              </NavLink>
              <NavLink
                href="/wi/counselor-handbook"
                onClick={() => clickTracking('counselor-handbook')}
              >
                Counselor Handbook
              </NavLink>
              <NavLink
                href="/wi/family-handbook"
                onClick={() => clickTracking('family-handbook')}
              >
                Family Handbook
              </NavLink>
            </FooterNavColumn>
            <FooterNavColumn>
              <Title>Policies</Title>
              <NavLink
                href="/wi/terms-of-use"
                onClick={() => clickTracking('terms')}
              >
                Terms of Use
              </NavLink>
              <NavLink
                href="/wi/copyright"
                onClick={() => clickTracking('copyright')}
              >
                Copyright
              </NavLink>
              <NavLink
                href="/wi/privacy-policy"
                onClick={() => clickTracking('privacy')}
              >
                Privacy
              </NavLink>
              <NavLink
                href="/wi/anti-harassment-policy"
                onClick={() => clickTracking('anti-harassment')}
              >
                Anti-Harassment
              </NavLink>
              <NavLink
                href="/wi/commitment-to-diversity"
                onClick={() => clickTracking('commitment-to-diversity')}
              >
                Commitment to Diversity
              </NavLink>
            </FooterNavColumn>
          </FooterNav>
          <NewsletterSignUpForm title="Join our community, sign up for our newsletter" />
        </Detail>
      </ContentSection>
      <PageFooter />
    </footer>
  );
};

export default styled(Footer)`
  display: flex;
  align-items: center;
  padding: 0 2rem;
  min-height: 18rem;
  background-color: ${({ theme }) => theme.colors.offWhite};

  ${below.med`
    min-height: 33rem;
  `};
`;
