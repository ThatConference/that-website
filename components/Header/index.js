import router from 'next/router';
import nprogress from 'nprogress';
import styled from 'styled-components';
import React, { useEffect, useState, useRef } from 'react';

import MessageBar from './MessageBar';
import Nav from '../Nav';

const PageHeader = styled.div`
  width: 100%;
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
      <PageHeader>
        <p>new logo</p>
        <Nav />
      </PageHeader>
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

  &.scrolled {
    a {
      color: ${({ theme }) => theme.colors.dark};
      svg {
        fill: ${({ theme }) => theme.colors.dark};
      }

      &:hover {
        color: ${({ theme }) => theme.colors.primary};
      }
    }

    &::before {
      transform: translateY(0) !important;
    }
  }
`;
