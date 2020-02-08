import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import SocialLinks from './SocialLinks';
import ThatLink from './ThatLink';
import { below } from '../../utilities';

const PartnerContact = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ alignment }) => alignment};
  flex-grow: 2;

  ${below.med`
    align-items: center;
  `};
`;

const MainLogo = styled.img`
  height: 15rem;
  padding-bottom: 2rem;
  max-width: 42rem;

  ${below.med`
    align-items: center;
    max-width: 35rem;
  `};

  ${below.small`
    max-width: 25rem;
  `};
`;

const VisitUs = styled.h5`
  font-family: 'Open Sans', sans-serif;
  margin-bottom: 0;
  margin-top: 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
`;

const getHostName = website => {
  let hostName = new URL(website).hostname;
  if (hostName.toLowerCase().startsWith('www.')) {
    hostName = hostName.replace('www.', '');
  }
  return hostName;
};

const PartnerLogoWithInfo = ({ partner }) => {
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

  return (
    <PartnerContact
      alignment={_.isEmpty(partner.members) ? 'center' : 'flex-start'}
    >
      <MainLogo src={partner.companyLogo} alt={partner.companyName} />
      <VisitUs>Visit us online at:</VisitUs>
      <ThatLink
        href={partner.website}
        title={getHostName(partner.website)}
        target="_blank"
        isLocal={false}
        style={{ paddingBottom: '1rem' }}
      />
      <SocialLinks socialLinks={getPartnerSocialLinks()} />
    </PartnerContact>
  );
};

export default PartnerLogoWithInfo;
