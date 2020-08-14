import React from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';

import ContentSection from '../shared/ContentSection';
import LinkButton from '../shared/LinkButton/LinkButton';
import YouTubeVideo from '../shared/YouTubeVideo/YouTubeVideo';

import { SlimCenteredH2 } from '../shared/StandardStyles';
import { gridRepeat, below } from '../../utilities';

const VideosGrid = styled(Grid)`
  ${below.xsmall`
    display: block;

  `};
`;

const VideoCell = styled(Cell)`
  width: 39rem;
  margin: auto;
  text-align: center;

  ${below.xsmall`
    width: 30rem;
    margin-bottom: 2rem;
  `};
`;

const Title = styled.p`
  line-height: 1.4;
  margin-bottom: 0.5rem;
`;

const Counselor = styled.p`
  margin: 0;
  font-size: 1.3rem;
`;

const ResponsiveYouTube = styled(YouTubeVideo)`
  height: 20rem;
`;

const FlexCenteredContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const PaddedLinkButton = styled(LinkButton)`
  margin-top: 6rem;

  ${below.small`
    margin-left: 0;
  `};
`;

const Keynotes = ({ className }) => {
  return (
    // TO DO - mobile width is off
    <ContentSection className={className}>
      <SlimCenteredH2>Past Keynotes</SlimCenteredH2>
      <VideosGrid columns={gridRepeat.small} alignContent="center">
        <VideoCell>
          <ResponsiveYouTube videoId="gwFbwzKHtiw" />
          <Title className="bold">
            Remember where we've been. Look to where we're going!
          </Title>
          <Counselor>Clark Sell</Counselor>
        </VideoCell>
        <VideoCell center>
          <ResponsiveYouTube videoId="5K1Jdz0onX8" />
          <Title className="bold">Intentionally creating balance.</Title>
          <Counselor>
            Clark Sell, Cassie Breviu, April Monique, Rachel Krause, Jill
            Hauwiller, Caroline Sober-James, Jaimee Newberry, Denise Jacobs,
            Sara Gibbons
          </Counselor>
        </VideoCell>
        <VideoCell>
          <ResponsiveYouTube videoId="Lp-Xqj8wSMg" />
          <Title className="bold">
            The History of Opera and the Future of Programming
          </Title>
          <Counselor>Jessica Kerr</Counselor>
        </VideoCell>
      </VideosGrid>

      <FlexCenteredContainer>
        <PaddedLinkButton
          href="http://youtube.com/thatconference/"
          label="See More on THAT YouTube"
          target="_blank"
          rel="noopener"
          backgroundColor="primary"
          borderColor="white"
          color="white"
          hoverBorderColor="primary"
          hoverColor="primary"
          hoverBackgroundColor="white"
        />
      </FlexCenteredContainer>
    </ContentSection>
  );
};

export default styled(Keynotes)``;
