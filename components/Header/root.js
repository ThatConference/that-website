import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import styled from 'styled-components';
import Link from 'next/link';
import Icon from '../shared/Icon';
import ThatLink from '../shared/ThatLink';
import { below } from '../../utilities';
import SecondaryMemberNav from './SecondaryMemberNav';

const StyledIcon = styled(Icon)`
  fill: ${({ theme }) => theme.colors.white};
  padding: 1rem 2rem;
  height: 8rem;
  align-self: center;
  &:hover {
    cursor: pointer;
  }

  ${below.small`    
    height: 7rem;
  `};
`;

const Member = styled.div`
  background-color: ${({ theme }) => theme.colors.dark};
  display: flex;
  align-items: center;
`;

const Greeting = styled.p`
  color: ${({ theme }) => theme.colors.fonts.light};
  padding: 0 2rem;
  margin: 0;

  ${below.small`
    display: none;
  `};
`;

const RootNav = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  position: relative;
`;

const NavIcon = styled(Icon)`
  fill: ${({ theme }) => theme.colors.white};
  width: 5rem;
  padding: 0 1rem;
  cursor: pointer;
`;

const StyledSecondaryNav = styled(SecondaryMemberNav)`
  display: ${({ navOpen }) => (navOpen ? 'block' : 'none')};
  background-color: ${({ theme }) => theme.colors.thatBlue};
  position: absolute;

  padding: 2rem;
  margin: 0;
  top: 10rem;
  width: 100%;
  z-index: 100;

  padding-right: 3rem;

  &.on {
    overflow: hidden;
    transition: all 0.5s ease;
    will-change: transform;
    border: 1px solid gray;
  }

  &.off {
    overflow: hidden;
    max-height: 0;
    padding-top: 0;
    padding-bottom: 0;
    margin-top: 0;
    margin-bottom: 0;
    transition: all 0.5s ease;
    will-change: transform;
  }
`;

const RootHeader = ({ className, loading, user }) => {
  const [navOpen, setNavOpen] = useState(false);

  const greeting = () => {
    if (user.firstName) {
      return `Hi ${user.firstName}!`;
    }
    return 'Heyo Camper!';
  };

  return (
    <header className={className}>
      <Link href="/" prefetch={false}>
        <StyledIcon
          icon="thatLogo"
          width="250"
          height="50"
          viewBoxWidth="400"
        />
      </Link>
      <div style={{ flexGrow: 2 }} />

      <Member>
        {!loading && !isEmpty(user) && <Greeting>{`${greeting()}`}</Greeting>}
        {!loading && isEmpty(user) && (
          <Greeting>
            <ThatLink title="Sign In" href="/api/login" color="white" />
          </Greeting>
        )}
      </Member>
      <RootNav>
        <NavIcon
          icon="arrow"
          className={navOpen ? 'up' : 'down'}
          onClick={() => setNavOpen(!navOpen)}
        />
      </RootNav>
      <StyledSecondaryNav
        user={user}
        onLinkClick={() => setNavOpen(false)}
        navOpen={navOpen}
      />
    </header>
  );
};

RootHeader.propTypes = {
  className: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.shape({}),
};
RootHeader.defaultProps = {
  className: '',
  user: {},
};

export default styled(RootHeader)`
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  height: 10rem;
`;
