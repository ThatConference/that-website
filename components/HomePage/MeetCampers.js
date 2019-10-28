import React from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import ContentSection from '../shared/ContentSection';
import LinkButton from '../shared/LinkButton';
import ProfileItem from '../shared/ProfileItem';

import { below } from '../../utilities';

const CAMPERS = [
  {
    imageUrl:
      'https://storage.googleapis.com/that-bucket/headshots/thatstaff/clark-sell.jpg',
    name: 'Clark Sell',
  },
  {
    imageUrl:
      'https://storage.googleapis.com/that-bucket/headshots/thatstaff/carrie-sell.jpg',
    name: 'Carrie Sell',
  },
  {
    imageUrl:
      'https://storage.googleapis.com/that-bucket/headshots/thatstaff/sara-gibbons.jpg',
    name: 'Sara Gibbons',
  },
  {
    imageUrl:
      'https://storage.googleapis.com/that-bucket/headshots/thatstaff/brett-slaski.jpg',
    name: 'Brett Slaski',
  },
  {
    imageUrl:
      'https://storage.googleapis.com/that-bucket/headshots/thatstaff/keith-burnell.jpg',
    name: 'Keith Burnell',
  },
  {
    imageUrl:
      'https://storage.googleapis.com/that-bucket/headshots/thatstaff/aaron-douglas.jpg',
    name: 'Aaron Douglas',
  },
  {
    imageUrl:
      'https://storage.googleapis.com/that-bucket/headshots/thatstaff/mike-cook.jpg',
    name: 'Mike Cook',
  },
  {
    imageUrl:
      'https://storage.googleapis.com/that-bucket/headshots/thatstaff/brandon-martinez.jpg',
    name: 'Brandon Martinez',
  },
  {
    imageUrl:
      'https://storage.googleapis.com/that-bucket/headshots/thatstaff/greg-levenhagen.jpg',
    name: 'Greg Levenhagen',
  },
  {
    imageUrl:
      'https://storage.googleapis.com/that-bucket/headshots/thatstaff/erin-gemoll.jpg',
    name: 'Erin Gemoll',
  },
  {
    imageUrl:
      'https://storage.googleapis.com/that-bucket/headshots/thatstaff/mat-bolwerk.jpg',
    name: 'Mat Bolwerk',
  },
  {
    imageUrl:
      'https://storage.googleapis.com/that-bucket/headshots/thatstaff/emily-davis.jpg',
    name: 'Emily Davis',
  },
];

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
        {CAMPERS.map((item, index) => {
          return (
            <ProfileItem
              imageUrl={item.imageUrl}
              size="100"
              titleSize="1.4"
              name={item.name}
              key={index}
            />
          );
        })}
      </ProfileRow>
    </ContentSection>
  );
};

export default styled(MeetCampers)``;
