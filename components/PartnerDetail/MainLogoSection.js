import React from 'react';
import styled from 'styled-components';

import { Grid, Cell } from 'styled-css-grid';
import ContentSection from '../shared/ContentSection';
import Icon from '../shared/Icon';
import PartnerDetailSubHeading from './PartnerDetailSubHeading';

import { below } from '../../utilities';

const MainSection = styled(ContentSection)`
  padding: 0;
  padding-top: 100px;
  padding-bottom: 20px;
  background-color: ${({ theme }) => theme.colors.lightGray};

  ${below.med`
    padding-top: 20px;
    padding-bottom: 20px;
  `};
`;

const MainLogoGrid = styled(Grid)`
  // padding: 0 0 0 75px;
`;

const MainLogoCell = styled(Cell)`
  line-height: 1.2;

  ${below.med`
    text-align: left;
  `};
`;

const MainLogo = styled.img`
  height: 175px;
`;

const VisitUs = styled.h5`
  margin-bottom: 0;
  margin-top: 5px;
  font-size: 1.5rem;
`;

const LogoWithInfo = ({ partner, justification }) => {
  return (
    <>
      <MainLogo src={partner.companyLogo} alt={partner.companyName} />
      <VisitUs>Visit us online at:</VisitUs>
      <a href={partner.website}>{getHostName(partner.website)}</a>
      <PartnerSocials partner={partner} justification={justification} />
    </>
  );
};

const JustLogo = ({ partner }) => {
  return (
    <MainLogoGrid columns="1">
      <MainLogoCell center>
        <LogoWithInfo partner={partner} justification="center" />
      </MainLogoCell>
    </MainLogoGrid>
  );
};

const LogoAndSayHi = ({ partner }) => {
  return (
    <MainLogoGrid columns="repeat(auto-fit,minmax(250px,1fr))">
      <MainLogoCell>
        <LogoWithInfo partner={partner} justification="left" />
      </MainLogoCell>
      <Cell>
        <PartnerDetailSubHeading>
          Who to Say Hi to During THAT Conference
        </PartnerDetailSubHeading>
        {/* todo: not sure where this data is coming from */}
      </Cell>
    </MainLogoGrid>
  );
};

const PartnerSocialsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${({ justification }) => justification};
  margin-top: 10px;

  ${below.med`
    justify-content: left;
  `};
`;

const PartnerSocialLink = styled.a`
  height: 3.5rem;
  background-color: ${({ theme }) => theme.colors.highlight};
  border-radius: 3.5rem;
  height: 3.5rem;
  background-color: ${({ theme }) => theme.colors.highlight};
  border-radius: 3.5rem;
  margin-right: 2px;
  margin-top: 0;

  svg {
    position: relative;
    top: 0.6rem;
    left: 0.6rem;
    fill: ${({ theme }) => theme.colors.white};
  }

  &:hover {
    svg {
      fill: ${({ theme }) => theme.colors.white};
    }
  }
`;

const PartnerSocials = ({ partner, justification }) => {
  return (
    <PartnerSocialsContainer justification={justification}>
      {partner.instagram && (
        <PartnerSocialLink href={partner.instagram} target="_blank">
          <Icon icon="instagram" height="38" width="38" />
        </PartnerSocialLink>
      )}
      {partner.facebook && (
        <PartnerSocialLink href={partner.facebook} target="_blank">
          <Icon icon="facebook" height="38" width="38" />
        </PartnerSocialLink>
      )}
      {partner.twitter && (
        <PartnerSocialLink href={partner.twitter} target="_blank">
          <Icon icon="twitter" height="38" width="38" />
        </PartnerSocialLink>
      )}
      {partner.youtube && (
        <PartnerSocialLink href={partner.youtube} target="_blank">
          <Icon icon="youtube" height="70" width="70" />
        </PartnerSocialLink>
      )}
      {partner.linkedIn && (
        <PartnerSocialLink href={partner.linkedIn} target="_blank">
          <Icon icon="linkedin" height="38" width="38" />
        </PartnerSocialLink>
      )}
      {partner.github && (
        <PartnerSocialLink href={partner.github} target="_blank">
          <Icon icon="github" height="38" width="38" />
        </PartnerSocialLink>
      )}
    </PartnerSocialsContainer>
  );
};

const getHostName = website => {
  let hostName = new URL(website).hostname;
  if (hostName.toLowerCase().startsWith('www.')) {
    hostName = hostName.replace('www.', '');
  }
  return hostName;
};

const MainLogoSection = ({ partner }) => {
  return (
    <MainSection>
      {partner.whoToSayHiTo && <LogoAndSayHi partner={partner} />}
      {!partner.whoToSayHiTo && <JustLogo partner={partner} />}
    </MainSection>
  );
};

export default MainLogoSection;
