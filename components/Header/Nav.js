import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';

import ThatLink from '../shared/ThatLink';
import { below } from '../../utilities';

const NavList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
  align-items: center;

  ${below.med`
    display: ${({ mobileMenuOpen }) => (mobileMenuOpen ? 'flex' : 'none')};
    position: fixed;
    background-color: ${({ theme }) => theme.colors.white};
    flex-direction: column;
    width: 100vw;
    height: calc(100vh - 14rem);
    left: 0;
    top: 18rem;

    a:first-child {
      padding-top: 2rem;
    }
  `};
`;

const NavListItem = styled.div`
  text-align: right;
  padding-right: 2.5rem;
`;

const Nav = ({ className, color, mobileMenuOpen, onClick }) => {
  return (
    <>
      <nav className={className}>
        <NavList mobileMenuOpen={mobileMenuOpen}>
          {/* <NavListItem>
          <ThatLink title="Schedule" href="/" />
          </NavListItem>
          <NavListItem>
            <ThatLink title="Speakers" href="/" />
          </NavListItem> */}
          <NavListItem>
            <ThatLink
              title="Partners"
              href="/wi/partners"
              onClick={() => onClick(false)}
              color={color}
            />
          </NavListItem>
          <NavListItem>
            <ThatLink
              title="Tickets"
              href="/wi/tickets"
              onClick={() => onClick(false)}
              color={color}
            />
          </NavListItem>
          <NavListItem>
            <ThatLink
              title="Plan Your Trip"
              href="/wi/plan-your-trip"
              onClick={() => onClick(false)}
              color={color}
            />
          </NavListItem>
          {/* <NavListItem>
            <ThatLink
              title="Shop"
              href="https://store.unspecified.io/"
              target="blank"
              onClick={() => onClick(false)}
              isLocal={false}
            />
          </NavListItem> */}
          <NavListItem>
            <ThatLink
              title="Blog"
              href="/blog"
              onClick={() => onClick(false)}
              color={color}
            />
          </NavListItem>
          <NavListItem>
            <ThatLink
              title="Contact"
              href="/contact"
              onClick={() => onClick(false)}
              color={color}
            />
          </NavListItem>
          <NavListItem>
            <ThatLink
              title="About"
              href="/about"
              onClick={() => onClick(false)}
              color={color}
            />
          </NavListItem>
        </NavList>
      </nav>
    </>
  );
};

Nav.propTypes = {
  className: PropTypes.string,
  mobileMenuOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

Nav.defaultProps = {
  className: '',
  onClick: () => {},
};

export default styled(Nav)`
  display: flex;
  flex-wrap: no-wrap;
  align-items: center;
  justify-content: space-between;
`;
