import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ContentSection from '../shared/ContentSection';

// Component we can reuse to display opening and closing keynote by
// passing in detail to display as props
const SessionHighlight = ({ className, title }) => {
  return (
    <ContentSection
      className={className}
      backgroundColor="thatBlue"
      backgroundOpacity={0.82}
      backgroundImage="/images/group.jpg"
    >
      <h2 className="font-light">{title}</h2>
    </ContentSection>
  );
};

SessionHighlight.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
};

SessionHighlight.defaultProps = {
  className: '',
};

export default styled(SessionHighlight)``;
