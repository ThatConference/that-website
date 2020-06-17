import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TitledContentBlock from '../shared/TitledContentBlock';

const About = ({ className }) => {
  const text = `
    Let's cut right to the chase, first it was COVID-19, then came the murder hornets, and now there is a pack of bears who’ve just decided to take over camp. We’re pretty sure they’re just waiting for the bacon but honestly we’re too afraid to ask.

    Rather than trying to replicate our camp experience online, we’ve decided to take a different approach. We’re in the midst of building a new way to run virtual open spaces. On August 3rd we will host the largest open spaces we’ve ever had. This means you’re in complete control of your experience. The topics, times, the duration, and most importantly the conversation. Our goal is to create a facility that will bring the most value to each and everyone of us in a way that’s most efficient online.
  `;

  return (
    <TitledContentBlock
      title="THAT. CREATED BY… YOU!"
      subtitle="A full day of Open Spaces from the comfort of your camp chair."
      text={text}
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
