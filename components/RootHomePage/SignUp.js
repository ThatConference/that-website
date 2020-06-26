import React from 'react';
import styled from 'styled-components';
import ContentSection from '../shared/ContentSection';
import Icon from '../shared/Icon';
import NewsletterSignupForm from '../shared/NewsletterSignupForm';
import LinkButton from '../shared/LinkButton/LinkButton';
import { below } from '../../utilities';

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  ${below.large`
    flex-direction: column;
  `}
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${below.large`
    width: auto;
  `}
`;

const ConversationSection = styled(Section)`
  width: 40%;

  h3 {
    margin-bottom: 0;
    margin-top: 0;
  }
`;

const SlackButton = styled(LinkButton)`
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
`;

const NewsletterSection = styled(Section)`
  width: 40%;

  form {
    min-width: 35rem;
  }

  h3 {
    margin-bottom: 2rem;
    color: ${({ theme }) => theme.colors.fonts.light};
    text-align: center;
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

const TreeSection = styled(Section)`
  width: 20%;

  ${below.large`
    margin: 5rem 0;
  `}
`;

const TreeIcon = styled(Icon)`
  fill: ${({ theme }) => theme.colors.white};
  margin: auto;
  width: 20rem;
  height: 10rem;
`;

const SignUp = ({ className }) => {
  return (
    <ContentSection
      className={className}
      backgroundColor="thatBlue"
      backgroundOpacity={0.82}
      backgroundImage="/images/group.jpg"
    >
      <Main>
        <ConversationSection>
          <h3 className="font-light">Join The Conversation</h3>
          <SlackButton
            label="THAT Slack"
            href="https://thatslack.thatconference.com/"
            image="./images/Slack_Mark.svg"
          />
        </ConversationSection>
        <TreeSection>
          <TreeIcon
            icon="thatTrees"
            width="600"
            height="250"
            viewBoxHeight="87"
            viewBoxWidth="200"
          />
        </TreeSection>
        <NewsletterSection>
          <NewsletterSignupForm headerType="h3" title="Stay Up-To Date" />
        </NewsletterSection>
      </Main>
    </ContentSection>
  );
};

export default styled(SignUp)``;
