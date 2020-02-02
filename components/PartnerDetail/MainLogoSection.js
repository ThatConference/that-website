import React from 'react';
import styled from 'styled-components';
import Imgix from 'react-imgix';

import { Grid, Cell } from 'styled-css-grid';
import ContentSection from '../shared/ContentSection';
import SocialLinks from '../shared/SocialLinks';

import PartnerDetailSubHeading from './PartnerDetailSubHeading';
import { below, gridRepeat } from '../../utilities';

const PartnerContact = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-grow: 2;
`;

const MainLogo = styled.img`
  height: 15rem;
  padding-bottom: 2rem;
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
  margin-bottom: 0.25rem;
  font-weight: 500;
  margin-top: 0;
`;

const Title = styled.p`
  font-size: 1.2rem;
  line-height: 1.2;
  padding-right: 3rem;
  color: ${({ theme }) => theme.colors.fonts.dark};
  font-weight: 400;
  margin: 0;
`;

const SayHiDetail = styled.div`
  display: flex;
  flex-direction: column;
`;

const Member = styled.div`
  display: flex;
  flex-direction: row;
`;

const MemberDetail = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 2rem;
  justify-content: center;
`;

const getHostName = website => {
  let hostName = new URL(website).hostname;
  if (hostName.toLowerCase().startsWith('www.')) {
    hostName = hostName.replace('www.', '');
  }
  return hostName;
};

const renderMember = member => {
  return (
    <Member>
      <Imgix
        src={member.profileImage}
        width={60}
        height={60}
        imgixParams={{ mask: 'ellipse', fit: 'facearea', facepad: 4 }}
      />
      <MemberDetail>
        <Name>{`${member.firstName} ${member.lastName}`}</Name>
        <Title>{member.jobTitle}</Title>
      </MemberDetail>
    </Member>
  );
};

const MainLogoSection = ({ partner }) => {
  const getPartnerSocialLinks = () => {
    const socials = {};

    if (partner.facebook) socials.facebook = partner.facebook;
    if (partner.twitter) socials.twitter = partner.twitter;
    if (partner.instagram) socials.instagram = partner.instagram;
    if (partner.youtube) socials.youtube = partner.youtube;
    if (partner.linkedin) socials.linkedin = partner.linkedIn;
    if (partner.github) socials.github = partner.github;

    return socials;
  };

  const LogoWithInfo = () => {
    return (
      <PartnerContact>
        <MainLogo src={partner.companyLogo} alt={partner.companyName} />
        <VisitUs>Visit us online at:</VisitUs>
        <a href={partner.website}>{getHostName(partner.website)}</a>
        <SocialLinks socialLinks={getPartnerSocialLinks()} />
      </PartnerContact>
    );
  };

  return (
    <ContentSection backgroundColor="lightGray">
      <Grid columns={gridRepeat.xxsmall}>
        <Cell>
          <LogoWithInfo />
        </Cell>
        {partner.members && (
          <Cell>
            <SayHiDetail>
              <PartnerDetailSubHeading>
                Who to Say Hi to During THAT Conference
              </PartnerDetailSubHeading>
              <Grid columns={gridRepeat.xsmall}>
                {partner.members.map(member => {
                  return renderMember(member);
                })}
              </Grid>
            </SayHiDetail>
          </Cell>
        )}
      </Grid>
    </ContentSection>
  );
};

export default MainLogoSection;
