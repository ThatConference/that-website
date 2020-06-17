import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TitledContentBlock from '../shared/TitledContentBlock';

const About = ({ className }) => {
  return (
    <TitledContentBlock
      title="You make the schedule!"
      subtitle="A full day of Open Spaces from the comfort of your chair."
      text="Let's cut right to the chase, we can't predict 
      
      "
      className={`centered-text ${className}`}
    />
  );
};

About.propTypes = {
  className: PropTypes.string,
};

About.defaultProps = {
  className: '',
};

export default styled(About)``;
