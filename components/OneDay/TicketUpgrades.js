import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ContentSection from '../shared/ContentSection';

const TicketUpgrades = ({ className }) => {
  return (
    <ContentSection className={className}>
      <p>this is the one day ticket upgrades</p>
    </ContentSection>
  );
};

TicketUpgrades.propTypes = {
  className: PropTypes.string,
};

TicketUpgrades.defaultProps = {
  className: '',
};

export default styled(TicketUpgrades)``;
