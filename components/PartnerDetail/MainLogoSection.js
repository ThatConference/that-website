import React from 'react';
import styled from 'styled-components';

import { Grid, Cell } from 'styled-css-grid';
import ContentSection from '../shared/ContentSection';
import Icon from '../shared/Icon';
import RoundImage from '../shared/RoundImage';

import PartnerDetailSubHeading from './PartnerDetailSubHeading';

import { below } from '../../utilities';

const MainSection = styled(ContentSection)`
  padding: 0;
  padding-top: 10rem;
  padding-bottom: 2rem;
  background-color: ${({ theme }) => theme.colors.lightGray};

  ${below.med`
    padding-top: 2rem;
    padding-bottom: 2rem;
  `};
`;

const MainLogoGrid = styled(Grid)`
  ${below.med`
    display: block;
  `};
`;

const MainLogoCell = styled(Cell)`
  line-height: 1.2;

  ${below.med`
    text-align: left;
  `};
`;

const MainLogo = styled.img`
  height: 17.5rem;
`;

const PartnerSocialsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${({ justification }) => justification};
  margin-top: 1rem;

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
  margin-right: 0.2rem;
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

const VisitUs = styled.h5`
  font-family: 'Open Sans', sans-serif;
  margin-bottom: 0;
  margin-top: 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
`;

const Name = styled.p`
  font-family: franklin-gothic-urw, sans-serif;
  line-height: 1;
  color: ${({ theme }) => theme.colors.fonts.dark};
  margin-bottom: 0.5rem;
  font-weight: 400;
`;

const Title = styled.p`
  font-size: 1.2rem;
  line-height: 1.2;
  padding-right: 3rem;
  color: ${({ theme }) => theme.colors.fonts.dark};
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

const renderWho = who => {
  return (
    <Cell key={who.name}>
      <Grid columns="9rem 1fr">
        <Cell>
          <RoundImage
            imageUrl={who.headshotUrl}
            size="80"
            showAccentLine={false}
          />
        </Cell>
        <Cell>
          <Name>{who.name}</Name>
          <Title>{who.title}</Title>
        </Cell>
      </Grid>
    </Cell>
  );
};

const LogoAndSayHi = ({ partner }) => {
  return (
    <MainLogoGrid columns="67.5rem 1fr">
      <MainLogoCell>
        <LogoWithInfo partner={partner} justification="left" />
      </MainLogoCell>
      <Cell>
        <PartnerDetailSubHeading>
          Who to Say Hi to During THAT Conference
        </PartnerDetailSubHeading>
        <Grid columns="repeat(auto-fit,minmax(22rem,1fr))">
          {partner.whoToSayHiTo.map(w => {
            return renderWho(w);
          })}
        </Grid>
      </Cell>
    </MainLogoGrid>
  );
};

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
