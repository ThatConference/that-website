import React from 'react';
import styled from 'styled-components';

import { Grid, Cell } from 'styled-css-grid';
import ContentSection from '../shared/ContentSection';
import LinkButton from '../shared/LinkButton';
import Icon from '../shared/Icon';

import { below } from '../../utilities';

const HeroContentSection = styled(ContentSection)`
  padding: 0;
  background: ${({ background }) => background};
`;

const HeroGrid = styled(Grid)`
  height: 86.6rem;

  ${below.med`
    height: 43.3rem;
  `};
`;

const BackToPartnersLink = styled.a`
  font-size: 1.4rem;
  position: absolute;
  float: left;
  top: 0;
  margin-top: 5rem;
  margin-left: 5rem;
  color: ${({ theme }) => theme.colors.fonts.light};

  svg {
    vertical-align: middle;
  }
  span {
    margin-left: 0.5rem;
  }

  ${below.med`
    margin-left: -25px;
  `};
`;

const BackArrow = styled(Icon)`
  fill: ${({ theme }) => theme.colors.white};
`;

const HeroPartnerName = styled.h3`
  font-size: 8.5rem;
  margin-bottom: 0;
  color: ${({ theme }) => theme.colors.fonts.light};

  ${below.med`
    font-size: 4.5rem;
  `};
`;

const ConnectWithUs = styled(LinkButton)`
  margin: 0;
  margin-top: 2rem;
  margin-left: auto;
  margin-right: auto;
`;

const HeroSection = ({
  companyName,
  heroImageUrl,
  connectWithUsUrl,
  location,
}) => {
  const loc = location || 'wi';
  const backToPartnerUrl = `/${loc}/partners`;
  const heroUrl = heroImageUrl || '/images/partner_hero_default.jpg';
  const background = `linear-gradient(rgba(17, 53, 95, 0.65), rgba(17, 53, 95, 0.65)),
    url('${heroUrl}');`;

  return (
    <HeroContentSection background={background}>
      <HeroGrid columns="1fr" rows="1fr">
        <Cell center middle>
          <BackToPartnersLink href={backToPartnerUrl}>
            <BackArrow
              icon="backArrow"
              height="25px"
              width="25px"
              viewBoxHeight="100"
              viewBoxWidth="100"
            />
            <span>Back to Partners</span>
          </BackToPartnersLink>
          <HeroPartnerName>{companyName}</HeroPartnerName>
          <ConnectWithUs
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
