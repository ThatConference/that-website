import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Grid, Cell } from 'styled-css-grid';
import { NextSeo } from 'next-seo';
import { sortBy } from 'lodash';
import ContentSection from '../components/shared/ContentSection';
import ImageContainer from '../components/shared/ImageContainer';
import LinkButton from '../components/shared/LinkButton/LinkButton';
import SkeletonLoader from '../components/shared/SkeletonLoader';
import { below, gridRepeat } from '../utilities';
import { HeroGraphicDiv } from '../components/shared/StandardStyles';

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

const HighlightImage = styled.img`
  max-height: 30rem;
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
  margin: 1rem 1rem;
  height: 13rem;
  width: 17rem;
  background-color: ${({ theme }) => theme.colors.white};

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

const PartnerSearchBox = styled.div`
  min-width: 40rem;
  margin: auto;
  max-width: 80rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  padding: 2rem;
`;

const PartnerSearchTitle = styled.h5`
  text-align: center;
  margin-bottom: 0;
  margin-top: 1rem;
`;

const PartnerSearchInput = styled.input`
  width: 40rem;
`;

const PartnerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  justify-content: center;
`;

const partners = () => {
  const [searchText, setSearchText] = useState('');
  const { loading, data } = useQuery(GET_ALL_PARTNERS);

  const partnerMatchSearch = partner =>
    partner.companyName.toLowerCase().includes(searchText.toLowerCase());

  const searchedPartners = () => {
    if (loading) return [];
    return searchText.length > 0
      ? data.partners.all.filter(partnerMatchSearch)
      : data.partners.all;
  };

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
            <LinkButton
              href="/wi/2021/become-a-partner"
              label="Become a Partner"
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
      <ContentSection backgroundColor="offWhite" hasTrees="true">
        <PartnerSearchBox>
          <PartnerSearchTitle>
            Looking to connect with a THAT Partner? Awesome! Let us help...
          </PartnerSearchTitle>
          <PartnerSearchInput
            id="search-partners"
            type="text"
            name="searchPartnersText"
            placeholder="Name of partner you are searching for"
            onChange={e => setSearchText(e.target.value)}
          />
        </PartnerSearchBox>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <SkeletonLoader />
          </div>
        )}
        {!loading && (
          <PartnerContainer>
            {sortBy(searchedPartners(), p => p.companyName.toLowerCase()).map(
              partner => {
                return (
                  <PaddedImageContainer key={partner.id}>
                    <Link
                      href="/partner/[slug]"
                      as={`/partner/${partner.slug}`}
                      prefetch={false}
                    >
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
          </PartnerContainer>
        )}
      </ContentSection>
    </>
  );
};

export default partners;
