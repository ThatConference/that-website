import router from 'next/router';
import nprogress from 'nprogress';
import styled from 'styled-components';
import React, { useEffect, useState, useRef } from 'react';

import MessageBar from './MessageBar';
import Nav from '../Nav';
import ContentSection from '../shared/ContentSection';
import LinkButton from '../shared/LinkButton';

const PageHeader = styled.div`
  margin-top: 1rem;
  height: 10rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Logo = styled.img`
  height: 100%;
`;

const ActionButton = styled(LinkButton)`
  margin: 0;
  background-color: ${({ theme }) => theme.colors.thatBlue};
`;

const HeaderSection = styled(ContentSection)`
  padding-bottom: 0.5rem;
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

const Header = ({ className }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setScrollY(window.pageYOffset);

    const handleScroll = () => {
      setScrollY(window.pageYOffset);
    };
    const { scrollingElement } = document;

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
          <Logo src="/svgs/THATConference-WI-2020.svg" />
          {/* <Nav /> */}
          <div style={{ flexGrow: 2 }} />
          <div>
            <ActionButton
              href="/"
              label="Join Our Mailing List"
              borderColor="thatBlue"
              color="white"
            />
          </div>
        </PageHeader>
      </HeaderSection>
    </header>
  );
};

export default styled(Header)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0;
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
`;
