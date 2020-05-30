import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Grid, Cell } from 'styled-css-grid';
import _ from 'lodash';
import Link from 'next/link';
import ThatLink from '../shared/ThatLink';
import ContentSection from '../shared/ContentSection';
import { gridRepeat, below } from '../../utilities';

const GET_EVENTS = gql`
  query activeEvents {
    communities(name: "that") {
      active {
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
`;

const Event = styled.div`
  position: relative;
  margin: auto;
  height: 750px;
  width: 400px;
  background-color: ${props => props.primaryColor};

  ${below.small`
      width: 300px;
  `};

  h1 {
    text-align: center;
    font-size: 5rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    color: ${({ theme }) => theme.colors.fonts.light};
    ${below.small`
      font-size: 3rem;
  `};
  }

  img {
    object-fit: cover;
    width: 100%;
  }

  div.description {
    padding: 1rem;
    text-align: center;

    p {
      color: ${({ theme }) => theme.colors.fonts.light};
    }
  }

  div.message {
    padding: 1rem;
    text-align: center;
    background-color: ${props => props.secondaryColor};
    bottom: 2rem;
    position: absolute;
    width: inherit;

    h5 {
      margin: 0;
      color: ${({ theme }) => theme.colors.fonts.light};
    }
  }
`;

const BroughtToYouBy = styled.h1`
  text-align: center;
  padding-top: 8rem;
  padding-bottom: 8rem;
`;

const PartnerImage = styled.img`
  width: 45rem;

  ${below.small`
      width: 25rem;
  `};
`;

const BecomeAPartner = styled.div`
  text-align: center;
  margin-top: 5rem;

  a {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.fonts.dark};
    text-decoration: underline;
  }
`;

const BuildEvent = e => {
  const primary = `#${e.theme.primary}`;
  const secondary = `#${e.theme.secondary}`;
  return (
    <Cell center>
      <Event primaryColor={primary} secondaryColor={secondary}>
        <h1>{e.name}</h1>
        <img src={e.theme.heroSlug} alt={e.name} />
        <div className="description">
          <p>{e.description}</p>
        </div>
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

const BuildPartner = p => {
  return (
    <Cell center>
      <Link href="/partner/[slug]" as={`/partner/${p.slug}`} prefetch={false}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a>
          <PartnerImage
            src={p.companyLogo}
            alt={p.companyName}
            loading="lazy"
          />
        </a>
      </Link>
    </Cell>
  );
};

const Events = ({ className }) => {
  const { loading, error, data } = useQuery(GET_EVENTS);

  if (loading) return null;

  if (error) {
    throw new Error(error);
  }

  let events = _.sortBy(data.communities.active, e => {
    return e.startDate;
  });

  // This will go away once the theme fields are added to the Graph result
  events = _.map(events, e => {
    e.theme.heroSlug = './images/landing_hero.jpg';
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
      <Grid
        columns={gridRepeat.xsmall}
        alignContent="center"
        justifyContent="space-between"
      >
        {events.map(e => {
          return BuildEvent(e);
        })}
      </Grid>
      <BroughtToYouBy>Events Brought To You By</BroughtToYouBy>
      <Grid
        columns={gridRepeat.xsmall}
        alignContent="center"
        justifyContent="space-between"
      >
        {partners.map(p => {
          return BuildPartner(p);
        })}
      </Grid>
      <BecomeAPartner>
        <ThatLink
          title="Becoma a Partner"
          href="/wi/become-a-partner/"
          isLocal
        />
      </BecomeAPartner>
    </ContentSection>
  );
};

export default styled(Events)``;
