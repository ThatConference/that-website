import React from 'react';
import styled from 'styled-components';

import { Grid, Cell } from 'styled-css-grid';
import ContentSection from '../shared/ContentSection';
import LinkButton from '../shared/LinkButton';

import { below } from '../../utilities';

const HeroContentSection = styled(ContentSection)`
  padding: 0;
  background: ${({ background }) => background};
`;

const HeroGrid = styled(Grid)`
  height: 866px;

  ${below.med`
    height: 433px;
  `};
`;

const BackToPartnersLink = styled.a`
  font-size: 14px;
  position: absolute;
  float: left;
  top: 0;
  margin-top: 50px;
  margin-left: 50px;
  color: ${({ theme }) => theme.colors.fonts.light};

  img {
    vertical-align: middle;
  }
  span {
    margin-left: 5px;
  }

  ${below.med`
   margin-left: 0;
  `};
`;

const HeroPartnerName = styled.h3`
  font-size: 8.5rem;
  margin-bottom: 0;
  color: ${({ theme }) => theme.colors.fonts.light};

  ${below.med`
    font-size: 4.5rem;
  `};
`;

const HeroSection = ({
  companyName,
  heroImageUrl,
  connectWithUsUrl,
  location,
}) => {
  const loc = location || 'wi';
  const backToPartnerUrl = `/${loc}/partner-listing`;
  const heroUrl = heroImageUrl || '/images/partner_hero_default.jpg';
  // const heroUrl = '/images/partner_hero_default.jpg';
  const background = `linear-gradient(rgba(17, 53, 95, 0.45), rgba(17, 53, 95, 0.45)),
    url('${heroUrl}');`;

  return (
    <HeroContentSection background={background}>
      <HeroGrid columns="1fr" rows="1fr">
        <Cell center middle>
          <BackToPartnersLink href={backToPartnerUrl}>
            <img src="/svgs/back-arrow.svg" alt="Back to Partners" />
            <span>Back to Partners</span>
          </BackToPartnersLink>
          <HeroPartnerName>{companyName}</HeroPartnerName>
          <LinkButton
            href={connectWithUsUrl}
            label="Connect with Us"
            color="white"
            borderColor="white"
            backgroundColor="transparent"
          />
        </Cell>
      </HeroGrid>
    </HeroContentSection>
  );
};

export default HeroSection;
