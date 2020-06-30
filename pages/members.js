import React, { useState } from 'react';
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

const memberListing = () => {
  const [fetchingMore, setFetchingMore] = useState(false);
  const [moreToFetch, setMoreToFetch] = useState(true);
  const [visibleMembers, setVisibleMembers] = useState([]);
  const { loading, error, data, fetchMore } = useQuery(GET_MEMBERS);
  if (loading && !fetchingMore) return <LoadingIndicator />;

  if (error) {
    throw new Error(error);
  }

  let members = data.members.members
    ? data.members.members.members
    : visibleMembers;
  let cursor = data.members.members ? data.members.members.cursor : null;

  const loadMoreMembers = () => {
    setFetchingMore(true);
    fetchMore({
      variables: {
        after: cursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const result = {
          ...fetchMoreResult,
        };
        if (result.members.members) {
          const membersResult = [
            ...fetchMoreResult.members.members.members,
            ...previousResult.members.members.members,
          ];
          setVisibleMembers(membersResult);
          members = membersResult;
          cursor = fetchMoreResult.members.members.cursor;
          result.members.members.members = membersResult;
        } else {
          setMoreToFetch(false);
        }
        setFetchingMore(false);
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
              At the heart of everything we do, you can find our THAT Community
              Members. We absolutely love our Members and welcome each and every
              one. Each Member brings a unique skill set and background that
              enriches our conversations and relationships. If you haven’t
              already signed up to become a member, we’d love it if you did!
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
        {moreToFetch && fetchingMore && (
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
        {moreToFetch && !fetchingMore && (
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
