import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { above, below } from '../../utilities';
import HeroContainer from '../shared/HeroContainer';
import YouTubeVideo from '../shared/YouTubeVideo';

const TitleBlock = styled.div`
  position: absolute;
  top: 3rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const HeadingBlock = styled.div``;

const StyledH1 = styled.h1`
  font-size: 10rem;

  ${above.large`
    font-size: 15rem;
  `}

  ${below.xsmall`
    font-size: 8rem;
  `};
`;

const ResponsiveYouTube = styled(YouTubeVideo)`
  width: 100%;
  min-height: 40rem;

  ${below.larger`
    min-width: 50rem;
    min-height: 35rem;
    display: inline-grid;
    max-width: 55rem;
    margin: auto;
  `};

  ${below.med`
    min-width: 40rem;
    max-width: 45rem;
    min-height: 30rem;
  `};

  ${below.small`
    min-width: 40rem;
    min-height: 50rem;
  `};
`;

const twoColBp = 'larger';

const Main = styled.div`
  display: flex;
  flex-direction: row;
  //margin: auto;
  justify-content: center;

  ${below[twoColBp]`
    flex-direction: column;
  `};
`;

const VIDEO_ID = 'R67gLABGvVE';

const Hero = ({ className, event }) => {
  // temporary
  event.theme.heroSlug = 'landing_hero.jpg';
  return (
    <HeroContainer
      className={className}
      imageSource={`/images/${event.theme.heroSlug}`}
      imageAlt={event.name}
    >
      <TitleBlock>
        <HeadingBlock>
          <StyledH1 className="font-light">{event.slogan}</StyledH1>
        </HeadingBlock>
        <Main>
          <ResponsiveYouTube
            videoId={VIDEO_ID}
            autoplay={0}
            rel={0}
            modest={1}
            containerHeight="40rem"
            containerWidth="100%"
          />
        </Main>
      </TitleBlock>
    </HeroContainer>
  );
};

Hero.propTypes = {
  className: PropTypes.string,
  event: PropTypes.shape({}).isRequired,
};

Hero.defaultProps = {
  className: '',
};

export default styled(Hero)``;
