import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ContentSection from '../shared/ContentSection';
import TopPartners from '../shared/TopPartners';

const PARTNER_LEVELS_TO_DISPLAY = ['CORPORATE_PARTNER', 'PARTNER'];

const Partners = ({ partners }) => {
  const topPartners = partners
    .sort((a, b) => {
      if (a.level > b.level) return 1;
      if (a.level < b.level) return -1;
      return 0;
    })
    .filter(partner => PARTNER_LEVELS_TO_DISPLAY.includes(partner.level));

  return (
    <ContentSection>
      <TopPartners
        title="Event Brought To You By"
        partners={topPartners}
        becomePartnerLink="#tickets"
      />
    </ContentSection>
  );
};

Partners.propTypes = {
  partners: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

Partners.defaultProps = {};

export default styled(Partners)``;
