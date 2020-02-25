import React from 'react';
import styled from 'styled-components';

import ContentSection from '../shared/ContentSection';
import LinkButton from '../shared/LinkButton';
import Icon from '../shared/Icon';

import { below } from '../../utilities';

const HeroContentSection = styled(ContentSection)`
  padding: 0;
  background: ${({ background }) => background};
`;

const HeroBlock = styled.div`
  display: flex;
  flex-direction: column;
  height: 75rem;
  align-items: center;
  justify-content: center;
  margin-top: 5rem;

  ${below.med`
    height: 43.3rem;
  `};
`;

const BackToPartnersLink = styled.a`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.fonts.light};
  align-self: flex-start;
  width: 100%;
  margin-top: 19rem;

  svg {
    vertical-align: middle;
  }
  span {
    margin-left: 0.5rem;
  }

  ${below.xlarge`
    margin-left: 6rem;
  `};

  ${below.med`
    margin-top: 16rem;
    padding: 0 2rem;
    margin-left: 2rem;
  `};
`;

const BackArrow = styled(Icon)`
  fill: ${({ theme }) => theme.colors.white};
  transform: scaleX(-1);
`;

const HeroPartnerName = styled.h3`
  font-size: 8.5rem;
  margin-bottom: 0;
  color: ${({ theme }) => theme.colors.fonts.light};

  ${below.med`
    font-size: 4.5rem;
  `};
`;

const SmallLinkButton = styled(LinkButton)`
  max-width: 7rem;
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
      <HeroBlock>
        <BackToPartnersLink href={backToPartnerUrl}>
          <BackArrow
            icon="fullArrow"
            height="20"
            width="12"
            viewBoxHeight="100"
            viewBoxWidth="100"
            title="Back"
          />
          <span>Back to Partners</span>
        </BackToPartnersLink>
        <div style={{ flexGrow: 2, textAlign: 'center', width: '100%' }}>
          <HeroPartnerName>{companyName}</HeroPartnerName>
          <SmallLinkButton
            href={connectWithUsUrl}
            label="Connect with Us"
            color="white"
            borderColor="white"
            backgroundColor="transparent"
            hoverBorderColor="white"
            hoverColor="primary"
            hoverBackgroundColor="white"
            target="blank"
            isLocal={false}
          />
        </div>
      </HeroBlock>
    </HeroContentSection>
  );
};

export default HeroSection;
