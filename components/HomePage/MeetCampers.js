import React from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import ContentSection from '../shared/ContentSection';
import LinkButton from '../shared/LinkButton';
import ProfileItem from '../shared/ProfileItem';

import { gridRepeat, DEFAULT_WIP_PAGE } from '../../utilities';

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

const TitleRow = styled.div`
  padding-bottom: 2rem;
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
      id="meet-campers"
    >
      <TitleRow>
        <Header>Meet THAT Crew!</Header>
        <LinkButton
          href={DEFAULT_WIP_PAGE}
          label="Contribute to THAT Community"
          color="thatBlue"
          borderColor="thatBlue"
        />
      </TitleRow>
      <Grid columns={gridRepeat.xxsmall} alignContent="center">
        {CAMPERS.map(item => {
          return (
            <Cell key={item.name}>
              <ProfileItem
                imageUrl={item.imageUrl}
                titleSize="1.4"
                size="100"
                name={item.name}
              />
            </Cell>
          );
        })}
      </Grid>
    </ContentSection>
  );
};

export default styled(MeetCampers)``;
