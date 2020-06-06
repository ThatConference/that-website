import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ContentSection from '../shared/ContentSection';

const Partners = ({ className }) => {
  return (
    <ContentSection className={className}>
      <p>this is the one day partners</p>
    </ContentSection>
  );
};

Partners.propTypes = {
  className: PropTypes.string,
  event: PropTypes.shape({}).isRequired,
};

Partners.defaultProps = {
  className: '',
};

export default styled(Partners)``;
