import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Grid, Cell } from 'styled-css-grid';
import _ from 'lodash';
import Link from 'next/link';

import ContentSection from '../shared/ContentSection';
import LinkButton from '../shared/LinkButton/LinkButton';
import TopPartners from '../shared/TopPartners';
import { gridRepeat, below } from '../../utilities';

const GET_EVENTS = gql`
  query activeEvents($communityInput: CommunityQueryInput!) {
    communities {
      community(input: $communityInput) {
        get {
          id
          name
          events(filter: ACTIVE) {
            id
            name
            slug
            slogan
            description
            startDate
            endDate
            website
            partners {
              id
              slug
              level
              placement
              companyName
              companyLogo
            }
            notifications {
              id
              shouldFeature
              title
              message
              startDate
              endDate
              link
              linkText
            }
            theme {
              primary
              secondary
              heroSlug
            }
          }
        }
      }
    }
  }
`;

const EventsGrid = styled(Grid)`
  ${below.xsmall`
    display: block;
  `};
`;

const Event = styled.div`
  position: relative;
  margin: auto;
  height: 750px;
  width: 400px;
  background-color: ${props => props.primaryColor};
  margin-bottom: 4rem;

  ${below.small`
    width: 80%;
  `};

  img {
    object-fit: cover;
    width: 100%;
  }

  div.message {
    padding: 1rem;
    text-align: center;
    background-color: ${props => props.secondaryColor};
    bottom: 2rem;
    position: absolute;
    width: 100%;

    h5 {
      margin: 0;
      color: ${({ theme }) => theme.colors.fonts.light};
      font-weight: 400;
    }
  }
`;

const EventHeading = styled.h3`
  ext-align: center;
  font-size: 5rem;
  padding: 1rem;
  color: ${({ theme }) => theme.colors.fonts.light};
  margin: 0.75rem 0 0.25rem;

  ${below.small`
    font-size: 3rem;
  `};
`;

const EventLink = styled(LinkButton)`
  ${below.small`
    width: auto;
  `};

  border-color: ${props => props.secondaryColor};
  p {
    color: ${props => props.secondaryColor};
  }

  &:hover {
    border-color: ${props => props.secondaryColor};
    background-color: ${props => props.secondaryColor};
    p {
      color: ${({ theme }) => theme.colors.fonts.light};
    }
  }
`;

const Description = styled.p`
  padding: 1rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.fonts.light};
`;

const BuildEvent = e => {
  const primary = `#${e.theme.primary}`;
  const secondary = `#${e.theme.secondary}`;

  return (
    <Cell center key={e.slug}>
      <Event primaryColor={primary} secondaryColor={secondary}>
        <EventHeading>{e.name}</EventHeading>
        <img src={e.theme.heroSlug} alt={e.name} />
        <Description>{e.description}</Description>
        <EventLink
          href={`/${e.slug}`}
          label="Visit Camp"
          primaryColor={primary}
          secondaryColor={secondary}
        />
        <div className="message">
          <Link href={e.featuredNotification.link} prefetch={false}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a>
              <h5>{e.featuredNotification.title}</h5>
              <h5>{e.featuredNotification.linkText}</h5>
            </a>
          </Link>
        </div>
      </Event>
    </Cell>
  );
};

const Events = ({ className }) => {
  const { loading, error, data } = useQuery(GET_EVENTS, {
    variables: {
      communityInput: {
        slug: 'that',
      },
    },
  });

  if (loading) return null;

  if (error) {
    throw new Error(error);
  }

  // let events = _.sortBy(data.communities.active, e => {
  let events = _.sortBy(data.communities.community.get.events, e => {
    return e.startDate;
  });

  // This will go away once the theme fields are added to the Graph result
  events = _.map(events, e => {
    e.featuredNotification = _.find(e.notifications, n => {
      return n.shouldFeature === true;
    }) || {
      title: 'Some Amazing Announcement!',
      linkText: 'Find Out More!',
      link: 'http://www.thatconference.com/wi',
    };
    return e;
  });

  let partners = [];
  _.each(events, e => {
    const pioneers = _.filter(e.partners, p => {
      return p.level === 'PIONEER';
    });
    partners = partners.concat(pioneers);
  });
  partners = _.uniqBy(partners, 'id');
  partners = _.sortBy(partners, p => {
    return p.placement;
  });

  return (
    <ContentSection className={className}>
      <EventsGrid
        columns={gridRepeat.small}
        alignContent="center"
        justifyContent="space-between"
      >
        {events.map(e => {
          return BuildEvent(e);
        })}
      </EventsGrid>
      <TopPartners
        partners={partners}
        title="Events Brought To You By"
        becomePartnerLink="/wi/2021/become-a-partner"
      />
    </ContentSection>
  );
};

export default styled(Events)``;
