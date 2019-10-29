import styled from 'styled-components';
import React, { Component } from 'react';
import { Grid, Cell } from 'styled-css-grid';
import { above, below } from '../../utilities';
import PageFooter from './PageFooter';

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

class Footer extends Component {
  componentDidMount() {
    const script = document.createElement('script');

    script.src = 'https://thatconference.activehosted.com/f/embed.php?id=16';
    script.async = true;

    document.body.appendChild(script);
  }

  render() {
    return (
      <>
        <div className={this.props.className} id="newsletter">
          <a href="/">
            <Logo src="/svgs/THATConference.svg" alt="THAT Conference" />
          </a>
          <FooterNav>
            <FooterNavColumn>
              <Title>Links</Title>
              <NavLink href="/">Schedule</NavLink>
              <NavLink href="/wi/become-a-partner">Become a Partner</NavLink>
              <NavLink href="/">Conference Map</NavLink>
              <NavLink href="/">Contact Us</NavLink>
            </FooterNavColumn>
            <FooterNavColumn>
              <Title>Plan Your Trip</Title>
              <NavLink href="/">Important Dates</NavLink>
              <NavLink href="/">Travel Information</NavLink>
              <NavLink href="/">Handbooks</NavLink>
              <NavLink href="/">FAQ</NavLink>
            </FooterNavColumn>
            <FooterNavColumn>
              <Title>Links</Title>
              <NavLink href="/">Terms of Use</NavLink>
              <NavLink href="/">Copyright Policy</NavLink>
              <NavLink href="/">Privacy Policy</NavLink>
              <NavLink href="/">Other Policies</NavLink>
            </FooterNavColumn>
          </FooterNav>
          <div className="_form_16" />
        </div>
        <PageFooter />
      </>
    );
  }
}

export default styled(Footer)`
  display: flex;
  align-items: center;
  padding: 0 2rem;
  min-height: 18rem;

  ${below.med`
    flex-direction: column;
    min-height: 33rem;
  `};
`;
