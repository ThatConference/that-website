import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MerhHighlight from '../shared/MerhHighlight';

const TicketUpgrades = ({ className }) => {
  return (
    <MerhHighlight
      title="Ticket Upgrades"
      subtitle="Add Some Merch To Your Ticket Purch!!"
      linkText="Get Your THAT Merch + Ticket"
      linkUrl="#"
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
