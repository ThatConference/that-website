import React from 'react';
import Head from 'next/head';
import { Grid, Cell } from 'styled-css-grid';
import styled from 'styled-components';
import ContentSection from '../../components/shared/ContentSection';
import LinkButton from '../../components/shared/LinkButton';
import { below, gridRepeat, DEFAULT_WIP_PAGE } from '../../utilities';
import ProfileItem from '../../components/shared/ProfileItem';

const ImageCell = styled(Cell)`
  ${below.med`
    text-align: center;
  `};
`;

const HighlightImage = styled.img`
  max-height: 40rem;
  transform: scaleX(-1);
  position: absolute;
  top: 0;
  margin-left: 6rem;

  ${below.small`
    margin-left: 0;
    width: 90%;
  `};

  ${below.med`
    position: relative;
    margin-top: 2rem;
  `};
`;

const Speakers = styled.div`
  display: flex;
`;

const PastSpeakerContent = styled.div`
  padding: 0 22rem;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: row;

  p {
    padding-right: 2rem;
  }
`;

const mockSpeakers = [
  {
    firstName: 'Sara',
    lastName: 'Gibbons',
    company: 'Unspecified',
    title: 'Practitionaer AF',
    profileImage:
      'https://that.imgix.net/members/a19edc22-0739-4ef2-b8fb-d77f724c6f64.jpeg',
  },
  {
    firstName: 'Jane',
    lastName: 'Chapman',
    company: 'Everywhere',
    title: 'Getting It Done!',
    profileImage:
      'https://that.imgix.net/members/a19edc22-0739-4ef2-b8fb-d77f724c6f64.jpeg',
  },
];

const speakers = () => {
  return (
    <>
      <Head>
        <title key="title">Speakers - THAT Conference</title>
      </Head>

      <ContentSection>
        <Grid columns={gridRepeat.xsmall}>
          <Cell width={1}>
            <h1 style={{ marginBottom: '0.5rem' }}>
              THAT Conference 2019 Speakers
            </h1>
            <p className="medium-body-copy">
              Take a look at who will be speaking and hosting workshops this
              year. Explore and connect an nonumy eirmod tempor invidunt ut
              labore et dolore magna aliquyam
            </p>
            <LinkButton
              href={DEFAULT_WIP_PAGE}
              label="View Schedule"
              color="thatBlue"
              borderColor="thatBlue"
              hoverBorderColor="thatBlue"
              hoverColor="white"
              hoverBackgroundColor="thatBlue"
            />
          </Cell>
          <ImageCell>
            <HighlightImage src="/images/robot.png" />
          </ImageCell>
        </Grid>
      </ContentSection>

      <ContentSection>
        <h2>2019 Camp Counselors</h2>
        <Speakers>
          {mockSpeakers.map(speaker => {
            return (
              <ProfileItem
                imageUrl={speaker.profileImage}
                size="150"
                name={`${speaker.firstName} ${speaker.lastName}`}
                title={speaker.title}
                company={speaker.company}
                showAccentLine={false}
              />
            );
          })}
        </Speakers>
      </ContentSection>

      <ContentSection>
        <PastSpeakerContent>
          <h5>Our Past Speakers</h5>
          <Detail>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            </p>
            <LinkButton
              href={DEFAULT_WIP_PAGE}
              label="View Past Speakers"
              color="thatBlue"
              borderColor="thatBlue"
              hoverBorderColor="thatBlue"
              hoverColor="white"
              hoverBackgroundColor="thatBlue"
            />
          </Detail>
        </PastSpeakerContent>
      </ContentSection>
    </>
  );
};

export default speakers;
