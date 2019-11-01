import React, { Component } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Grid, Cell } from 'styled-css-grid';
import ContentSection from '../../components/shared/ContentSection';
import LinkButton from '../../components/shared/LinkButton';

const GET_PARTNERS = gql`
  query getPartners {
    partners {
      id
      year
      partnershipLevel
      companyName
      companyLogo
      heroImage
      website
    }
  }
`;

const RobotImage = styled.img`
  height: 500px;
  float: right;
  margin-top: -200px;
  margin-right: 35px;
`;

const PartnerLevelTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 0;
  text-align: center;
  text-transform: uppercase;
`;

const PartnerImageContainer = styled.div`
  margin-top: 50px;
  text-align: center;
  display: grid;
  background-color: #fafafa;
`;

const PartnerImage = styled.img`
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const PioneerImageContainer = styled(PartnerImageContainer)`
  width: 609px;
  height: 387px;
`;

const PioneerImage = styled(PartnerImage)`
  max-width: 373px;
`;

const ExplorerImageContainer = styled(PartnerImageContainer)`
  width: 399px;
  height: 255px;
`;

const ExplorerImage = styled(PartnerImage)`
  max-width: 280px;
`;

const ScoutImageContainer = styled(PartnerImageContainer)`
  width: 312px;
  height: 203px;
`;

const ScoutImage = styled(PartnerImage)`
  max-width: 215px;
`;

const PatronImageContainer = styled(PartnerImageContainer)`
  width: 257px;
  height: 167px;
`;

const PatronImage = styled(PartnerImage)`
  max-width: 177px;
`;

const MediaImageContainer = styled(PartnerImageContainer)`
  width: 257px;
  height: 167px;
`;

const renderPioneerPartner = partner => {
  return (
    <PioneerImageContainer key={partner.id}>
      <PioneerImage src={partner.companyLogo} alt={partner.companyName} />
    </PioneerImageContainer>
  );
};

const renderExplorerPartner = partner => {
  return (
    <ExplorerImageContainer key={partner.id}>
      <ExplorerImage src={partner.companyLogo} alt={partner.companyName} />
    </ExplorerImageContainer>
  );
};

const renderScoutPartner = partner => {
  return (
    <ScoutImageContainer key={partner.id}>
      <ScoutImage src={partner.companyLogo} alt={partner.companyName} />
    </ScoutImageContainer>
  );
};

const renderPatronPartner = partner => {
  return (
    <PatronImageContainer key={partner.id}>
      <PatronImage src={partner.companyLogo} alt={partner.companyName} />
    </PatronImageContainer>
  );
};

const renderMediaPartner = partner => {
  return (
    <MediaImageContainer key={partner.id}>
      <PatronImage src={partner.companyLogo} alt={partner.companyName} />
    </MediaImageContainer>
  );
};

const partnerListing = props => {
  const { loading, error, data } = useQuery(GET_PARTNERS);

  if (loading) return null;
  if (error) return null;

  return (
    <div>
      <ContentSection>
        <Grid columns="repeat(auto-fit,minmax(320px,1fr))">
          <Cell>
            <h1
              style={{
                marginTop: 0,
                marginBottom: 0,
                marginRight: '50px',
              }}
            >
              2019 Sponsors & Partners
            </h1>
            <div
              style={{ display: 'flex', textAlign: 'left', marginTop: '20px;' }}
            >
              <LinkButton
                href="/wi/become-a-partner"
                label="Become a Partner"
                color="thatBlue"
                borderColor="thatBlue"
              />
            </div>
            <RobotImage src="/images/robot.png" />
          </Cell>
          <Cell>
            <p className="large-body-copy">
              THAT Conference wouldn’t be possible without the support of our
              sponsors and partners. A large portion of the conference costs are
              paid from sponsorships so that we can keep ticket costs
              affordable. Please take a few minutes to learn about our sponsors
              and let them know you appreciate their support of our community!
            </p>
          </Cell>
        </Grid>
      </ContentSection>
      <ContentSection>
        <PartnerLevelTitle>Pioneer Partners</PartnerLevelTitle>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          }}
        >
          {data.partners.map(value => {
            if (value.partnershipLevel === 'PIONEER') {
              return renderPioneerPartner(value);
            }
          })}
        </div>
      </ContentSection>
      <ContentSection>
        <PartnerLevelTitle>Explorer Partners</PartnerLevelTitle>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          }}
        >
          {data.partners.map(value => {
            if (value.partnershipLevel === 'EXPLORER') {
              return renderExplorerPartner(value);
            }
          })}
        </div>
      </ContentSection>
      <ContentSection>
        <PartnerLevelTitle>Scout Partners</PartnerLevelTitle>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          }}
        >
          {data.partners.map(value => {
            if (value.partnershipLevel === 'SCOUT') {
              return renderScoutPartner(value);
            }
          })}
        </div>
      </ContentSection>
      <ContentSection>
        <PartnerLevelTitle>Patron Partners</PartnerLevelTitle>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          }}
        >
          {data.partners.map(value => {
            if (value.partnershipLevel === 'PATRON') {
              return renderPatronPartner(value);
            }
          })}
        </div>
      </ContentSection>
      <ContentSection>
        <PartnerLevelTitle>Media Partners</PartnerLevelTitle>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          }}
        >
          {data.partners.map(value => {
            if (value.partnershipLevel === 'MEDIA') {
              return renderMediaPartner(value);
            }
          })}
        </div>
      </ContentSection>
    </div>
  );
};

export default partnerListing;
