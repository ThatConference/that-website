import router, { useRouter } from 'next/router';
import nprogress from 'nprogress';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import * as gtag from '../../lib/gtag';

import MessageBar from './MessageBar';
import Nav from './Nav';
import ContentSection from '../shared/ContentSection';
import LinkButton from '../shared/LinkButton';
import { above, below } from '../../utilities';
import MemberNav from './MemberNav';

const GET_EVENT = gql`
  query getEvent($eventId: ID!) {
    events {
      event(id: $eventId) {
        get {
          id
          notifications {
            id
            shouldFeature
            title
            message
            startDate
            endDate
            link
            linkText
          }
        }
      }
    }
  }
`;

router.onRouteChangeStart = () => {
  nprogress.start();
};

router.onRouteChangeComplete = () => {
  nprogress.done();
};

router.onRouteChangeError = () => {
  nprogress.done();
};

const HeaderSection = styled(ContentSection)`
  padding-bottom: 0.5rem;
`;

const PageHeader = styled.div`
  margin-top: 2rem;
  height: 10rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const LogoLink = styled.a`
  height: 100%;
  fill: ${({ theme }) => theme.colors.white};
`;

const StyledLogo = styled.img`
  height: 100%;
  margin-right: 3rem;
`;

const ActionButton = styled(LinkButton)`
  margin: 0;
  background-color: ${({ theme }) => theme.colors.thatBlue};

  ${below.med`
    display: none;
  `};
`;

const Logo = ({ layered }) => {
  const logoPath = layered
    ? '/svgs/THATConference-white.svg'
    : '/svgs/THATConference.svg';
  return <StyledLogo src={logoPath} alt="THAT Conference" />;
};

const MenuIcon = styled.div`
  margin: 1em;
  display: inline-block;
  vertical-align: middle;
  width: 3em;
  position: absolute;
  top: 9rem;

  &:hover {
    cursor: pointer;
  }

  ${below.med`
    right: 5rem;
  `};

  ${below.xsmall`
    right: 0;
  `};

  ${above.med`
    display: none;
  `};

  ${below.small`
    right: 0;
  `};

  &:after,
  &:before,
  div {
    background-color: ${({ color, theme }) => color || theme.colors.thatBlue};
    border-radius: 0.3rem;
    content: '';
    display: block;
    height: 0.6rem;
    margin: 0.65rem 0;
    transition: all 0.3s ease-in-out;
  }

  &.open:before {
    transform: translateY(12px) rotate(135deg);
  }

  &.open:after {
    transform: translateY(-12px) rotate(-135deg);
  }

  &.open div {
    transform: scale(0);
  }
`;

const HeaderLogo = ({ layered }) => {
  const clickTracking = () => {
    gtag.event({
      clientWindow: window,
      action: 'click',
      category: 'header',
      label: 'logo',
    });
  };

  const theRouter = useRouter();
  if (theRouter.route === '/wi' || theRouter.route === '/tx') {
    return <Logo layered={layered} />;
  }
  return (
    <LogoLink href="/wi" onClick={clickTracking}>
      <Logo layered={layered} />
    </LogoLink>
  );
};

const Header = ({
  className,
  layered,
  user,
  loading,
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  const {
    loading: eventLoading,
    error: eventError,
    data: eventData,
  } = useQuery(GET_EVENT, {
    variables: { eventId: process.env.CURRENT_EVENT_ID },
  });

  if (eventLoading) return null;
  if (eventError) return null;

  const { event } = eventData.events;
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setScrollY(window.pageYOffset);

    const handleScroll = () => {
      setScrollY(window.pageYOffset);
    };

    handleScroll();
    document.addEventListener('scroll', handleScroll);

    return () => document.removeEventListener('scroll', handleScroll);
  });

  const scrolled = () => {
    return parseInt(scrollY) > 0 ? 'scrolled' : '';
  };

  return (
    <header className={[className, scrolled()].join(' ')}>
      <MessageBar
        user={user}
        loading={loading}
        notifications={event.get.notifications}
      />
      <HeaderSection backgroundColor="transparent">
        <PageHeader>
          <HeaderLogo layered={layered} />
          <Nav
            mobileMenuOpen={mobileMenuOpen}
            onClick={setTo => setMobileMenuOpen(setTo)}
            color={layered ? 'white' : ''}
          />
          <MemberNav
            mobileMenuOpen={mobileMenuOpen}
            onClick={setTo => setMobileMenuOpen(setTo)}
            user={user}
            loading={loading}
            color={layered ? 'white' : ''}
          />
          <div style={{ display: 'flex' }}>
            <ActionButton
              href="#newsletter"
              label="Join Our Mailing List"
              borderColor="thatBlue"
              color="white"
            />
          </div>
          <MenuIcon
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={mobileMenuOpen ? 'open' : ''}
            color={layered ? 'white' : ''}
          >
            <div />
          </MenuIcon>
        </PageHeader>
      </HeaderSection>
    </header>
  );
};

export default styled(Header)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 0 2rem 0;
  background-color: transparent;
  z-index: 1;
  width: 100vw;

  position: ${({ layered }) => (layered ? 'absolute' : 'relative')};

  &::before {
    content: '';
    background-color: ${({ theme }) => theme.colors.backgroundColor};
    transition: all 0.3s;
    transform: translateY(-100%);
    z-index: -1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    position: absolute;
  }
`;
