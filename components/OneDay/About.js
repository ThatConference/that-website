import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ContentSection from '../shared/ContentSection';

const About = ({ className }) => {
  return (
    <ContentSection className={className}>
      <p>this is the one day about</p>
    </ContentSection>
  );
};

About.propTypes = {
  className: PropTypes.string,
};

About.defaultProps = {
  className: '',
};

export default styled(About)``;
