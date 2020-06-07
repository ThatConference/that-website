import React from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import ContentSection from '../shared/ContentSection';
import LinkButton from '../shared/LinkButton';
import LoadingIndicator from '../shared/LoadingIndicator';
import ProfileItem from '../shared/ProfileItem';
import { below } from '../../utilities';

const GET_MEMBERS = gql`
  query getMembers {
    members {
      members(pageSize: 10) {
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

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    ${below.xsmall`
     text-align: center;
   `};
  }
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

const TextBlock = styled.p`
  max-width: 110rem;
  text-align: center;
`;

const Community = ({ className }) => {
  const { loading, error, data } = useQuery(GET_MEMBERS);

  if (loading) return <LoadingIndicator />;

  if (error) {
    throw new Error(error);
  }

  const {
    members: {
      members: { members: allMembers },
    },
  } = data;

  return (
    <ContentSection className={className}>
      <Main>
        <h3 className="font-dark">Welcome Our Newest Community Members</h3>
        <TextBlock>
          THAT isn't THAT without community. We love our community and we really
          love when new members join. Say “Hello” to our newest community
          members. We’re so happy you have joined the THAT Community. We can't
          wait for you to share your awesome with us!
        </TextBlock>
        <ProfileSection>
          {allMembers.map(member => {
            const {
              firstName,
              lastName,
              jobTitle,
              company,
              profileImage,
              profileSlug,
            } = member;
            return (
              <StyledProfileItem
                imageUrl={profileImage}
                size="120"
                name={`${firstName} ${lastName}`}
                title={jobTitle}
                company={company}
                showAccentLine={false}
                profileSlug={profileSlug}
              />
            );
          })}
        </ProfileSection>

        <LinkButton
          href="/api/login"
          label="Join THAT Community"
          color="white"
          borderColor="thatBlue"
          backgroundColor="thatBlue"
          hoverBorderColor="thatBlue"
          hoverColor="thatBlue"
          hoverBackgroundColor="white"
        />
      </Main>
    </ContentSection>
  );
};

export default styled(Community)``;
