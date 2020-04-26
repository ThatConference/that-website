import React from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import { NextSeo } from 'next-seo';
import _ from 'lodash';
import ContentSection from '../components/shared/ContentSection';
import { below, gridRepeat } from '../utilities';
import LinkButton from '../components/shared/LinkButton';
import ProfileItem from '../components/shared/ProfileItem';
import {
  HeroGraphicDiv,
  Placeholder,
} from '../components/shared/StandardStyles';

// const GET_ALL_MEMBERS = gql`
//   query getAllPartners {
//     partners {
//       all {
//         id
//         firstName
//         lastName
//         company
//         jobTitle
//         profileSlug
//         profileImage
//       }
//     }
//   }
// `;

const loading = false;
const data = {
  members: {
    all: [
      {
        id: 'auth0|5defb42000e57a0e854bd7bd',
        firstName: 'Clark',
        lastName: 'Sell',
        company: 'Unspecified, THAT Conference',
        jobTitle: 'Founder & Practitioner',
        profileImage:
          'https://that.imgix.net/members/5ec3a772-104d-4f6c-a577-9ea30baea982.jpeg',
        profileSlug: 'clark',
      },
      {
        id: 'auth0|5e077362d10ebd0eae91852e',
        firstName: 'Keith',
        lastName: 'Burnell',
        company: 'SSCS, Inc ',
        jobTitle: 'Senior Software Engineer',
        profileImage:
          'https://that.imgix.net/members/8fc21cfc-e335-4cbf-9462-ed61e70618d5.jpeg',
        profileSlug: 'kburnell',
      },
      {
        id: 'google-oauth2|117304497519382112746',
        firstName: 'Sara',
        lastName: 'Gibbons',
        company: 'Unspecified',
        jobTitle: '💃',
        profileImage:
          'https://that.imgix.net/members/c092e10a-35dc-4e0b-acd3-962159398022.jpeg',
        profileSlug: 'sara',
      },
      {
        id: 'auth0|5e5986d41dcd2b0ce0f597ef',
        firstName: 'Brandon',
        lastName: 'Minnick',
        company: 'Microsoft',
        jobTitle: 'Developer Advocate',
        profileImage:
          'https://that.imgix.net/members/ee3ae9e5-7bf3-4f53-8c30-886a90343cdf.jpeg',
        profileSlug: 'brandon',
      },
      {
        id: 'auth0|5defb42000e57a0e854bd7bd',
        firstName: 'TClark',
        lastName: 'TSell',
        company: 'Unspecified, THAT Conference',
        jobTitle: 'Founder & Practitioner',
        profileImage:
          'https://that.imgix.net/members/5ec3a772-104d-4f6c-a577-9ea30baea982.jpeg',
        profileSlug: 'clark',
      },
      {
        id: 'auth0|5e077362d10ebd0eae91852e',
        firstName: 'TKeith',
        lastName: 'TBurnell',
        company: 'SSCS, Inc ',
        jobTitle: 'Senior Software Engineer',
        profileImage:
          'https://that.imgix.net/members/8fc21cfc-e335-4cbf-9462-ed61e70618d5.jpeg',
        profileSlug: 'kburnell',
      },
      {
        id: 'google-oauth2|117304497519382112746',
        firstName: 'TSara',
        lastName: 'TGibbons',
        company: 'Unspecified',
        jobTitle: '💃',
        profileImage:
          'https://that.imgix.net/members/c092e10a-35dc-4e0b-acd3-962159398022.jpeg',
        profileSlug: 'sara',
      },
      {
        id: 'auth0|5e5986d41dcd2b0ce0f597ef',
        firstName: 'TBrandon',
        lastName: 'TMinnick',
        company: 'Microsoft',
        jobTitle: 'Developer Advocate',
        profileImage:
          'https://that.imgix.net/members/ee3ae9e5-7bf3-4f53-8c30-886a90343cdf.jpeg',
        profileSlug: 'brandon',
      },
      {
        id: 'auth0|5defb42000e57a0e854bd7bd',
        firstName: 'ZClark',
        lastName: 'ZSell',
        company: 'Unspecified, THAT Conference',
        jobTitle: 'Founder & Practitioner',
        profileImage:
          'https://that.imgix.net/members/5ec3a772-104d-4f6c-a577-9ea30baea982.jpeg',
        profileSlug: 'clark',
      },
      {
        id: 'auth0|5e077362d10ebd0eae91852e',
        firstName: 'ZKeith',
        lastName: 'ZBurnell',
        company: 'SSCS, Inc ',
        jobTitle: 'Senior Software Engineer',
        profileImage:
          'https://that.imgix.net/members/8fc21cfc-e335-4cbf-9462-ed61e70618d5.jpeg',
        profileSlug: 'kburnell',
      },
      {
        id: 'google-oauth2|117304497519382112746',
        firstName: 'ZSara',
        lastName: 'ZGibbons',
        company: 'Unspecified',
        jobTitle: '💃',
        profileImage:
          'https://that.imgix.net/members/c092e10a-35dc-4e0b-acd3-962159398022.jpeg',
        profileSlug: 'sara',
      },
      {
        id: 'auth0|5e5986d41dcd2b0ce0f597ef',
        firstName: 'ZBrandon',
        lastName: 'ZMinnick',
        company: 'Microsoft',
        jobTitle: 'Developer Advocate',
        profileImage:
          'https://that.imgix.net/members/ee3ae9e5-7bf3-4f53-8c30-886a90343cdf.jpeg',
        profileSlug: 'brandon',
      },
    ],
  },
};

const HighlightImage = styled.img`
  max-height: 30rem;
  position: absolute;
  top: 3rem;
  right: 20rem;
  object-fit: contain;

  ${below.small`
    margin-left: 0;
    width: 90%;
  `};

  ${below.med`
    position: relative;
    left: -2rem;
  `};
`;

const SkeletonLoader = () => {
  const items = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 28; i++) {
    items.push(<Placeholder width="17rem" height="13rem" />);
  }
  return (
    <Grid columns={gridRepeat.xxsmall} alignContent="center">
      {items}
    </Grid>
  );
};

const members = () => {
  // const { loading, data } = useQuery(GET_ALL_MEMBERS);

  return (
    <>
      <NextSeo
        title="All Members - THAT Conference"
        description="THAT is nothing without our community. These unique and passionate individuals are what THAT is all about!"
      />

      <ContentSection>
        <Grid columns={gridRepeat.xsmall}>
          <Cell width={1}>
            <h1>Members</h1>
            <p className="medium-body-copy">
              ** Need heartfelt blurb about members ** Lorem ipsum dolor sit
              amet, consectetur adipisicing elit. Sequi nisi rem voluptates
              voluptas facere beatae itaque accusantium unde corrupti libero
              ullam obcaecati reiciendis eaque nihil, debitis corporis facilis,
              assumenda rerum!
            </p>
            <LinkButton
              href="/api/login"
              label="Become a Member"
              color="thatBlue"
              borderColor="thatBlue"
              hoverBorderColor="thatBlue"
              hoverColor="white"
              hoverBackgroundColor="thatBlue"
            />
          </Cell>
          <HeroGraphicDiv>
            <HighlightImage
              src="/images/moose_with_lantern.png"
              alt="THAT Partners"
            />
          </HeroGraphicDiv>
        </Grid>
      </ContentSection>

      <ContentSection>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <SkeletonLoader />
          </div>
        )}
        {!loading && (
          <Grid columns={gridRepeat.xxsmall} alignContent="center">
            {_.orderBy(data.members.all, ['firstName', 'lastName']).map(
              member => {
                return (
                  <ProfileItem
                    imageUrl={member.profileImage}
                    size="150"
                    name={`${member.firstName} ${member.lastName}`}
                    title={member.jobTitle}
                    company={member.company}
                    slug={member.profileSlug}
                    showAccentLine={false}
                    nameFontSize="1"
                  />
                );
              },
            )}
          </Grid>
        )}
      </ContentSection>
    </>
  );
};

export default members;
