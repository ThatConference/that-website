import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import debug from 'debug';
import ContentSection from '../shared/ContentSection';
import LinkButton from '../shared/LinkButton';
import { below, above } from '../../utilities';

const dlog = debug('that:home:sponsor_highlight');

const GET_PARTNERS_BY_LEVEL = gql`
  query getPartnerByLevel($eventId: ID!, $level: PartnershipLevel!) {
    events {
      event(id: $eventId) {
        partners {
          level(level: $level) {
            companyName
            companyLogo
            id
            placement
          }
        }
      }
    }
  }
`;

const HighlightImage = styled.img`
  width: 100%;
  padding: 0 5rem;
  max-width: 40rem;
  object-fit: cover;
  height: 100%;

  ${below.large`
    display: none;
  `};
`;

const Main = styled.div`
  display: flex;
  flex-direction: row;

  ${below.large`
    flex-direction: column;
    align-items: center;
  `};
`;

const SideDetail = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 2rem;
`;

const FeaturedPartners = styled.div`
  display: flex;
  align-items: center;

  ${below.med`
    flex-direction: column;
  `};
`;

const PartnerTitle = styled.h3`
  width: 30rem;
  color: ${({ theme }) => theme.colors.fonts.dark};
  margin: 0;

  ${below.med`
    width: 100%;
  `};
`;

const PartnerLogo = styled.img`
  height: 13rem;
  margin: 1rem;
  align-self: flex-end;

  ${below.med`
    align-self: auto;
  `};
`;

const TextBlock = styled.div`
  display: flex;
  align-items: center;

  ${below.med`
    flex-direction: column;
    align-items: stretch;
  `};
`;

const PartnerUpLink = styled(LinkButton)`
  ${above.med`
    margin: 0 0 0 2rem;
  `}
`;

const SponsorHighlight = ({ className, eventSlug }) => {
  const { loading, error, data } = useQuery(GET_PARTNERS_BY_LEVEL, {
    variables: {
      eventId: 'ByE7Dc7eCGcRFzLhWhuI',
      level: 'PIONEER',
    },
  });

  if (loading) return null;
  if (error) {
    dlog('error %o', error);
    return null;
  }

  const { level } = data.events.event.partners;

  dlog('partners %o', level);

  return (
    <ContentSection className={className} id="sponsors">
      <Main>
        <HighlightImage src="/images/octopus_with_flag.png" loading="lazy" />
        <SideDetail>
          <FeaturedPartners>
            <PartnerTitle>Our Featured Camp Partners</PartnerTitle>
            {level.map(partner => {
              return (
                <PartnerLogo
                  src={partner.companyLogo}
                  alt={partner.companyName}
                  loading="lazy"
                />
              );
            })}
          </FeaturedPartners>
          <p className="large-body-copy" style={{ margin: '0.5rem 0' }}>
            Interested In Partner Opportunities?
          </p>
          <TextBlock>
            <p style={{ margin: '0.5rem 0' }}>
              We partner with industry leading organizations and companies that
              are looking to connect with software developers and practitioners.
            </p>
            <PartnerUpLink
              href={`${eventSlug}/become-a-partner`}
              label="Let's Partner Up"
              className="stretch-sm"
              hoverBorderColor="thatBlue"
              hoverColor="white"
              hoverBackgroundColor="thatBlue"
            />
          </TextBlock>
        </SideDetail>
      </Main>
    </ContentSection>
  );
};

export default styled(SponsorHighlight)``;
