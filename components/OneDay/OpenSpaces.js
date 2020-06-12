import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TitledContentBlock from '../shared/TitledContentBlock';

const OpenSpaces = ({ className }) => {
  return (
    <TitledContentBlock
      title="Open Spaces"
      titleColor="white"
      subtitle="#THAT2020 CREATED BY… YOU!"
      subtitleColor="white"
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac hendrerit sem, at ullamcorper nunc. Donec vehicula id sapien vel dapibus. Nulla a odio diam. Nunc vel odio ex. Etiam dictum mollis placerat. Pellentesque vel posuere velit."
      textColor="white"
      backgroundColor="primary"
      backgroundOpacity={0.7}
      backgroundImage="/images/open-space-circle.jpg"
      buttonText="Watch 2019 Open Spaces Kickoff"
      buttonLinkUrl="http://wwww.someyoutubeurl.com"
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
