import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Grid, Cell } from 'styled-css-grid';
import Imgix from 'react-imgix';
import _ from 'lodash';
import { NextSeo } from 'next-seo';
import LayeredHeaderLayout from '../../components/layouts/layeredHeader';
import ContentSection from '../../components/shared/ContentSection';
import Icon from '../../components/shared/Icon';
import HeroSection from '../../components/PartnerDetail/HeroSection';
import MainLogoSection from '../../components/PartnerDetail/MainLogoSection';
import PartnerDetailSubHeading from '../../components/PartnerDetail/PartnerDetailSubHeading';

import { below, gridRepeat } from '../../utilities';

const GET_PARTNER = gql`
  query getPartnerBySlug($slug: String!) {
    partners {
      partnerBySlug(slug: $slug) {
        id
        slug
        companyName
        companyLogo
        heroImage
        website
        goals
        aboutUs
        contactNumber
        linkedIn
        github
        youtube
        instagram
        twitter
        facebook
        twitch
        chat
        blog
        vlog
        city
        state
        jobListings {
          id
          title
          description
        }
        members {
          id
          firstName
          lastName
          jobTitle
          isSponsoredFeatured
          partnerFeaturedOrder
          profileImage
        }
        sessions {
          id
          isSponsored
          title
          shortDescription
          speakers {
            id
            firstName
            lastName
            profileImage
          }
        }
      }
    }
  }
`;

const MainDiv = styled.div`
  padding-bottom: 4rem;
`;

const MainGrid = styled(Grid)`
  grid-gap: 3rem;
`;

const StyledP = styled.p`
  padding-right: 1rem;
  margin-top: 0;
  font-weight: 200;
  line-height: 1.6;

  ${below.med`
    margin-top: 0;
  `};
`;

const JobDescription = styled.p`
  padding-right: 1rem;
  margin-top: 0;
  font-weight: 200;
  line-height: 1.6;

  ${below.med`
    margin-top: 0;
  `};
`;

const GoalsList = styled.ul`
  padding-inline-start: 2rem;
  font-weight: 200;
  line-height: 1.6;

  li {
    margin-bottom: 0.8rem;
  }
`;

const JobDiv = styled.div`
  margin-bottom: 3rem;
`;

const Title = styled.h5`
  margin-bottom: 0;
  margin-top: 0;
  font-weight: 500;
`;

const ViewLink = styled.a`
  font-size: 1.4rem;
  float: left;
  color: ${({ theme }) => theme.colors.thatBlue};
  svg {
    vertical-align: middle;
    height: 2rem;
    margin-left: 1rem;
  }
`;

const Name = styled.p`
  font-family: franklin-gothic-urw, sans-serif;
  line-height: 1;
  color: ${({ theme }) => theme.colors.fonts.dark};
  margin-bottom: 0.25rem;
  font-weight: 400;
  margin-top: 1rem;
  text-align: center;
`;

const Arrow = styled(Icon)`
  fill: ${({ theme }) => theme.colors.thatBlue};
`;

const Session = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 4rem;
`;

const Speaker = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 2rem;
`;

const SessionDetail = styled.div`
  display: flex;
  flex-direction: column;
`;

const SpeakerDetailBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ForwardArrow = () => (
  <Arrow
    icon="fullArrow"
    height="20"
    width="12"
    viewBoxHeight="100"
    viewBoxWidth="100"
  />
);
const SpeakerDetail = ({ speaker }) => (
  <SpeakerDetailBlock key={speaker.id}>
    <Imgix
      src={speaker.profileImage}
      width={90}
      height={90}
      imgixParams={{
        mask: 'ellipse',
        fit: 'facearea',
        facepad: 4,
      }}
    />
    <Name>
      {speaker.firstName}
      <br />
      {speaker.lastName}
    </Name>
  </SpeakerDetailBlock>
);

function PartnerDetail() {
  const router = useRouter();

  const { loading, error, data } = useQuery(GET_PARTNER, {
    variables: { slug: router.query.slug },
    onCompleted(d) {
      const partner = d.partners.partnerBySlug;
      let hostName = new URL(partner.website).hostname;
      if (hostName.toLowerCase().startsWith('www.')) {
        hostName = hostName.replace('www.', '');
      }
      partner.hostName = hostName;
      return partner;
    },
  });

  if (loading) return null;
  if (error) return null;

  const partner = data.partners.partnerBySlug;

  const AboutUs = () => (
    <>
      <PartnerDetailSubHeading>
        About {partner.companyName}
      </PartnerDetailSubHeading>
      <StyledP>{partner.aboutUs}</StyledP>
    </>
  );

  const Goals = () => (
    <>
      <PartnerDetailSubHeading>Our Goals</PartnerDetailSubHeading>
      <GoalsList>
        {partner.goals && partner.goals.map(goal => <li key={goal}>{goal}</li>)}
      </GoalsList>
    </>
  );

  const Jobs = () => (
    <>
      <PartnerDetailSubHeading style={{ paddingTop: '3.5rem' }}>
        Job Listings
      </PartnerDetailSubHeading>
      {partner.jobListings &&
        partner.jobListings.map(job => (
          <JobDiv key={job.id}>
            <Title>{job.title}</Title>
            <JobDescription>{job.description}</JobDescription>
          </JobDiv>
        ))}
      <ViewLink href="/">
        <span>View all Job Listings</span>
        <ForwardArrow />
      </ViewLink>
    </>
  );

  const Sessions = () => (
    <>
      <PartnerDetailSubHeading style={{ paddingTop: '3.5rem' }}>
        Session By {partner.companyName}
      </PartnerDetailSubHeading>
      {partner.sessions &&
        partner.sessions
          .filter(i => i !== null)
          .map(session => (
            <Session key={session.id}>
              <Speaker>
                {session.speakers.map(speaker => (
                  <SpeakerDetail speaker={speaker} key={speaker.id} />
                ))}
              </Speaker>
              <SessionDetail>
                <Title>{session.title}</Title>
                <StyledP>{session.shortDescription}</StyledP>
                <ViewLink href="/">
                  <span>View Session</span>
                  <ForwardArrow />
                </ViewLink>
              </SessionDetail>
            </Session>
          ))}
    </>
  );

  return (
    <>
      <NextSeo
        title={`${partner.companyName} - THAT Conference`}
        description={`Thank you to ${partner.companyName} for partnering with THAT Conference!`}
        canonical={`https://www.thatconference.com/partner/${partner.slug}`}
        openGraph={{
          images: [{ url: partner.companyLogo }],
        }}
      />
      <MainDiv>
        <HeroSection
          companyName={partner.companyName}
          heroImageUrl={partner.heroImage}
          connectWithUsUrl={partner.website}
          location="wi"
        />
        <MainLogoSection partner={partner} />

        <ContentSection>
          <MainGrid columns={gridRepeat.xxsmall}>
            <Cell>
              {!_.isEmpty(partner.aboutUs) && <AboutUs />}
              {!_.isEmpty(partner.sessions) && <Sessions />}
            </Cell>
            <Cell>
              {!_.isEmpty(partner.goals) && <Goals />}
              {!_.isEmpty(partner.jobListings) && <Jobs />}
            </Cell>
          </MainGrid>
        </ContentSection>
      </MainDiv>
    </>
  );
}

PartnerDetail.Layout = LayeredHeaderLayout;

export default PartnerDetail;
