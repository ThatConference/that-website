import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TitledContentBlock from '../shared/TitledContentBlock';

const About = ({ className }) => {
  return (
    <TitledContentBlock
      title="A Day Full Of Community"
      subtitle="Keynotes and open spaces run by you!"
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac hendrerit sem, at ullamcorper nunc. Donec vehicula id sapien vel dapibus. Nulla a odio diam. Nunc vel odio ex. Etiam dictum mollis placerat. Pellentesque vel posuere velit."
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
