import styled from 'styled-components';
import React, { Component } from 'react';
import { Grid, Cell } from 'styled-css-grid';
import { above, below, siteInfo } from '../../utilities';
import PageFooter from './PageFooter';

const FooterNav = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 2;
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

const NavLink = styled.a`
  margin: 0;
  color: ${({ theme }) => theme.colors.fonts.dark};
  font-size: 1.2rem;
  line-height: 1.8rem;

  &:hover {
    color: ${({ theme }) => theme.colors.highlight};
  }
`;

// const Footer = ({ className }) => {

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
        <div className={this.props.className}>
          <img src="/svgs/THATConference-WI-2020.svg" />
          <FooterNav>
            <FooterNavColumn>
              <Title>Links</Title>
              <NavLink href="/">Schedule</NavLink>
              <NavLink href="/">Become a Partner</NavLink>
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
  width: 100%;
  align-items: center;
  padding: 0 2rem;
`;
