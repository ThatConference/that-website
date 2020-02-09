import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import ContentSection from '../shared/ContentSection';
import LinkButton from '../shared/LinkButton';
import { below, above } from '../../utilities';

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
  cursor: pointer;

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

const GET_PARTNERS = gql`
  query getPartnerByLevel($eventId: ID!, $level: PartnershipLevel!) {
    events {
      event(id: $eventId) {
        partners {
          level(level: $level) {
            id
            slug
            companyName
            companyLogo
            placement
          }
        }
      }
    }
  }
`;

const SponsorHighlight = ({ className, eventSlug }) => {
  const { loading, error, data } = useQuery(GET_PARTNERS, {
    variables: { eventId: process.env.CURRENT_EVENT_ID, level: 'PIONEER' },
  });

  if (loading) return null;
  if (error) return null;

  const partners = data.events.event.partners.level.sort((a, b) => {
    if (a.placement < b.placement) {
      return -1;
    }
    if (a.placement > b.placement) {
      return 1;
    }
    return 0;
  });
  const havePartners = !!(partners && partners.length && partners.length > 0);
  return (
    <ContentSection className={className} id="sponsors">
      <Main>
        <HighlightImage src="/images/octopus_with_flag.png" loading="lazy" />
        <SideDetail>
          {havePartners && (
            <FeaturedPartners>
              <PartnerTitle>Our Featured Camp Partners</PartnerTitle>
              {partners.map(s => (
                <Link
                  key={s.id}
                  href="/partner/[slug]"
                  as={`/partner/${s.slug}`}
                >
                  <PartnerLogo
                    src={s.companyLogo}
                    alt={s.companyName}
                    loading="lazy"
                  />
                </Link>
              ))}
            </FeaturedPartners>
          )}
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
