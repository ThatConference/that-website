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
  width: 100%;
  align-items: center;
`;

const FullWidthGrid = styled(Grid)`
  width: 100%;
`;

const MeetCampers = ({ className }) => {
  return (
    <ContentSection
      className={className}
      backgroundColor="offWhite"
      hasTrees="true"
    >
      <FullWidthGrid columns={12}>
        <Cell width={6}>
          <h3>Meet THAT Crew!</h3>
        </Cell>
        <Cell width={6}>
          <div style={{ display: 'flex' }}>
            <LinkButton
              href="/"
              label="Contribute to THAT Community"
              color="thatBlue"
              borderColor="thatBlue"
            />
          </div>
        </Cell>
      </FullWidthGrid>
      <ProfileRow>
        <ProfileItem
          imageUrl="https://www.thatconference.com/cloud/profilephotos/Jaimee-Newberry-3ceaf5c4-c9c0-4090-8b9e-ef0d042c995f-636934538862544161.jpg?w=350&h=350&scale=canvas&format=jpg&quality=70"
          size="100"
        />
        <ProfileItem
          imageUrl="https://www.thatconference.com/cloud/profilephotos/Jaimee-Newberry-3ceaf5c4-c9c0-4090-8b9e-ef0d042c995f-636934538862544161.jpg?w=350&h=350&scale=canvas&format=jpg&quality=70"
          size="100"
        />
        <ProfileItem
          imageUrl="https://www.thatconference.com/cloud/profilephotos/Jaimee-Newberry-3ceaf5c4-c9c0-4090-8b9e-ef0d042c995f-636934538862544161.jpg?w=350&h=350&scale=canvas&format=jpg&quality=70"
          size="100"
        />
        <ProfileItem
          imageUrl="https://www.thatconference.com/cloud/profilephotos/Jaimee-Newberry-3ceaf5c4-c9c0-4090-8b9e-ef0d042c995f-636934538862544161.jpg?w=350&h=350&scale=canvas&format=jpg&quality=70"
          size="100"
        />
        <ProfileItem
          imageUrl="https://www.thatconference.com/cloud/profilephotos/Jaimee-Newberry-3ceaf5c4-c9c0-4090-8b9e-ef0d042c995f-636934538862544161.jpg?w=350&h=350&scale=canvas&format=jpg&quality=70"
          size="100"
        />
        <ProfileItem
          imageUrl="https://www.thatconference.com/cloud/profilephotos/Jaimee-Newberry-3ceaf5c4-c9c0-4090-8b9e-ef0d042c995f-636934538862544161.jpg?w=350&h=350&scale=canvas&format=jpg&quality=70"
          size="100"
        />
        <ProfileItem
          imageUrl="https://www.thatconference.com/cloud/profilephotos/Jaimee-Newberry-3ceaf5c4-c9c0-4090-8b9e-ef0d042c995f-636934538862544161.jpg?w=350&h=350&scale=canvas&format=jpg&quality=70"
          size="100"
        />
        <ProfileItem
          imageUrl="https://www.thatconference.com/cloud/profilephotos/Jaimee-Newberry-3ceaf5c4-c9c0-4090-8b9e-ef0d042c995f-636934538862544161.jpg?w=350&h=350&scale=canvas&format=jpg&quality=70"
          size="100"
        />
        <ProfileItem
          imageUrl="https://www.thatconference.com/cloud/profilephotos/Jaimee-Newberry-3ceaf5c4-c9c0-4090-8b9e-ef0d042c995f-636934538862544161.jpg?w=350&h=350&scale=canvas&format=jpg&quality=70"
          size="100"
        />
      </ProfileRow>
    </ContentSection>
  );
};

export default styled(MeetCampers)``;
