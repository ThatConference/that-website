import React from 'react';
import styled from 'styled-components';

import ContentSection from '../shared/ContentSection';
import LinkButton from '../shared/LinkButton/LinkButton';

import { below, DEFAULT_WIP_PAGE } from '../../utilities';

const Main = styled(ContentSection)`
  margin-bottom: 15rem;

  ${below.med`
    margin-bottom: 0;
  `};
`;

const TalkIdeasText = styled.div`
  max-width: 90rem;
  margin: auto;
  text-align: center;
  font-size: 2.8rem;
  color: ${({ theme }) => theme.colors.fonts.dark};
  line-height: 1.6;
  margin-bottom: 1.5rem;

  ${below.med`
    font-size: 2rem;
  `};
`;

const TalkIdeasButtons = styled.div`
  text-align: center;

  a:first-child {
    margin-right: 2rem;

    ${below.small`
        margin-right: 0;
      `};
  }
`;

const TalkIdeasButton = styled(LinkButton)`
  text-align: center;
  display: inline-block;
`;

const TalkIdeas = () => {
  return (
    <Main>
      <TalkIdeasText>
        Looking for talk or workshop ideas? Check out these lists of previously
        accepted Sessions and Workshops!
      </TalkIdeasText>
      <TalkIdeasButtons>
        <TalkIdeasButton
          href={`/${DEFAULT_WIP_PAGE}`}
          borderColor="thatBlue"
          color="thatBlue"
          backgroundColor="white"
          label="Past Sessions"
          hoverBorderColor="thatBlue"
          hoverColor="white"
          hoverBackgroundColor="thatBlue"
        />
        <TalkIdeasButton
          href={`/${DEFAULT_WIP_PAGE}`}
          borderColor="thatBlue"
          color="thatBlue"
          backgroundColor="white"
          label="Past Workshops"
          hoverBorderColor="thatBlue"
          hoverColor="white"
          hoverBackgroundColor="thatBlue"
        />
      </TalkIdeasButtons>
    </Main>
  );
};

export default TalkIdeas;
