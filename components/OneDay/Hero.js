import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Hero = ({ className, event }) => {
  return (
    <div className={className}>
      <p>{`this is the one day hero for ${event.name}`}</p>
    </div>
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
