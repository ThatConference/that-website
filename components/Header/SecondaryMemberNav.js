import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Grid, Cell } from 'styled-css-grid';
import { below } from '../../utilities';
import ThatLink from '../shared/ThatLink';
import NewsletterSignupForm from '../shared/NewsletterSignupForm';
import LinkButton from '../shared/LinkButton/LinkButton';
import SocialLinks from '../shared/SocialLinks';
import Icon from '../shared/Icon';

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem;
  ${below.large`
    width: auto;
  `}
`;

const NewsletterSection = styled(Section)`
  margin-left: auto;
  a form {
    min-width: 35rem;
  }

  h3 {
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.white};
    text-align: center;
    text-transform: uppercase;
  }

  p {
    color: ${({ theme }) => theme.colors.fonts.light};
  }

  button {
    background-color: ${({ theme }) => theme.colors.backgroundColor};

    svg {
      fill: ${({ theme }) => theme.colors.primary};

      &:hover {
        fill: ${({ theme }) => theme.colors.fonts.light};
      }
    }
  }
`;

const LinkGroup = styled.div`
  text-align: left;

  margin: 2rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  h3 {
    margin-top: 0;
    margin-bottom: 0;
    color: ${({ theme }) => theme.colors.white};
    text-align: left;
  }

  ul {
    list-style: none;
    padding-left: 0;
    margin-top: 0;
  }
`;

const SlackButton = styled(LinkButton)`
  width: 25rem;
  height: 4.4rem;
  margin-right: auto;
  margin-left: auto;
  margin-top: 0;
  img {
    height: 6rem;
    margin-top: -1rem;
    float: left;
  }

  p {
    margin-top: 0;
    margin-right: 1rem;
    font-size: 2rem;
  }
`;

const HeaderGrid = styled(Grid)`
  grid-template-columns: repeat(4, 1fr);
  grid-template-areas:
    '. . . community'
    '. . . community';

  ${below.large`
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas:
    '. . community'
    '. . community'
    '. . community';

  `}

  ${below.med`
  grid-template-columns: repeat(2,1fr);
  grid-template-areas:
    '. community'
    '. community'
    '. community'
    '. community'
    '. community'
    '. community';
  `}

  ${below.small`
  grid-template-columns: repeat(1,1fr);
  grid-template-areas:
    '.'
    '.'
    '.'
    '.'
    '.'
    '.'
    '.'
    'community';
    
  `}
`;

const NavFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1f2a63;
  padding: 2rem;
  width: 100vw;
  margin: 0 0 -2rem -2rem;
`;

const TreeIcon = styled(Icon)`
  fill: ${({ theme }) => theme.colors.white};
  margin: 0;
  width: 10rem;
  height: 5rem;
`;

const StyledLink = styled(ThatLink)`
  color: ${({ theme }) => theme.colors.white};
  font-size: 2rem;
`;

const SecondaryMemberNav = ({ className, onLinkClick, user }) => {
  return (
    <div className={className}>
      <HeaderGrid>
        <Cell>
          <LinkGroup>
            <h3>WI 2021</h3>
            <ul>
              <li>
                <StyledLink
                  title="Partners"
                  href="/wi/2021/partners"
                  onClick={() => onLinkClick()}
                />
              </li>
              <li>
                <StyledLink
                  title="Become a Partner"
                  href="/wi/2021/become-a-partner"
                  onClick={() => onLinkClick()}
                />
              </li>
              <li>
                <StyledLink
                  title="Tickets"
                  href="/wi/2021/tickets"
                  onClick={() => onLinkClick()}
                />
              </li>
              <li>
                <StyledLink
                  title="Plan Your Trip"
                  href="/wi/2021/plan-your-trip"
                  onClick={() => onLinkClick()}
                />
              </li>
              <li>
                <StyledLink
                  title="Important Dates"
                  href="/wi/2021/important-dates"
                  onClick={() => onLinkClick()}
                />
              </li>
              <li>
                <StyledLink
                  title="Jobs"
                  href="/wi/2021/jobs"
                  onClick={() => onLinkClick()}
                />
              </li>
            </ul>
          </LinkGroup>
        </Cell>
        <Cell>
          <LinkGroup>
            <h3>That</h3>
            <ul>
              <li>
                <StyledLink
                  title="About"
                  href="/about"
                  onClick={() => onLinkClick()}
                />
              </li>
              <li>
                <StyledLink
                  title="Blog"
                  href="/blog"
                  onClick={() => onLinkClick()}
                />
              </li>
              <li>
                <StyledLink
                  title="Contact"
                  href="/contact"
                  onClick={() => onLinkClick()}
                />
              </li>
              <li>
                <StyledLink
                  title="Partners"
                  href="/partners"
                  onClick={() => onLinkClick()}
                />
              </li>
            </ul>
          </LinkGroup>
        </Cell>
        <Cell>
          <LinkGroup>
            <h3>Resources</h3>
            <ul>
              <li>
                <StyledLink
                  title="FAQ"
                  href="/wi/2021/faq"
                  onClick={() => onLinkClick()}
                />
              </li>
              <li>
                <StyledLink
                  title="Attendee Handbook"
                  href="/wi/2021/attendee-handbook"
                  onClick={() => onLinkClick()}
                />
              </li>
              <li>
                <StyledLink
                  title="Counselor Handbook"
                  href="/wi/2021/counselor-handbook"
                  onClick={() => onLinkClick()}
                />
              </li>
              <li>
                <StyledLink
                  title="Family Handbook"
                  href="/wi/2021/family-handbook"
                  onClick={() => onLinkClick()}
                />
              </li>
            </ul>
          </LinkGroup>
        </Cell>

        <Cell>
          <LinkGroup>
            <h3>Featured</h3>
            <ul>
              <li>
                <StyledLink href="/thatus/2020" onClick={() => onLinkClick()} />
              </li>
              <li>
                <StyledLink
                  href="/thatus/2021-3"
                  title="THAT Online - March"
                  onClick={() => onLinkClick()}
                />
              </li>
              <li>
                <StyledLink
                  title="THAT WI 2021"
                  href="/wi/2021"
                  onClick={() => onLinkClick()}
                />
              </li>
              <li>
                <StyledLink
                  title="THAT TX 2021"
                  href="/tx/2021"
                  onClick={() => onLinkClick()}
                />
              </li>
            </ul>
          </LinkGroup>
        </Cell>
        <Cell>
          <LinkGroup>
            <h3>Polices</h3>
            <ul>
              <li>
                <StyledLink href="/code-of-conduct" title="Code of Conduct" />
              </li>
              <li>
                <StyledLink
                  title="Anti-Harassment"
                  href="/anti-harassment-policy"
                  onClick={() => onLinkClick()}
                />
              </li>
              <li>
                <StyledLink
                  title="Commitment to Diversity"
                  href="/commitment-to-diversity"
                  onClick={() => onLinkClick()}
                />
              </li>
              <li>
                <StyledLink
                  title="Privacy"
                  href="/privacy-policy"
                  onClick={() => onLinkClick()}
                />
              </li>
              <li>
                <StyledLink
                  title="Terms of Use"
                  href="/terms-of-use"
                  onClick={() => onLinkClick()}
                />
              </li>
              <li>
                <StyledLink
                  title="Copyright"
                  href="/copyright"
                  onClick={() => onLinkClick()}
                />
              </li>
            </ul>
          </LinkGroup>
        </Cell>
        <Cell>
          <LinkGroup>
            <h3>Account</h3>
            <ul>
              <li>
                {!isEmpty(user) && !user.profileComplete && (
                  <StyledLink
                    title="Create Profile"
                    href="/member/create"
                    onClick={() => onLinkClick()}
                  />
                )}
                {!isEmpty(user) && user.profileComplete && (
                  <StyledLink
                    title="My Profile"
                    href={`/member/${user.profileSlug}`}
                    onClick={() => onLinkClick()}
                  />
                )}
              </li>
              {!isEmpty(user) && user.profileComplete && (
                <li>
                  <StyledLink
                    title="My Sessions"
                    href="/member/my-sessions"
                    onClick={() => onLinkClick()}
                  />
                </li>
              )}
              {!isEmpty(user) && (
                <li>
                  <StyledLink
                    title="Log Out"
                    href="/api/logout"
                    onClick={() => onLinkClick()}
                  />
                </li>
              )}
              {isEmpty(user) && (
                <StyledLink
                  title="Sign In"
                  href="/api/login"
                  onClick={() => onLinkClick()}
                />
              )}
            </ul>
          </LinkGroup>
        </Cell>
        <Cell area="community">
          <NewsletterSection>
            <NewsletterSignupForm
              title="Sign-up for our Newsletter"
              headerType="h3"
            />
            <h3>Join the Community</h3>
            <SlackButton
              label="THAT Slack"
              href="https://thatslack.thatconference.com/"
              image="/images/Slack_Mark.svg"
            />
          </NewsletterSection>
        </Cell>
      </HeaderGrid>
      <NavFooter>
        <TreeIcon icon="thatTrees" />
        <SocialLinks />
      </NavFooter>
    </div>
  );
};

SecondaryMemberNav.propTypes = {
  className: PropTypes.string,
  onLinkClick: PropTypes.func,
};

SecondaryMemberNav.defaultProps = {
  className: '',
  onLinkClick: () => {},
};

export default styled(SecondaryMemberNav)``;
