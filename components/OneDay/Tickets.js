import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ContentSection from '../shared/ContentSection';

const Tickets = ({ className }) => {
  return (
    <ContentSection id="tickets" className={className}>
      <p>this is the one day tickets</p>
    </ContentSection>
  );
};

Tickets.propTypes = {
  className: PropTypes.string,
};

Tickets.defaultProps = {
  className: '',
};

export default styled(Tickets)``;
