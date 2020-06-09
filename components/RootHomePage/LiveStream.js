import React from 'react';
import styled from 'styled-components';
import loadable from '@loadable/component';
import ContentSection from '../shared/ContentSection';
import LinkButton from '../shared/LinkButton';
import { above, below } from '../../utilities';

const ReactTwitchEmbedVideo = loadable(
  () => import('react-twitch-embed-video'),
  { ssr: false },
);

const twoColBp = 'larger';

const Main = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
  justify-content: center;

  ${below[twoColBp]`
    flex-direction: column;
  `};
`;

const SideDetail = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 2;

  ${above[twoColBp]`
    margin-right: 4rem;
  `};

  ${below[twoColBp]`
    align-items: center;
  `};
`;

const VideoBlock = styled.div`
  min-width: 90rem;
  max-height: 55rem;
  padding-top: 4rem;
  padding-bottom: 1rem;

  ${below[twoColBp]`
    min-width: 80%;
    height: 50rem;
  `};
`;

const StyledH3 = styled.h3`
  color: ${({ theme }) => theme.colors.fonts.light};
  margin: 3rem 0;
`;

const Links = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;

  li {
    float: left;
    color: ${({ theme }) => theme.colors.fonts.light};

    &:first-child {
      padding-right: 4rem;

      ${below.xsmall`
        padding-right: 0;
      `};
    }
  }
`;

const LiveStream = ({ className }) => {
  return (
    <ContentSection
      className={className}
      backgroundColor="thatBlue"
      backgroundOpacity={0.82}
      backgroundImage="/images/group.jpg"
    >
      <Main>
        <SideDetail>
          <StyledH3>
            We're Live Every
            <br /> Monday & Wednesday
          </StyledH3>
          <p className="font-light">
            Broadcasting every Monday and Wednesday, THAT.live is, well, live!
            Over on our Twitch channel, community members collaborate with host
            Clark Sell and share their knowledge and best practices for all
            things technology and not technology. We invite you to watch and
            listen in. Viewers with a Twitch account are encouraged to become
            part of the broadcast by commenting and asking questions in real
            time using the chat feature. Miss a broadcast? Past live stream
            videos are available to watch too!
          </p>
          <Links>
            <li>
              <LinkButton label="Watch THAT.live" href="http://that.live" />
            </li>
          </Links>
        </SideDetail>

        <VideoBlock>
          <ReactTwitchEmbedVideo
            channel="thatconference"
            width="100%"
            height="100%"
          />
        </VideoBlock>
      </Main>
    </ContentSection>
  );
};

export default styled(LiveStream)``;
