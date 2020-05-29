import React from 'react';
import styled from 'styled-components';
import loadable from '@loadable/component';
import ContentSection from '../shared/ContentSection';
import ThatLink from '../shared/ThatLink';
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
          <StyledH3>We're Going Live</StyledH3>
          <p className="font-light bold">Livestream Title</p>
          <p className="font-light">
            Livestream Title Donec vehicula id sapien vel dapibus. Nulla a odio
            diam. Nunc vel odio ex. Etiam dictum mollis placerat. Pellentesque
            vel posuere velit. Aliquam accumsan felis orci, a hendrerit est
            placerat nec. Nulla non magna sit amet dui vulputate rutrum sed
            imperdiet odio. Nullam id rhoncus nibh. Cras ut egestas libero.
            Donec vehicula id sapien vel dapibus. Nulla a odio diam. Nunc vel
            odio ex. Etiam dictum mollis placerat. Pellentesque vel posuere
            velit. Aliquam accumsan felis orci, a hendrerit est placerat nec.
            Nulla non magna sit amet dui vulputate rutrum sed imperdiet odio.
          </p>
          <Links>
            <li>
              <ThatLink title="Video Link" href="#" color="white" />
            </li>
            <li>
              <ThatLink title="Podcast Link" href="#" color="white" />
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
