import React from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import { above, below } from '../../utilities';
import PageFooter from './PageFooter';
import ContentSection from '../shared/ContentSection';
import NewsletterSignUpForm from '../shared/NewsletterSignupForm';
import * as gtag from '../../lib/gtag';

const FooterNav = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 2;

  // do not display until site is built out
  display: none;
`;
const FooterNavColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 1rem;
`;

const Title = styled.p`
  font-weight: 800;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.fonts.dark};
  margin: 0;
`;

const Logo = styled.img`
  height: 10rem;
`;

const NavLink = styled.a`
  margin: 0;
  color: ${({ theme }) => theme.colors.fonts.dark};
  font-size: 1.2rem;
  line-height: 1.8rem;

  &:hover {
    color: ${({ theme }) => theme.colors.highlight};
  }
`;

const Detail = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  ${below.med`
    flex-direction: column;
    align-items: center;
  `};
`;

const StyledNewsletterSignUpForm = styled(NewsletterSignUpForm)`
  ${below.med`
    margin-top: 3rem;
  `};
`;

const Footer = ({ className }) => {
  const clickTracking = label => {
    gtag.event({
      clientWindow: window,
      action: 'click',
      category: 'footer',
      label,
    });
  };

  return (
    <>
      <ContentSection className={className} id="newsletter">
        <Detail>
          <a href="/" onClick={() => clickTracking('logo')}>
            <Logo src="/svgs/THATConference.svg" alt="THAT Conference" />
          </a>
          <FooterNav>
            <FooterNavColumn>
              <Title>Links</Title>
              <NavLink href="/" onClick={() => clickTracking('schedule')}>
                Schedule
              </NavLink>
              <NavLink
                href="/wi/partners/become"
                onClick={() => clickTracking('become a partner')}
              >
                Become a Partner
              </NavLink>
              <NavLink href="/" onClick={() => clickTracking('map')}>
                Conference Map
              </NavLink>
              <NavLink href="/" onClick={() => clickTracking('contact')}>
                Contact Us
              </NavLink>
            </FooterNavColumn>
            <FooterNavColumn>
              <Title>Plan Your Trip</Title>
              <NavLink
                href="/"
                onClick={() => clickTracking('important dates')}
              >
                Important Dates
              </NavLink>
              <NavLink href="/" onClick={() => clickTracking('travel info')}>
                Travel Information
              </NavLink>
              <NavLink href="/" onClick={() => clickTracking('handbook')}>
                Handbooks
              </NavLink>
              <NavLink href="/" onClick={() => clickTracking('faq')}>
                FAQ
              </NavLink>
            </FooterNavColumn>
            <FooterNavColumn>
              <Title>Links</Title>
              <NavLink href="/" onClick={() => clickTracking('terms')}>
                Terms of Use
              </NavLink>
              <NavLink href="/" onClick={() => clickTracking('copyright')}>
                Copyright Policy
              </NavLink>
              <NavLink href="/" onClick={() => clickTracking('privacy')}>
                Privacy Policy
              </NavLink>
              <NavLink href="/" onClick={() => clickTracking('policies')}>
                Other Policies
              </NavLink>
            </FooterNavColumn>
          </FooterNav>
          <StyledNewsletterSignUpForm title="Join our community, sign up for our newsletter" />
        </Detail>
      </ContentSection>
      <PageFooter />
    </>
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
