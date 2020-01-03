import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Grid, Cell } from 'styled-css-grid';

import ContentSection from '../../components/shared/ContentSection';
import ImageContainer from '../../components/shared/ImageContainer';
import LinkButton from '../../components/shared/LinkButton';
import { below } from '../../utilities/breakpoint';

const GET_PARTNERS = gql`
  query getPartners {
    partners {
      all {
        id
        slug
        year
        partnershipLevel
        companyName
        companyLogo
        heroImage
        website
      }
    }
  }
`;

const Header = styled.h1`
  margin-bottom: 0;
  margin-right: 50px;
`;

const RobotImage = styled.img`
  height: 50rem;
  float: right;
  margin-right: 3.5rem;

  ${below.med`
    margin-top: 2rem;
    margin-right: unset;
    height: 40rem;
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
`;

const PaddedImageContainer = styled(ImageContainer)`
  margin: 3rem;
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
      <Link href="/wi/partner/[slug]" as={`/wi/partner/${partner.slug}`}>
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
  const { loading, error, data } = useQuery(GET_PARTNERS);

  if (loading) return null;
  if (error) return null;

  const partners = data.partners.all;
  return (
    <div>
      <ContentSection>
        <Grid columns="repeat(auto-fit,minmax(32rem,1fr))">
          <Cell>
            <Header>2019 Partners</Header>
            <LinkButton
              href="/wi/become-a-partner"
              label="Become a Partner"
              color="thatBlue"
              borderColor="thatBlue"
              hoverBorderColor="thatBlue"
              hoverColor="white"
              hoverBackgroundColor="thatBlue"
            />
            <RobotImage src="/images/robot.png" />
          </Cell>
          <Cell>
            <p className="large-body-copy">
              THAT Conference wouldn’t be possible without the support of our
              partners. A large portion of the conference costs are paid from
              sponsorships so that we can keep ticket costs affordable. Please
              take a few minutes to learn about our partners and let them know
              you appreciate their support of our community!
            </p>
          </Cell>
        </Grid>
      </ContentSection>
      <ContentSection>
        <PartnerLevelTitle>Pioneer Partners</PartnerLevelTitle>
        <Partners>
          {partners.map(value => {
            if (value.partnershipLevel === 'PIONEER') {
              return renderPartner(value, '60.9rem', '38.7rem', '32.3rem');
            }
            return null;
          })}
        </Partners>
      </ContentSection>
      <ContentSection>
        <PartnerLevelTitle>Explorer Partners</PartnerLevelTitle>
        <Partners>
          {partners.map(value => {
            if (value.partnershipLevel === 'EXPLORER') {
              return renderPartner(value, '39.9rem', '25.5rem', '28rem');
            }
            return null;
          })}
        </Partners>
      </ContentSection>
      <ContentSection>
        <PartnerLevelTitle>Scout Partners</PartnerLevelTitle>
        <Partners>
          {partners.map(value => {
            if (value.partnershipLevel === 'SCOUT') {
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
            if (value.partnershipLevel === 'PATRON') {
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
            if (value.partnershipLevel === 'MEDIA') {
              return renderPartner(value, '25.7rem', '16.7rem', '17.7rem');
            }
            return null;
          })}
        </Partners>
      </ContentSection>
    </div>
  );
};

export default partnerListing;
