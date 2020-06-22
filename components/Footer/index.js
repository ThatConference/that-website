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

  ${below.small`
    flex-wrap: wrap;
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

  ${below.small`
    padding: 1rem
    width: 50%;
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
      <ContentSection id="newsletter" backgroundColor="offWhite">
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
                href="/wi/2021/partners"
                onClick={() => clickTracking('wi/2021/partners')}
              >
                2021 Partners
              </NavLink>
              <NavLink
                href="/wi/2021/become-a-partner"
                onClick={() => clickTracking('wi/2021/become-a-partner')}
              >
                Become a Partner
              </NavLink>
              <NavLink
                href="/wi/2021/jobs"
                onClick={() => clickTracking('wi/2021/jobs')}
              >
                Jobs
              </NavLink>
              <NavLink
                href="/wi/2021/tickets"
                onClick={() => clickTracking('wi/2021/tickets')}
              >
                Tickets
              </NavLink>
              <NavLink
                href="/wi/2021/important-dates"
                onClick={() => clickTracking('wi/2021/important-dates')}
              >
                Important Dates
              </NavLink>
            </FooterNavColumn>
            <FooterNavColumn>
              <Title>Resources</Title>
              <NavLink
                href="/wi/2021/faq"
                onClick={() => clickTracking('wi/2021/faq')}
              >
                FAQ
              </NavLink>
              <NavLink
                href="/wi/2021/attendee-handbook"
                onClick={() => clickTracking('wi/2021/attendee-handbook')}
              >
                Attendee Handbook
              </NavLink>
              <NavLink
                href="/wi/2021/counselor-handbook"
                onClick={() => clickTracking('wi/2021/counselor-handbook')}
              >
                Counselor Handbook
              </NavLink>
              <NavLink
                href="/wi/2021/family-handbook"
                onClick={() => clickTracking('wi/2021/family-handbook')}
              >
                Family Handbook
              </NavLink>
            </FooterNavColumn>
            <FooterNavColumn>
              <Title>Policies</Title>
              <NavLink
                href="/code-of-conduct"
                onClick={() => clickTracking('/code-of-conduct')}
              >
                Code of Conduct
              </NavLink>
              <NavLink
                href="/anti-harassment-policy"
                onClick={() => clickTracking('/anti-harassment')}
              >
                Anti-Harassment
              </NavLink>
              <NavLink
                href="/commitment-to-diversity"
                onClick={() => clickTracking('/commitment-to-diversity')}
              >
                Commitment to Diversity
              </NavLink>
              <NavLink
                href="/privacy-policy"
                onClick={() => clickTracking('/privacy')}
              >
                Privacy
              </NavLink>
              <NavLink
                href="/terms-of-use"
                onClick={() => clickTracking('/terms')}
              >
                Terms of Use
              </NavLink>
              <NavLink
                href="/copyright"
                onClick={() => clickTracking('/copyright')}
              >
                Copyright
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

export default Footer;
