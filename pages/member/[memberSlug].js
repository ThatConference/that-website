// import styled from 'styled-components';
import React from 'react';
import { connect } from 'react-redux';
import { Grid, Cell } from 'styled-css-grid';
import styled from 'styled-components';
import Markdown from 'markdown-to-jsx';
import { useFetchUser } from '../../lib/user';
import { below } from '../../utilities';
import ContentSection from '../../components/shared/ContentSection';
// import { gridRepeat } from '../../utilities';
import RoundImage from '../../components/shared/RoundImage';

const StyledGrid = styled(Grid)`
  grid-gap: 2.5rem;

  ${below.med`
    grid-gap: 0;
  `};
`;

const MemberInfoCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  grid-column: span 2;
`;

const Name = styled.h2`
  text-transform: uppercase;
  font-size: 4.5rem;
  color: ${({ theme }) => theme.colors.fonts.dark};
  margin-bottom: 0.2rem;
`;

const Title = styled.p`
  font-weight: 800;
  font-size: ${({ fontSize }) => fontSize};
  margin: 0;
`;

const Company = styled.p`
  font-weight: 400;
  font-size: ${({ fontSize }) => fontSize};
  margin: 0;
`;

const SectionTitle = styled.p`
  font-size: 3rem;
  margin-top: 0;
`;

const home = ({ user: reduxUser, dispatch }) => {
  console.log('reduxUser', reduxUser);

  let user = reduxUser;

  if (!user) {
    console.log('loading user, no redux');
    const { cookieUser, loading } = useFetchUser();
    if (!loading) {
      dispatch({ type: 'USER', payload: cookieUser });
      user = cookieUser;
    }
  }

  if (!user) {
    return <a href="/api/login">Sign In</a>;
  }

  const bio =
    'Sometimes chef, full-time mom, but 100% geek, Sara Gibbons spent her youth building Legos, solving puzzles, and playing video games. Little did she know it was priming her for an amazing Software Engineering career.<br/><br/>Sara spent two years studying Actuarial Science before a friend convinced her to take a C++ class to help him pass. By the end of the semester she&apos;d switched her major and was getting ready for her first internship. Born and raised in the Motor City, Sara quickly worked up the ranks in the software world running large automotive companies.<br/><br/>Soon Sara left that behind for the chance to work within the start-up scene and challenged herself to work across many projects, disciplines, and experience working with teams across the country of all sizes and makeups.<br/><br/>Outside of work you can find Sara leading a Girls Who Code club, volunteer teaching Computer Science at the nearby high school and working with many non-profit groups to increase diversity in technology fields.<br/><br/>When not working or volunteering she&apos;s building Legos all over again with her four beautiful children and man-child husband.';
  const lifeHack =
    'I’m not a small talk kinda girl. I crave soul nourishing conversation and connection. I want to talk about uncomfortably big dreams, interesting concepts and new ideas. I want to know what lights you up or drives you crazy. I want to challenge you and make you think bigger. So, let’s skip the small talk?';
  const interests = ['React', 'Graph', 'Being Awesome', 'Ruby'];
  // const links = [{}];

  return (
    <ContentSection>
      {/* <Grid>
        <Cell width={12}> */}
      <StyledGrid columns="repeat(auto-fit,minmax(12rem,1fr))">
        <MemberInfoCell>
          <RoundImage
            imageUrl={user.picture}
            size="250"
            showAccentLine={false}
          />
          <Name>{`${user.given_name} ${user.family_name}`}</Name>
          <Title>Bringer of Queen Bey</Title>
          <Company>Unspecified</Company>
        </MemberInfoCell>
        <Cell style={{ gridColumn: 'span 4' }}>
          <SectionTitle>{`About ${user.given_name}`}</SectionTitle>
          <Markdown>{bio}</Markdown>
          <SectionTitle>Life Hack</SectionTitle>
          <p>{lifeHack}</p>
        </Cell>
        <Cell style={{ gridColumn: 'span 1' }}>
          <SectionTitle>Interests</SectionTitle>
          {interests && (
            <ul>
              {interests.map(item => {
                return <li>{item}</li>;
              })}
            </ul>
          )}
        </Cell>
      </StyledGrid>
      {/* </Cell>
      </Grid> */}
    </ContentSection>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

home.getInitialProps = async context => {
  const slug = context.query.memberSlug;

  return { slug };
};

export default connect(mapStateToProps)(home);
