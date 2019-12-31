import router, { useRouter } from 'next/router';
import nprogress from 'nprogress';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as gtag from '../../lib/gtag';

import MessageBar from './MessageBar';
import Nav from './Nav';
import ContentSection from '../shared/ContentSection';
import LinkButton from '../shared/LinkButton';
import { above, below } from '../../utilities';
import MemberNav from './MemberNav';

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

const Logo = () => {
  return <StyledLogo src="/svgs/THATConference.svg" alt="THAT Conference" />;
};

const MenuIcon = styled.div`
  margin: 1em;
  display: inline-block;
  vertical-align: middle;
  width: 3em;
  position: absolute;
  right: 5rem;
  top: 9rem;

  &:hover {
    cursor: pointer;
  }

  ${above.med`
    display: none;
  `};

  &:after,
  &:before,
  div {
    background-color: ${({ theme }) => theme.colors.thatBlue};
    border-radius: 0.3rem;
    content: '';
    display: block;
    height: 0.6rem;
    margin: 0.7rem 0;
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

const HeaderLogo = () => {
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
    return <Logo />;
  }
  return (
    <LogoLink href="/wi" onClick={clickTracking}>
      <Logo />
    </LogoLink>
  );
};

const Header = ({ className, user }) => {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      <MessageBar />
      <HeaderSection>
        <PageHeader>
          <HeaderLogo />
          <Nav
            mobileMenuOpen={mobileMenuOpen}
            onClick={setTo => setMobileMenuOpen(setTo)}
          />
          <MemberNav
            mobileMenuOpen={mobileMenuOpen}
            onClick={setTo => setMobileMenuOpen(setTo)}
            user={user.user}
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
          >
            <div />
          </MenuIcon>
        </PageHeader>
      </HeaderSection>
    </header>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(styled(Header)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 0 2rem 0;
  background-color: transparent;
  z-index: 1;
  width: 100vw;

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
`);
