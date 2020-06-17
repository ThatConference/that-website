import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TitledContentBlock from '../shared/TitledContentBlock';

const OpenSpaces = ({ className }) => {
  return (
    <TitledContentBlock
      title="Open Spaces"
      titleColor="white"
      subtitle="Your pick the topics. We all make the conversation!"
      subtitleColor="white"
      text="What is Open Spaces? Open Space creates a facility, an opportunity to talk about anything we like. Yes anything, from some low level assembler code to BBQ, anything goes. It’s as simple as putting the topic on the Camp board. From there other campers find the conversations they’re interested in participating in and we come together at the scheduled time. Then we let the conversation guide us where it takes us."
      textColor="white"
      backgroundColor="primary"
      backgroundOpacity={0.7}
      backgroundImage="/images/open-space-circle.jpg"
      buttonText="Watch 2019 Open Spaces Kickoff"
      buttonLinkUrl="https://www.youtube.com/watch?v=IiWh8l-dRtw"
      buttonIsLocal={false}
      className={`centered-text ${className}`}
    />
  );
};

OpenSpaces.propTypes = {
  className: PropTypes.string,
};

OpenSpaces.defaultProps = {
  className: '',
};

export default styled(OpenSpaces)``;
