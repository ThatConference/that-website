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
`;

const TitleRow = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 2rem;
  align-items: center;

  ${below.small`
    flex-direction: column;
  `};
`;

const Header = styled.h3`
  width: 50vw;
`;

const HeaderButton = styled(LinkButton)`
  button {
    margin-top: 0;
  }
`;

const MeetCampers = ({ className }) => {
  return (
    <ContentSection
      className={className}
      backgroundColor="offWhite"
      hasTrees="true"
    >
      <TitleRow>
        <Header>Meet THAT Crew!</Header>
        <div style={{ display: 'flex' }}>
          <LinkButton
            href="/"
            label="Contribute to THAT Community"
            color="thatBlue"
            borderColor="thatBlue"
          />
        </div>
      </TitleRow>
      <ProfileRow>
        <ProfileItem
          imageUrl="https://res.cloudinary.com/that-conference/image/upload/v1572198396/headshot/staff/clark-sell.jpg"
          size="100"
          name="Clark Sell"
        />
        <ProfileItem
          imageUrl="https://res.cloudinary.com/that-conference/image/upload/v1572198396/headshot/staff/carrie-sell.jpg"
          size="100"
          name="Carrie Sell"
        />
        <ProfileItem
          imageUrl="https://res.cloudinary.com/that-conference/image/upload/v1572198396/headshot/staff/sara-gibbons.jpg"
          size="100"
          name="Sara Gibbons"
        />
        <ProfileItem
          imageUrl="https://res.cloudinary.com/that-conference/image/upload/v1572198396/headshot/staff/brett-slaski.jpg"
          size="100"
          name="Brett Slaski"
        />
        <ProfileItem
          imageUrl="https://res.cloudinary.com/that-conference/image/upload/v1572198396/headshot/staff/keith-burnell.jpg"
          size="100"
          name="Keith Burnell"
        />
        <ProfileItem
          imageUrl="https://res.cloudinary.com/that-conference/image/upload/v1572198396/headshot/staff/aaron-douglas.jpg"
          size="100"
          name="Aaron Douglas"
        />
        <ProfileItem
          imageUrl="https://res.cloudinary.com/that-conference/image/upload/v1572198396/headshot/staff/mike-cook.jpg"
          size="100"
          name="Mike Cook"
        />
        <ProfileItem
          imageUrl="https://res.cloudinary.com/that-conference/image/upload/v1572198396/headshot/staff/brandon-martinez.jpg"
          size="100"
          name="Brandon Martinez"
        />
        <ProfileItem
          imageUrl="https://res.cloudinary.com/that-conference/image/upload/v1572198396/headshot/staff/greg-levenhagen.jpg"
          size="100"
          name="Greg Levenhagen"
        />
        <ProfileItem
          imageUrl="https://res.cloudinary.com/that-conference/image/upload/v1572198396/headshot/staff/erin-gemoll.jpg"
          size="100"
          name="Erin Gemoll"
        />
        <ProfileItem
          imageUrl="https://res.cloudinary.com/that-conference/image/upload/v1572198396/headshot/staff/mat-bolwerk.jpg"
          size="100"
          name="Mat Bolwerk"
        />
        <ProfileItem
          imageUrl="https://res.cloudinary.com/that-conference/image/upload/v1572198396/headshot/staff/emily-davis.jpg"
          size="100"
          name="Emily Davis"
        />
      </ProfileRow>
    </ContentSection>
  );
};

export default styled(MeetCampers)``;
