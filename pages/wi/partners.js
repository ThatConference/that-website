import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Grid, Cell } from 'styled-css-grid';
import { NextSeo } from 'next-seo';
import debug from 'debug';

import ContentSection from '../../components/shared/ContentSection';
import ImageContainer from '../../components/shared/ImageContainer';
import LinkButton from '../../components/shared/LinkButton';
import { below } from '../../utilities/breakpoint';

const dlog = debug('that:partners');

const GET_PARTNERS = gql`
  query getPartners($eventId: ID!) {
    events {
      event(id: $eventId) {
        get {
          id
          name
          year
          partners {
            id
            slug
            level
            placement
            companyName
            companyLogo
            heroImage
            website
          }
        }
      }
    }
  }
`;

const RobotImage = styled.img`
  height: 45rem;
  margin-left: 4rem;
  transform: scaleX(-1);
  position: relative;
  top: -5rem;

  ${below.large`
    top: 0;
    height: 40rem;
  `};

  ${below.small`
    display: none;
  `};
`;

const PartnerLevelTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 0;
  text-align: center;
  text-transform: uppercase;
`;

const Partners = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Image = styled.img`
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  max-width: ${({ maxWidth }) => maxWidth};
  padding: 1.25rem;
`;

const TopContentSection = styled(ContentSection)`
  padding-bottom: 0;

  ${below.xlarge`
    padding-bottom: 5rem;
  `};
`;

const PioneerContentSection = styled(ContentSection)`
  padding-top: 0;

  ${below.xlarge`
    padding-top: 5rem;
  `};
`;

const PaddedImageContainer = styled(ImageContainer)`
  margin: 1rem;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: left;

  a {
    margin-left: 0;
    float: left;
  }

  a:not(:last-child) {
    margin-right: 2rem;
  }

  ${below.small`
    flex-direction: column;
    align-items: stretch;
  `};
`;

const renderPartner = (
  partner,
  containerWidth,
  containerHeight,
  imageMaxWidth,
) => {
  return (
    <PaddedImageContainer
      width={containerWidth}
      height={containerHeight}
      key={partner.id}
    >
      <Link href="/partner/[slug]" as={`/partner/${partner.slug}`}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a>
          <Image
            maxWidth={imageMaxWidth}
            src={partner.companyLogo}
            alt={partner.companyName}
            loading="lazy"
          />
        </a>
      </Link>
    </PaddedImageContainer>
  );
};

const partnerListing = () => {
  const { loading, error, data } = useQuery(GET_PARTNERS, {
    variables: {
      eventId: process.env.CURRENT_EVENT_ID,
    },
  });

  if (loading) return null;
  if (error) {
    dlog('error %o', error);
    return null;
  }

  dlog('data %o', data.events.event.get.partners);

  const partners = data.events.event.get.partners.sort((a, b) => {
    if (a.placement < b.placement) return -1;
    if (a.placement > b.placement) return 1;
    return 0;
  });
  const eventYear = data.events.event.get.year;

  dlog('partners %o', partners);
  return (
    <div>
      <NextSeo
        title={`${eventYear} WI Partners - THAT Conference`}
        description="THAT Conference wouldn’t be possible without the support of our partners. A large portion of the conference costs are paid from sponsorships so that we can keep ticket costs affordable."
      />

      <TopContentSection>
        <Grid columns="repeat(auto-fit,minmax(32rem,1fr))">
          <Cell>
            <h1>{eventYear} Partners</h1>
            <p className="medium-body-copy">
              THAT Conference wouldn’t be possible without the support of our
              partners. A large portion of the conference costs are paid from
              sponsorships so that we can keep ticket costs affordable. Please
              take a few minutes to learn about our partners and let them know
              you appreciate their support of our community!
            </p>
            <ActionButtons>
              <LinkButton
                href="/wi/become-a-partner"
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
            </ActionButtons>
          </Cell>
          <Cell center>
            <RobotImage src="/images/robot.png" />
          </Cell>
        </Grid>
      </TopContentSection>
      <PioneerContentSection>
        <PartnerLevelTitle>Pioneer Partners</PartnerLevelTitle>
        <Partners>
          {partners.map(value => {
            if (value.level === 'PIONEER') {
              return renderPartner(value, '48rem', '31rem', '37rem');
            }
            return null;
          })}
        </Partners>
      </PioneerContentSection>
      <ContentSection>
        <PartnerLevelTitle>Explorer Partners</PartnerLevelTitle>
        <Partners>
          {partners.map(value => {
            if (value.level === 'EXPLORER') {
              return renderPartner(value, '37rem', '23rem', '30rem');
            }
            return null;
          })}
        </Partners>
      </ContentSection>
      <ContentSection>
        <PartnerLevelTitle>Scout Partners</PartnerLevelTitle>
        <Partners>
          {partners.map(value => {
            if (value.level === 'SCOUT') {
              return renderPartner(value, '31.2rem', '20.3rem', '21.5rem');
            }
            return null;
          })}
        </Partners>
      </ContentSection>
      <ContentSection>
        <PartnerLevelTitle>Patron Partners</PartnerLevelTitle>
        <Partners>
          {partners.map(value => {
            if (value.level === 'PATRON') {
              return renderPartner(value, '25.7rem', '16.7rem', '17.7rem');
            }
            return null;
          })}
        </Partners>
      </ContentSection>
      <ContentSection>
        <PartnerLevelTitle>Media Partners</PartnerLevelTitle>
        <Partners>
          {partners.map(value => {
            if (value.level === 'MEDIA') {
              return renderPartner(value, '21rem', '14rem', '14.5rem');
            }
            return null;
          })}
        </Partners>
      </ContentSection>
    </div>
  );
};

export default partnerListing;
