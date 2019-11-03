import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Grid, Cell } from 'styled-css-grid';
import ContentSection from '../../components/shared/ContentSection';
import LinkButton from '../../components/shared/LinkButton';

const GET_PARTNER = gql`
  query getPartner($partnerId: ID!) {
    partner(id: $partnerId) {
      id
      year
      companyName
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
      jobListings {
        id
        title
        description
      }
    }
  }
`;

const BackToPartnersLink = styled.a`
  font-size: 14px;
  position: absolute;
  float: left;
  top: 0;
  margin-top: 50px;
  margin-left: 50px;
`;

const partnerDetail = ({ query }) => {
  const { loading, error, data } = useQuery(GET_PARTNER, {
    variables: { partnerId: query.id },
  });

  if (loading) return null;
  if (error) return null;

  return (
    <div>
      <ContentSection>
        <Grid columns="1fr" rows="1fr">
          <Cell center middle>
            <BackToPartnersLink href="/wi/partner-listing">
              {'<'}-- Back to Partners
            </BackToPartnersLink>
            <h3>{data.partner.companyName}</h3>
            <LinkButton
              href={data.partner.website}
              label="Connect with Us"
              color="thatBlue"
              borderColor="thatBlue"
            />
          </Cell>
        </Grid>
      </ContentSection>
    </div>
  );
};

partnerDetail.getInitialProps = ({ query }) => {
  return { query };
};

export default partnerDetail;
