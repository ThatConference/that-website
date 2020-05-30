import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '../shared/Icon';
import SecondaryMemberNav from './SecondaryMemberNav';

import { below } from '../../utilities';

const StyledIcon = styled(Icon)`
  fill: ${({ theme }) => theme.colors.white};
  padding: 1rem 2rem;
  height: 8rem;
`;

const Member = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  align-items: center;
`;

const Greeting = styled.p`
  color: ${({ theme }) => theme.colors.fonts.light};
  padding: 0 2rem;
  margin: 0;
`;

const RootNav = styled.div`
  background-color: ${({ theme }) => theme.colors.darkBlue};
  position: relative;
`;

const NavIcon = styled(Icon)`
  fill: ${({ theme }) => theme.colors.white};
  width: 5rem;
  padding: 0 1rem;

  ${below.small`
      width: 3rem;
      padding: 0;
    `};
`;

const StyledSecondaryNav = styled(SecondaryMemberNav)`
  background-color: ${({ theme }) => theme.colors.white};
  position: absolute;
  list-style: none;
  right: -1rem;
  padding: 2rem;
  margin: 0;
  top: 10rem;
  width: 20rem;
  z-index: 100;
  text-align: right;
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

  return (
    <header className={className}>
      <StyledIcon icon="thatLogo" width="250" height="50" viewBoxWidth="400" />
      <div style={{ flexGrow: 2 }} />

      {!loading && user.firstName && (
        <Member>
          <Greeting>{`Hello, ${user.firstName}`}</Greeting>
        </Member>
      )}
      <RootNav>
        <NavIcon
          icon="arrow"
          className={navOpen ? 'up' : 'down'}
          onClick={() => setNavOpen(!navOpen)}
        />

        {!loading && (
          <StyledSecondaryNav
            user={user}
            onLinkClick={() => setNavOpen(false)}
            navOpen={navOpen}
            className={navOpen === true ? 'on' : 'off'}
          />
        )}
      </RootNav>
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