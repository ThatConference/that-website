import React from 'react';
import styled from 'styled-components';

import ContainerWithBGImageAndLG from './ContainerWithBGImageAndLG';
import NewsletterSignupForm from '../shared/NewsletterSignupForm';
import LinkButton from '../shared/LinkButton';

const Container = styled(ContainerWithBGImageAndLG)`
  display: flex;
  flex-direction: row;
  align-content: space-between;
  align-items: center;
  padding: 5rem 10rem;
`;

const Section = styled.div`
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: auto;
  align-self: auto;
  width: 33.33333333%;
  text-align: center;
  display: inline-block;

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
    height: 4.4rem;

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
      <ConversationSection>
        <h3>Join The Conversation</h3>
        <LinkButton
          className="slack-button"
          label="THAT Slack"
          href="https://wwww.thatslack.slack.com"
          image="./images/Slack_Mark.svg"
        />
      </ConversationSection>
      <Section>
        <Trees src="./images/that_trees_white.png" alt="THAT Conference" />
      </Section>
      <NewsletterSection>
        <NewsletterSignupForm headerType="h3" title="Stay Up-To Date" />
      </NewsletterSection>
    </Container>
  );
};

export default styled(SignUp)``;
