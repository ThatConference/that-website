import React from 'react';
import PropTypes from 'prop-types';

const YouTubeVideo = ({
  autoplay,
  containerHeight,
  containerWidth,
  modest,
  rel,
  videoId,
}) => {
  const fullUrl = `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay}&rel=${rel}&modestbranding=${modest}`;

  return (
    <div
      className="container"
      style={{ minHeight: containerHeight, minWidth: containerWidth }}
    >
      <iframe
        className="player"
        type="text/html"
        width="100%"
        height="100%"
        src={fullUrl}
        frameBorder="0"
        title="About THAT Conference"
      />
    </div>
  );
};

YouTubeVideo.propTypes = {
  autoplay: PropTypes.number,
  containerHeight: PropTypes.string,
  containerWidth: PropTypes.string,
  modest: PropTypes.number,
  rel: PropTypes.number,
  videoId: PropTypes.string.isRequired,
};

YouTubeVideo.defaultProps = {
  autoplay: 0,
  containerHeight: '30rem',
  containerWidth: '50rem',
  modest: 1,
  rel: 0,
};

export default YouTubeVideo;
