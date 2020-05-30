import React from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import YouTubeVideo from '../shared/YouTubeVideo';

import { gridRepeat, below } from '../../utilities';
import ContainerWithBGImageAndLG from './ContainerWithBGImageAndLG';

import ContentSection from '../shared/ContentSection';

const Container = styled.div``;
const Content = styled(ContentSection)`
  text-align: center;

  h1 {
    margin-bottom: 5rem;
  }
`;

const StyledGrid = styled(Grid)`
  ${below.small`
    display: flex;
    flex-direction: column;
  `};
`;

const Title = styled.div`
  font-weight: bold;
  line-height: 1.4;
`;

const Counselor = styled.p`
  margin: 0;
  font-size: 1.3rem;
  margin-bottom: 1rem;
`;

const ResponseiveYouTube = styled(YouTubeVideo)`
  width: 35rem;
  height: 20rem;
  margin: auto;

  ${below.small`
    width: 25rem;
    height: 15rem;
  `};
`;

const YouTube = ({ videoId }) => {
  return (
    <ResponseiveYouTube
      videoId={videoId}
      autoplay={0}
      rel={0}
      modest={1}
      containerHeight="35rem"
      containerWidth="20rem"
    />
  );
};

const Keynotes = ({ className }) => {
  return (
    <Container className={className}>
      <ContainerWithBGImageAndLG
        height={5.7}
        image="./images/root_join_conversation.jpg"
      />
      <Content>
        <h1>Past Keynotes</h1>
        <StyledGrid columns={gridRepeat.small} alignContent="center">
          <Cell>
            <YouTube videoId="Lp-Xqj8wSMg" />
            <Title>The History of Opera and the Future of Programming</Title>
            <Counselor>Jessica Kerr</Counselor>
          </Cell>
          <Cell>
            <YouTube videoId="Nks_Fb5TUjs" />
            <Title>The 7 Pillar Developer</Title>
            <Counselor>Cory House</Counselor>
          </Cell>
          <Cell>
            <YouTube videoId="cU2q7SxE9Vw" />
            <Title>Adventure as a Career Plan</Title>
            <Counselor>Jason Lengstorf</Counselor>
          </Cell>
        </StyledGrid>
      </Content>
    </Container>
  );
};

export default styled(Keynotes)``;
