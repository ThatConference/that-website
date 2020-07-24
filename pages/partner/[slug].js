import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Grid, Cell } from 'styled-css-grid';
import Imgix from 'react-imgix';
import _ from 'lodash';
import { NextSeo } from 'next-seo';
import pluralize from 'pluralize';
import ContentSection from '../../components/shared/ContentSection';
import Icon from '../../components/shared/Icon';
import HeroSection from '../../components/PartnerDetail/HeroSection';
import MainLogoSection from '../../components/PartnerDetail/MainLogoSection';
import PartnerDetailSubHeading from '../../components/PartnerDetail/PartnerDetailSubHeading';
import LoadingIndicator from '../../components/shared/LoadingIndicator';
import LinkButton from '../../components/shared/LinkButton/LinkButton';
import {
  ActionButtonRow,
  StyledP,
  StyledPre,
} from '../../components/shared/StandardStyles';

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
        city
        state
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
        jobListings(isFeatured: true) {
          id
          title
          description
          slug
        }
        members {
          id
          firstName
          lastName
          jobTitle
          partnerFeaturedOrder
          profileImage
        }
        sessions {
          id
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

const JobDescription = styled.p`
  position: relative;
  padding-right: 1rem;
  margin-top: 0;
  font-weight: 200;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
  margin-bottom: 0.25rem;

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
  width: 100%;
  color: ${({ theme }) => theme.colors.thatBlue};
  fill: ${({ theme }) => theme.colors.thatBlue};

  svg {
    vertical-align: middle;
    height: 2rem;
    margin-left: 1rem;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.highlight};
    fill: ${({ theme }) => theme.colors.highlight};
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
  <Icon
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

const getCityState = ({ partner }) => {
  if (partner.city || partner.state) {
    return <p>{`${partner.city}, ${partner.state}`}</p>;
  }
  return '';
};

const CompanyNotFound = () => (
  <MainDiv>
    <HeroSection
      companyName="Not Yet A THAT Partner"
      heroImageUrl=""
      connectWithUsUrl="/wi/2021/become-a-partner"
    />
    <ContentSection
      style={{
        display: 'flex',
        alignContent: 'center',
      }}
    >
      <p className="large-body-copy">
        We believe that by partnering with our sponsors not only can we help
        enable your goals but it also creates a more engaging environment for
        for our attendees. Engage with true practitioners, thought leaders and
        entrepreneurs while enjoying the perks of summer camp at a giant
        waterpark. Join us and become part of THAT family.
      </p>
      <ActionButtonRow>
        <LinkButton
          href="/wi/2021/become-a-partner"
          label="Become a Partner"
          color="thatBlue"
          borderColor="thatBlue"
          hoverBorderColor="thatBlue"
          hoverColor="white"
          hoverBackgroundColor="thatBlue"
        />
        <LinkButton
          href="/partners"
          label="View Past Partners"
          color="thatBlue"
          borderColor="thatBlue"
          hoverBorderColor="thatBlue"
          hoverColor="white"
          hoverBackgroundColor="thatBlue"
        />
      </ActionButtonRow>
    </ContentSection>
  </MainDiv>
);

function PartnerDetail() {
  const router = useRouter();

  const { loading, error, data } = useQuery(GET_PARTNER, {
    variables: { slug: router.query.slug },
    onCompleted(d) {
      const partner = d.partners.partnerBySlug;
      if (partner !== null) {
        let hostName = new URL(partner.website).hostname;
        if (hostName.toLowerCase().startsWith('www.')) {
          hostName = hostName.replace('www.', '');
        }
        partner.hostName = hostName;
      }
      return partner;
    },
  });

  if (loading)
    return (
      <ContentSection
        style={{
          minHeight: 'calc(100vh - 29rem)',
          display: 'flex',
          alignContent: 'center',
        }}
      >
        <LoadingIndicator />
      </ContentSection>
    );
  if (error) throw new Error(error);

  const { partnerBySlug: partner } = data.partners;

  if (partner === null) return <CompanyNotFound />;

  const AboutUs = () => (
    <>
      <PartnerDetailSubHeading>
        About {partner.companyName}
      </PartnerDetailSubHeading>
      <StyledPre>{partner.aboutUs}</StyledPre>
      <StyledP>{getCityState({ partner })}</StyledP>
    </>
  );

  const Goals = () => (
    <>
      <PartnerDetailSubHeading>{`Our ${pluralize(
        'Goal',
        partner.goals.length,
      )}`}</PartnerDetailSubHeading>
      <GoalsList>
        {partner.goals && partner.goals.map(goal => <li key={goal}>{goal}</li>)}
      </GoalsList>
    </>
  );

  const Jobs = () => (
    <>
      <PartnerDetailSubHeading style={{ paddingTop: '3.5rem' }}>
        {`Job ${pluralize('Listing', partner.jobListings.length)}`}
      </PartnerDetailSubHeading>
      {partner.jobListings &&
        _.sortBy(partner.jobListings, j => j.title.toLowerCase()).map(job => (
          <JobDiv key={job.id}>
            <Title>{job.title}</Title>
            <JobDescription>{job.description}</JobDescription>
            <div>
              <ViewLink href={`/partner/${partner.slug}/job/${job.slug}`}>
                <span>View Job</span>
                <ForwardArrow />
              </ViewLink>
            </div>
          </JobDiv>
        ))}
      <ViewLink href={`/partner/${partner.slug}/jobs`}>
        <span>View all Job Listings</span>
        <ForwardArrow />
      </ViewLink>
    </>
  );

  const filteredSessions = partner.sessions.filter(i => i !== null);
  const Sessions = () => (
    <>
      <PartnerDetailSubHeading style={{ paddingTop: '3.5rem' }}>
        {`${pluralize('Session', partner.sessions.length)} By ${
          partner.companyName
        }`}
      </PartnerDetailSubHeading>
      {filteredSessions &&
        _.sortBy(filteredSessions, s => s.title.toLowerCase()).map(session => (
          <Session key={session.id}>
            <Speaker>
              {session.speakers.map(speaker => (
                <SpeakerDetail speaker={speaker} key={speaker.id} />
              ))}
            </Speaker>
            <SessionDetail>
              <Title>{session.title}</Title>
              <StyledPre>{session.shortDescription}</StyledPre>
              {/* Uncomment once sessionb view is wired up */}
              {/* <ViewLink href="/">
                  <span>View Session</span>
                  <ForwardArrow />
                </ViewLink> */}
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
        />
        <MainLogoSection partner={partner} />

        <ContentSection>
          <MainGrid columns={gridRepeat.xsmall}>
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

PartnerDetail.headerType = 'layered';

export default PartnerDetail;
