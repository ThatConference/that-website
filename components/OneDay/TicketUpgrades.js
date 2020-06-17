import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MerchHighlight from '../shared/MerchHighlight';

const TicketUpgrades = ({ className }) => {
  return (
    <MerchHighlight
      title="Ticket Upgrades"
      subtitle="Don't Go Naked! Get THAT 2020 Tee"
      linkText="Buy Your Ticket Today"
      linkUrl="http://tickets.thatconference.com"
      description="In honor of our inaugural THAT Virtual Event we've designed some one of a time merch! Don't miss your chance to add it to your ticket NOW before it sells out!"
      className={className}
    />
  );
};

TicketUpgrades.propTypes = {
  className: PropTypes.string,
};

TicketUpgrades.defaultProps = {
  className: '',
};

export default styled(TicketUpgrades)``;
