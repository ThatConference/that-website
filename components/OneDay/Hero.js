import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { above, below } from '../../utilities';
import HeroContainer from '../shared/HeroContainer';
import YouTubeVideo from '../shared/YouTubeVideo';
import ContentSection from '../shared/ContentSection';
import LinkButton from '../shared/LinkButton';

const VIDEO_ID = 'R67gLABGvVE';

const ContentContainer = styled.div`
  position: absolute;
  top: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
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
  height: 50vh;
  width: 90vw;
  max-height: 30rem;
  max-width: 60rem;
  margin: auto;

  ${below.small`
   max-height: 25vh;
  `};
`;

const Main = styled(ContentSection)`
  background: unset;
  background-color: transparent;
  margin: auto;
  padding-top: 0;
`;

const StyledParagraph = styled.p`
  align-self: flex-end;
  text-align: justify;
  max-width: 60rem;
  height: auto;
  padding-bottom: 2rem;
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
  height: 6rem;
  margin: 0;
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
        <Main>
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
        </Main>
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
