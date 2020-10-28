import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { sortBy } from 'lodash';
import ContentSection from '../shared/ContentSection';
import TopPartners from '../shared/TopPartners';

const PARTNER_LEVELS_TO_DISPLAY = ['CORPORATE_PARTNER', 'PARTNER'];

const Partners = ({ partners }) => {
  let topPartners = partners.filter(partner =>
    PARTNER_LEVELS_TO_DISPLAY.includes(partner.level),
  );
  topPartners = sortBy(topPartners, p => p.level);

  return (
    <ContentSection id="partners">
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
