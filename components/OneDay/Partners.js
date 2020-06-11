import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ContentSection from '../shared/ContentSection';
import TopPartners from '../shared/TopPartners';

const PARTNER_LEVELS_TO_DISPLAY = ['CORPORATE_PARTNER', 'PARTNER'];

const Partners = ({ partners }) => {
  const topPartners = partners.filter(partner =>
    PARTNER_LEVELS_TO_DISPLAY.includes(partner.level),
  );

  return (
    <ContentSection>
      <TopPartners title="Event Brought To You By" partners={topPartners} />
    </ContentSection>
  );
};

Partners.propTypes = {
  partners: PropTypes.shape([]).isRequired,
};

Partners.defaultProps = {};

export default styled(Partners)``;
