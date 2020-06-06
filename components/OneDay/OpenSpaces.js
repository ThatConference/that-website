import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ContentSection from '../shared/ContentSection';

const OpenSpaces = ({ className }) => {
  return (
    <ContentSection className={className}>
      <p>this is the one day open spaces</p>
    </ContentSection>
  );
};

OpenSpaces.propTypes = {
  className: PropTypes.string,
};

OpenSpaces.defaultProps = {
  className: '',
};

export default styled(OpenSpaces)``;
