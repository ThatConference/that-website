import React from 'react';
import styled from 'styled-components';
import ContentSection from '../shared/ContentSection';
import LinkButton from '../shared/LinkButton';
import ProfileItem from '../shared/ProfileItem';

import { below, above, DEFAULT_WIP_PAGE } from '../../utilities';

const ProfileRow = styled.div`
  display: flex;
  margin: auto;
  justify-content: center;
  flex-wrap: wrap;

  ${below.small`
    flex-direction: column;
    margin-top: 2rem;
  `};
`;

const TitleRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 2rem;

  ${below.small`
    flex-direction: column;
    align-items: stretch;
  `};
`;

const SpeakersLink = styled(LinkButton)`
  ${above.small`
    margin-top: auto;
  `};
`;

const Header = styled.h3`
  width: 50vw;

  ${below.small`
    width: auto;
  `};
`;

const SpeakerHighlight = ({ className }) => {
  return (
    <ContentSection className={className} id="speakers">
      <TitleRow>
        <Header>
          Find Inspiration From Hallway Conversations or Industry Leaders
        </Header>
        <SpeakersLink
          href={DEFAULT_WIP_PAGE}
          label="Meet The Counselors"
          color="thatBlue"
          borderColor="thatBlue"
          hoverBorderColor="thatBlue"
          hoverColor="white"
          hoverBackgroundColor="thatBlue"
        />
      </TitleRow>
      <ProfileRow>
        <ProfileItem
          imageUrl="https://storage.googleapis.com/that-bucket/headshots/Jaimee-Newberry-3ceaf5c4-c9c0-4090-8b9e-ef0d042c995f-636934538862544161.jpg"
          size="150"
          name="Jaimee Newberry"
          title="Co-founder"
          company="Picture This Clothing"
          showAccentLine={false}
        />
        <ProfileItem
          imageUrl="https://storage.googleapis.com/that-bucket/headshots/Seth-Juarez-3c90db7a-fa93-4851-a6c6-f19b6df868c4-636537315250880028.jpg"
          size="150"
          name="Seth Juarez"
          title="Cloud Developer Advocate "
          company="Microsoft"
          showAccentLine={false}
        />
        <ProfileItem
          imageUrl="https://storage.googleapis.com/that-bucket/headshots/Cassie-Siljander-2028a060-81ea-4ddc-beff-ec4c6d299ffc-636917231617048606.jpg"
          size="150"
          name="Cassie Breviu"
          title="Cloud Developer Advocate "
          company="Microsoft"
          showAccentLine={false}
        />
        <ProfileItem
          imageUrl="https://storage.googleapis.com/that-bucket/headshots/Anjuan-Simmons-47576cdb-e003-467a-806b-bf4fed7f5c14-636856782528812887.jpg"
          size="150"
          name="Anjuan Simmons"
          title="Solution Owner "
          company="3017"
          showAccentLine={false}
        />
      </ProfileRow>
    </ContentSection>
  );
};

export default styled(SpeakerHighlight)``;
