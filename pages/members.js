import React from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Cell } from 'styled-css-grid';
import { NextSeo } from 'next-seo';
import _ from 'lodash';
import ContentSection from '../components/shared/ContentSection';
import { below, gridRepeat } from '../utilities';
import LinkButton from '../components/shared/LinkButton/LinkButton';
import SquareButton from '../components/shared/SquareButton';
import LoadingIndicator from '../components/shared/LoadingIndicator';
import ProfileItem from '../components/shared/ProfileItem';
import {
  HeroGraphicDiv,
  Placeholder,
} from '../components/shared/StandardStyles';

const GET_MEMBERS = gql`
  query getMembers($after: String) {
    members {
      members(after: $after, orderBy: FIRSTNAME, pageSize: 20) {
        cursor
        members {
          id
          firstName
          lastName
          profileSlug
          jobTitle
          company
          profileImage
        }
      }
    }
  }
`;

const HighlightImage = styled.img`
  max-height: 30rem;
  position: absolute;
  top: 3rem;
  right: 20rem;
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

const LoadMoreButton = styled(SquareButton)`
  width: 20rem;
  height: 5rem;
  display: block;
  margin: 2rem auto;
`;

const SkeletonLoader = () => {
  const items = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 28; i++) {
    items.push(<Placeholder width="17rem" height="13rem" />);
  }
  return (
    <Grid columns={gridRepeat.xxsmall} alignContent="center">
      {items}
    </Grid>
  );
};

const memberListing = () => {
  const { loading, error, data, fetchMore } = useQuery(GET_MEMBERS);

  if (loading) return <LoadingIndicator />;

  if (error) {
    throw new Error(error);
  }

  let { members, cursor } = data.members.members;

  const loadMoreMembers = () => {
    fetchMore({
      variables: {
        after: cursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        members = [
          ...previousResult.members.members.members,
          ...fetchMoreResult.members.members.members,
        ];
        cursor = fetchMoreResult.members.members.cursor;
        const result = {
          ...fetchMoreResult,
        };
        result.members.members.members = [
          ...fetchMoreResult.members.members.members,
          ...previousResult.members.members.members,
        ];
        return result;
      },
    });
  };

  return (
    <>
      <NextSeo
        title="All Members - THAT Conference"
        description="THAT is nothing without our community. These unique and passionate individuals are what THAT is all about!"
      />

      <ContentSection>
        <Grid columns={gridRepeat.xsmall}>
          <Cell width={1}>
            <h1>Members</h1>
            <p className="medium-body-copy">
              ** Need heartfelt blurb about members ** Lorem ipsum dolor sit
              amet, consectetur adipisicing elit. Sequi nisi rem voluptates
              voluptas facere beatae itaque accusantium unde corrupti libero
              ullam obcaecati reiciendis eaque nihil, debitis corporis facilis,
              assumenda rerum!
            </p>
            <LinkButton
              href="/api/login"
              label="Become a Member"
              color="thatBlue"
              borderColor="thatBlue"
              hoverBorderColor="thatBlue"
              hoverColor="white"
              hoverBackgroundColor="thatBlue"
            />
          </Cell>
          <HeroGraphicDiv>
            <HighlightImage
              src="/images/pink_bear_and_green_bear.png"
              alt="THAT Members"
            />
          </HeroGraphicDiv>
        </Grid>
      </ContentSection>

      <ContentSection>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <SkeletonLoader />
          </div>
        )}
        {!loading && (
          <Grid columns={gridRepeat.xxsmall} alignContent="center">
            {_.orderBy(members, ['firstName', 'lastName']).map(member => {
              return (
                <ProfileItem
                  imageUrl={member.profileImage}
                  size="150"
                  name={`${member.firstName} ${member.lastName}`}
                  title={member.jobTitle}
                  company={member.company}
                  slug={member.profileSlug}
                  showAccentLine={false}
                  nameFontSize="1"
                />
              );
            })}
          </Grid>
        )}
        <LoadMoreButton label="Load More Members" onClick={loadMoreMembers} />
      </ContentSection>
    </>
  );
};

export default memberListing;
