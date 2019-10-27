import React from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import ContentSection from '../shared/ContentSection';
import LinkButton from '../shared/LinkButton';
import ProfileItem from '../shared/ProfileItem';

import { below } from '../../utilities';

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
  flex-direction: row;

  ${below.small`
    flex-direction: column;
  `};
`;

const SpeakerHighlight = ({ className }) => {
  return (
    <ContentSection>
      <TitleRow>
        <h3>Find Inspiration From Hallway Conversations or Industry Leaders</h3>
        <div style={{ display: 'flex' }}>
          <LinkButton
            href="/"
            label="Meet The Speakers"
            color="thatBlue"
            borderColor="thatBlue"
          />
        </div>
      </TitleRow>
      <ProfileRow>
        <ProfileItem
          imageUrl="https://www.thatconference.com/cloud/profilephotos/Jaimee-Newberry-3ceaf5c4-c9c0-4090-8b9e-ef0d042c995f-636934538862544161.jpg?w=350&h=350&scale=canvas&format=jpg&quality=70"
          size="150"
        />
        <ProfileItem
          imageUrl="https://www.thatconference.com/cloud/profilephotos/Jaimee-Newberry-3ceaf5c4-c9c0-4090-8b9e-ef0d042c995f-636934538862544161.jpg?w=350&h=350&scale=canvas&format=jpg&quality=70"
          size="150"
        />
        <ProfileItem
          imageUrl="https://www.thatconference.com/cloud/profilephotos/Jaimee-Newberry-3ceaf5c4-c9c0-4090-8b9e-ef0d042c995f-636934538862544161.jpg?w=350&h=350&scale=canvas&format=jpg&quality=70"
          size="150"
        />
        <ProfileItem
          imageUrl="https://www.thatconference.com/cloud/profilephotos/Jaimee-Newberry-3ceaf5c4-c9c0-4090-8b9e-ef0d042c995f-636934538862544161.jpg?w=350&h=350&scale=canvas&format=jpg&quality=70"
          size="150"
        />
      </ProfileRow>
    </ContentSection>
  );
};

export default styled(SpeakerHighlight)``;
