import React from 'react';
import PropTypes from 'prop-types';

const YouTubeVideo = ({ className, autoplay, modest, rel, videoId }) => {
  const fullUrl = `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay}&rel=${rel}&modestbranding=${modest}`;

  return (
    <div className={className}>
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
  className: PropTypes.string,
  modest: PropTypes.number,
  rel: PropTypes.number,
  videoId: PropTypes.string.isRequired,
};

YouTubeVideo.defaultProps = {
  autoplay: 0,
  className: '',
  modest: 1,
  rel: 0,
};

export default YouTubeVideo;
