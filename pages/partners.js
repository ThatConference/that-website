import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Grid, Cell } from 'styled-css-grid';
import { NextSeo } from 'next-seo';
import _ from 'lodash';
import ContentSection from '../components/shared/ContentSection';
import ImageContainer from '../components/shared/ImageContainer';
import LoadingIndicator from '../components/shared/LoadingIndicator';
import { below, gridRepeat } from '../utilities';

const GET_ALL_PARTNERS = gql`
  query getAllPartners {
    partners {
      all {
        id
        companyName
        companyLogo
        slug
      }
    }
  }
`;

const ImageCell = styled(Cell)`
  ${below.med`
    text-align: center;
  `};
`;

const HighlightImage = styled.img`
  max-height: 30rem;
  position: absolute;
  top: 3rem;
  margin-left: 6rem;
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

const PaddedImageContainer = styled(ImageContainer)`
  margin: 1rem 0.5rem;
  height: 13rem;
  width: 17rem;

  ${below.small`
    margin: 0.5rem auto;
  `};
`;

const Image = styled.img`
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  max-width: 14rem;
  max-height: 10rem;

  &:hover {
    cursor: pointer;
  }
`;

const partners = () => {
  const { loading, data } = useQuery(GET_ALL_PARTNERS);

  if (loading) return <LoadingIndicator />;

  return (
    <>
      <NextSeo
        title="All Partners - THAT Conference"
        description="We thank each and every one of our partners, across all levels for all of our years for their amazing support!"
      />

      <ContentSection>
        <Grid columns={gridRepeat.xsmall}>
          <Cell width={1}>
            <h1>Partners</h1>
            <p className="medium-body-copy">
              Since the start of THAT, it has been the continuous support from
              companies and organizations partnering with us to help create
              events that bring the community together. We thank each and every
              one of our partners, across all levels for all of our years for
              their amazing support!
            </p>
          </Cell>
          <ImageCell>
            <HighlightImage src="/images/moose_with_lantern.png" />
          </ImageCell>
        </Grid>
      </ContentSection>

      <ContentSection>
        <Grid columns={gridRepeat.xxsmall} alignContent="center">
          {_.sortBy(data.partners.all, p => p.companyName.toLowerCase()).map(
            partner => {
              return (
                <PaddedImageContainer key={partner.id}>
                  <Link href="/partner/[slug]" as={`/partner/${partner.slug}`}>
                    <Image
                      src={partner.companyLogo}
                      alt={partner.companyName}
                      loading="lazy"
                    />
                  </Link>
                </PaddedImageContainer>
              );
            },
          )}
        </Grid>
      </ContentSection>
    </>
  );
};

export default partners;
