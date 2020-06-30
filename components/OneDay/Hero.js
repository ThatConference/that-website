import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { above, below } from '../../utilities';
import HeroContainer from '../shared/HeroContainer';
import YouTubeVideo from '../shared/YouTubeVideo';
import LinkButton from '../shared/LinkButton/LinkButton';

const VIDEO_ID = 'cAftppcmqRE';

const ContentContainer = styled.div`
  position: absolute;
  top: 6rem;
  height: 80%;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: auto;
`;

const StyledH1 = styled.h1`
  font-size: 10rem;

  ${above.larger`
    font-size: 15rem;
  `}
  ${below.med`
    font-size: 8.5rem;
  `};
  ${below.small`
    font-size: 7rem;
  `};
`;

const ResponsiveYouTube = styled(YouTubeVideo)`
  height: 70%;
  width: 90vw;
  max-height: 40rem;
  max-width: 80rem;
  margin: auto;

  ${below.small`
   max-height: 25vh;
  `};
`;

const StyledButton = styled(LinkButton)`
  width: 60rem;
  height: 10rem;
  margin-bottom: 3rem;
  align-self: center;
  font-size: 3.5rem;
  font-weight: 700;

  // TODO: give it some style for small screens
  ${below.small`
    height: 7rem;
    font-size: 2rem;
    width: 80%;
  `};
`;

const Hero = ({ className, event }) => {
  return (
    <HeroContainer
      className={className}
      // imageSource={`${event.theme.heroSlug}`}
      imageSource="https://images.that.tech/site/open-space-circle.jpg"
    >
      <ContentContainer>
        <StyledH1 className="font-light">{event.name}</StyledH1>
        <ResponsiveYouTube videoId={VIDEO_ID} />
        <StyledButton
          href="#tickets"
          color="thatBlue"
          backgroundColor="white"
          borderColor="primary"
          hoverBorderColor="primary"
          hoverBackgroundColor="primary"
          hoverColor="white"
          label="Reserve Your Ticket Today!"
        />
      </ContentContainer>
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
