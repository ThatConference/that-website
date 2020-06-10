import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { above, below } from '../../utilities';
import HeroContainer from '../shared/HeroContainer';
import YouTubeVideo from '../shared/YouTubeVideo';
import ContentSection from '../shared/ContentSection';

const TitleBlock = styled.div`
  position: absolute;
  top: 1rem;
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
  height: 40rem;
  width: 60rem;  
  margin: auto;
`;

const Main = styled(ContentSection)`
  background: unset;
  background-color: transparent;
  margin: auto;
  padding-top: 0;
`;

const VIDEO_ID = 'R67gLABGvVE';

const Hero = ({ className, event }) => {
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
          <ResponsiveYouTube videoId={VIDEO_ID} />
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
