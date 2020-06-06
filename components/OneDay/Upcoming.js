import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ContentSection from '../shared/ContentSection';

// Can hardcode for now, or hardcode query to pull next event deets we want to display
const Upcoming = ({ className }) => {
  return (
    <ContentSection className={className}>
      <p>this is the one day upcoming</p>
    </ContentSection>
  );
};

Upcoming.propTypes = {
  className: PropTypes.string,
};

Upcoming.defaultProps = {
  className: '',
};

export default styled(Upcoming)``;
