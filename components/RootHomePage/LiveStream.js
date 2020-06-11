import React from 'react';
import styled from 'styled-components';
import loadable from '@loadable/component';
import SessionHighlight from '../shared/SessionHighlight';

const ReactTwitchEmbedVideo = loadable(
  () => import('react-twitch-embed-video'),
  { ssr: false },
);

const LiveStream = ({ className }) => {
  const description =
    'Broadcasting every Monday and Wednesday, THAT.Live is, well, live! Over on our Twitch channel, community members collaborate with host Clark Sell and share their knowledge and best practices for all things technology and not technology. We invite you to watch and listen in. Viewers with a Twitch account are encouraged to become part of the broadcast by commenting and asking questions in real time using the chat feature. Miss a broadcast? Past live stream videos are available to watch too!';

  return (
    <SessionHighlight
      subtitle="We're Live Every<br /> Monday & Wednesday"
      description={description}
      linkText="Watch THAT.live"
      linkUrl="http://that.live"
      className={className}
    >
      <ReactTwitchEmbedVideo
        channel="thatconference"
        width="100%"
        height="100%"
      />
    </SessionHighlight>
  );
};

export default styled(LiveStream)``;
