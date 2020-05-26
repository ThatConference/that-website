import React from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import YouTube from 'react-youtube';

import { gridRepeat } from '../../utilities';
import ContainerWithBGImageAndLG from './ContainerWithBGImageAndLG';

const Container = styled.div``;
const Content = styled.div`
  padding: 10rem;
  text-align: center;

  h1 {
    margin-bottom: 5rem;
  }
`;

const Title = styled.span`
  font-weight: bold;
`;

const Counselor = styled.p`
  margin: 0;
  font-size: 1.3rem;
`;

const YouTubeOptions = {
  height: '200',
  width: '357',
  playerVars: {
    autoplay: 0,
  },
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
        <Grid columns={gridRepeat.small} alignContent="center">
          <Cell>
            <YouTube videoId="Lp-Xqj8wSMg" opts={YouTubeOptions} />
            <Title>The History of Opera and the Future of Programming</Title>
            <Counselor>Jessica Kerr</Counselor>
          </Cell>
          <Cell>
            <YouTube videoId="Nks_Fb5TUjs" opts={YouTubeOptions} />
            <Title>The 7 Pillar Developer</Title>
            <Counselor>Cory House</Counselor>
          </Cell>
          <Cell>
            <YouTube videoId="cU2q7SxE9Vw" opts={YouTubeOptions} />
            <Title>Adventure as a Career Plan</Title>
            <Counselor>Jason Lengstorf</Counselor>
          </Cell>
          <Cell>
            <YouTube videoId="wsjqnrwkXqI" opts={YouTubeOptions} />
            <Title>You. Are. Awesome.</Title>
            <Counselor>David Neal</Counselor>
          </Cell>
        </Grid>
      </Content>
    </Container>
  );
};

export default styled(Keynotes)``;
