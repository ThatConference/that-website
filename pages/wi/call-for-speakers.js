import React, { Component } from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import Head from 'next/head';

import { below, DEFAULT_WIP_PAGE } from '../../utilities';
import ContentSection from '../../components/shared/ContentSection';
import LinkButton from '../../components/shared/LinkButton';

const Callout = styled.span`
  color: ${({ theme }) => theme.colors.tertiary};
  font-family: franklin-gothic-urw-comp, sans-serif;
  font-size: 2.8rem;
  text-transform: uppercase;
  line-height: 1;
`;

const HeaderSection = styled(ContentSection)`
  margin-bottom: 10rem;
`;

const BecomeACounselor = styled(LinkButton)`
  margin-left: 0;
`;

const SummerCamp = styled(ContentSection)`
  height: 83rem;
  margin-bottom: 14rem;
`;

const SpeakerH3 = styled.h3`
  margin-top: 15rem;
  margin-bottom: 2.5rem;
  margin-left: 0;
  font-weight: 100;
`;

const MegaphoneBear = styled.img`
  margin-top: 23rem;
  max-height: 60rem;

  ${below.large`
    height: 20rem;
  `};
`;

const TalkIdeas = styled(ContentSection)`
  margin-bottom: 5rem;
`;

const TalkIdeasText = styled.div`
  width: 90rem;
  margin: auto;
  text-align: center;
  font-size: 2.8rem;
  color: ${({ theme }) => theme.colors.fonts.dark};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const TalkIdeasButtons = styled.div`
  text-align: center;
  div {
    text-align: center;
    display: inline-block !important;

    &:first-child {
      margin-right: 2rem;
    }
  }
`;

const TalkIdeasButton = styled(LinkButton)`
  text-align: center;
  display: inline-block;
`;

const ProcessAndDates = styled(ContentSection)`
  margin-bottom: 5rem;

  h3 {
    font-size: 3.5rem;
    text-transform: unset;
    color: ${({ theme }) => theme.colors.fonts.dark};
    font-weight: 100;
  }
`;

const ProcessAndDatesGrid = styled(Grid)`
  grid-gap: 14rem;
`;

const CallForSpeakers = props => (
  <div>
    <Head>
      <title key="title">Call for Speakers - THAT Conference</title>
    </Head>

    <HeaderSection>
      <Grid columns="repeat(auto-fit,minmax(320px,1fr))">
        <Cell>
          <Callout>Submissions Starting January 1, 2020</Callout>
          <h1 style={{ marginTop: 0, marginRight: '100px' }}>
            Call for Speakers
          </h1>
        </Cell>
        <Cell>
          <p className="large-body-copy">
            Are you ready to speak at the biggest tech stage in the midwest? We
            are searching for hour-long talks, half and full-day workshops, and
            keynotes that bring value to our audience. We want talks and
            workshops to appeal to developers, designers, bloggers, business
            owners, site builders, translators, community organizers, and
            everything in between.
          </p>
          <BecomeACounselor
            href={`/${DEFAULT_WIP_PAGE}`}
            borderColor="thatBlue"
            color="thatBlue"
            backgroundColor="white"
            label="Become a Counselor"
          />
        </Cell>
      </Grid>
    </HeaderSection>

    <SummerCamp backgroundColor="primary" fontColor="light" hasTrees>
      <Grid columns="repeat(auto-fit,minmax(320px,1fr))">
        <Cell>
          <div>
            <SpeakerH3 style={{ color: 'white' }}>
              Summer Camp for Geeks
            </SpeakerH3>
            <span className="large-body-copy">
              THAT Conference is the largest tech event in the US Midwest and
              it’s held at a waterpark. We are a family-friendly conference and
              encourage children (geeklings) to submit talks as well! We are
              looking for counselors on a wide variety of topics and
              backgrounds. Do you have a story to tell? Do you have expertise in
              a specific field to share? We want to hear from you!
            </span>
          </div>
        </Cell>
        <Cell>
          <MegaphoneBear src="/images/bear-pig.png" />
        </Cell>
      </Grid>
    </SummerCamp>
    <TalkIdeas>
      <TalkIdeasText>
        Looking For Talk Ideas? Check Out A Select List of Previous Years
        Sessions. Need More Ideas For workshops? Then This List Is For You!
      </TalkIdeasText>
      <TalkIdeasButtons>
        <TalkIdeasButton
          href={`/${DEFAULT_WIP_PAGE}`}
          borderColor="thatBlue"
          color="thatBlue"
          backgroundColor="white"
          label="Past Sessions"
        />
        <TalkIdeasButton
          href={`/${DEFAULT_WIP_PAGE}`}
          borderColor="thatBlue"
          color="thatBlue"
          backgroundColor="white"
          label="Past Workshops"
        />
      </TalkIdeasButtons>
    </TalkIdeas>
    <ProcessAndDates>
      <ProcessAndDatesGrid columns="repeat(auto-fit,minmax(320px,1fr))">
        <Cell>
          <h3>Format and Application Process</h3>
        </Cell>
        <Cell>
          <h3>Key dates you need to know</h3>
        </Cell>
      </ProcessAndDatesGrid>
    </ProcessAndDates>
  </div>
);

export default CallForSpeakers;
