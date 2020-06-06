import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ContentSection from '../shared/ContentSection';

const Countdown = ({ className, event }) => {
  return (
    <ContentSection
      className={className}
      backgroundColor="thatBlue"
      backgroundOpacity={0.82}
      backgroundImage="/images/group.jpg"
    >
      <p>{`this is the one day countdown for ${event.name}`}</p>
    </ContentSection>
  );
};

Countdown.propTypes = {
  className: PropTypes.string,
  event: PropTypes.shape({}).isRequired,
};

Countdown.defaultProps = {
  className: '',
};

export default styled(Countdown)``;
