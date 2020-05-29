import React from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import ContentSection from '../shared/ContentSection';
import ContainerWithBGImageAndLG from './ContainerWithBGImageAndLG';
import NewsletterSignupForm from '../shared/NewsletterSignupForm';
import LinkButton from '../shared/LinkButton';
import { gridRepeat } from '../../utilities';

const Container = styled(ContainerWithBGImageAndLG)`
  padding: 5rem 10rem;
`;

const Content = styled(ContentSection)`
  background-color: transparent;
`;

const Section = styled(Cell)`
  padding: 2rem;
  h3 {
    color: ${({ theme }) => theme.colors.fonts.light};
  }
`;

const ConversationSection = styled(Section)`
  h3 {
    margin-bottom: 0;
    margin-top: 0;
  }

  .slack-button {
    width: 25rem;
    height: 4.4rem;
    margin-right: auto;
    margin-left: auto;

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
  }
`;

const TreeSection = styled(Cell)`
  margin: auto;
`;

const Trees = styled.img`
  width: 31.1rem;
  vertical-align: middle;
`;

const NewsletterSection = styled(Section)`
  h3 {
    margin-bottom: 2rem;
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

const SignUp = ({ className }) => {
  return (
    <Container
      height={42.1}
      image="./images/root_join_conversation.jpg"
      className={className}
    >
      <Content>
        <Grid columns={gridRepeat.small} alignContent="center">
          <ConversationSection middle center>
            <h3>Join The Conversation</h3>
            <LinkButton
              className="slack-button"
              label="THAT Slack"
              href="https://wwww.thatslack.slack.com"
              image="./images/Slack_Mark.svg"
            />
          </ConversationSection>
          <TreeSection middle center>
            <Trees src="./images/that_trees_white.png" alt="THAT Conference" />
          </TreeSection>
          <NewsletterSection middle center>
            <NewsletterSignupForm headerType="h3" title="Stay Up-To Date" />
          </NewsletterSection>
        </Grid>
      </Content>
    </Container>
  );
};

export default styled(SignUp)``;
