import React from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Cell } from 'styled-css-grid';
import { NextSeo } from 'next-seo';
import _ from 'lodash';
import ContentSection from '../components/shared/ContentSection';
import LinkButton from '../components/shared/LinkButton/LinkButton';
import SquareButton from '../components/shared/SquareButton';
import SkeletonLoader from '../components/shared/SkeletonLoader';
import LoadingIndicator from '../components/shared/LoadingIndicator';
import ProfileItem from '../components/shared/ProfileItem';
import { HeroGraphicDiv } from '../components/shared/StandardStyles';
import { below, gridRepeat } from '../utilities';

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

const StyledHeroGraphicDiv = styled(HeroGraphicDiv)`
  text-align: right;
`;

const HighlightImage = styled.img`
  max-height: 35rem;
  object-fit: contain;
`;

const MembersContentSection = styled(ContentSection)`
  padding-top: 0;
`;

const ProfileSection = styled.div`
  display: flex;
  margin: auto;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 120rem;

  ${below.small`
    margin-top: 2rem;
  `};
`;

const StyledProfileItem = styled(ProfileItem)`
  margin: 3rem 1rem 0;
  width: 22rem;

  ${below.small`
    width: 15rem;
  `};
`;

const LoadMoreButton = styled(SquareButton)`
  min-width: 20rem;
  height: 6rem;
  display: block;
  margin-top: 4rem;
  margin-left: auto;
  margin-right: auto;

  &:focus {
    outline: unset;
  }

  ${below.small`
    width: 100%;
  `};
`;

let fetchingMore = false;

const memberListing = () => {
  // networkStatus and notifyOnNetworkStatusChange are needed to know when fetching additional members.
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    GET_MEMBERS,
    {
      notifyOnNetworkStatusChange: true,
    },
  );
  if (loading && !fetchingMore) return <LoadingIndicator />;

  if (error) {
    throw new Error(error);
  }

  const loadingMoreMembers = networkStatus === 3;

  let { members, cursor } = data.members.members;

  const loadMoreMembers = () => {
    fetchingMore = true;
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
        fetchingMore = false;
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
          <StyledHeroGraphicDiv>
            <HighlightImage
              src="/images/pink_bear_and_green_bear.png"
              alt="THAT Members"
            />
          </StyledHeroGraphicDiv>
        </Grid>
      </ContentSection>

      <MembersContentSection>
        {loading && !fetchingMore && (
          <div style={{ textAlign: 'center' }}>
            <SkeletonLoader />
          </div>
        )}
        {(!loading || fetchingMore) && (
          <ProfileSection>
            {_.orderBy(members, ['firstName', 'lastName']).map(member => {
              return (
                <StyledProfileItem
                  imageUrl={member.profileImage}
                  size="120"
                  name={`${member.firstName} ${member.lastName}`}
                  title={member.jobTitle}
                  company={member.company}
                  showAccentLine={false}
                  profileSlug={member.profileSlug}
                  key={member.id}
                />
              );
            })}
          </ProfileSection>
        )}
        {loadingMoreMembers && (
          <LoadMoreButton
            label="Loading..."
            color="thatBlue"
            borderColor="thatBlue"
            backgroundColor="white"
            hoverBorderColor="thatBlue"
            hoverColor="thatBlue"
            hoverBackgroundColor="white"
          />
        )}
        {!loadingMoreMembers && (
          <LoadMoreButton
            label="Load More Members"
            onClick={loadMoreMembers}
            color="white"
            borderColor="thatBlue"
            backgroundColor="thatBlue"
            hoverBorderColor="thatBlue"
            hoverColor="thatBlue"
            hoverBackgroundColor="white"
          />
        )}
      </MembersContentSection>
    </>
  );
};

export default memberListing;
