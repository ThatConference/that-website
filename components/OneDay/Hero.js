import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { above, below } from '../../utilities';
import HeroContainer from '../shared/HeroContainer';
import YouTubeVideo from '../shared/YouTubeVideo';
import LinkButton from '../shared/LinkButton';

const VIDEO_ID = 'R67gLABGvVE';

const ContentContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
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

const StyledParagraph = styled.p`
  align-self: flex-end;
  text-align: justify;
  max-width: 80rem;
  height: auto;
  padding-bottom: 1rem;
  padding-left: 3rem;
  padding-right: 3rem;
  margin: 1rem auto;

  ${below.small`
    font-size: 1.6rem;
    padding-bottom: 0;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  `};
`;

const StyledButton = styled(LinkButton)`
  width: 26rem;
  height: 7rem;
  margin-bottom: 3rem;
  align-self: center;
  font-size: 2rem;
  font-weight: 700;
`;

const Hero = ({ className, event }) => {
  // KB: Temporary until event is populated
  // eslint-disable-next-line no-param-reassign
  event.theme.heroSlug = 'landing_hero.jpg';
  return (
    <HeroContainer
      className={className}
      imageSource={`/images/${event.theme.heroSlug}`}
      imageAlt={`${event.name}-${event.slogan}`}
    >
      <ContentContainer>
        <StyledH1 className="font-light">{event.slogan}</StyledH1>
        <ResponsiveYouTube videoId={VIDEO_ID} />
        <StyledParagraph className="font-light large-body-copy">
          {event.description}
        </StyledParagraph>
        <StyledButton
          href="#tickets"
          color="thatBlue"
          backgroundColor="white"
          borderColor="primary"
          hoverBorderColor="primary"
          hoverBackgroundColor="primary"
          hoverColor="white"
          label="Order Tickets!"
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
