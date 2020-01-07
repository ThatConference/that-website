import React from 'react';
import Head from 'next/head';
import { Grid, Cell } from 'styled-css-grid';
import styled from 'styled-components';
import Markdown from 'markdown-to-jsx';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Error from '../_error';
import { below } from '../../utilities';
import ContentSection from '../../components/shared/ContentSection';
import RoundImage from '../../components/shared/RoundImage';
import NavItem from '../../components/shared/NavItem';

const DEFAULT_IMAGE = '/images/person-placeholder.jpg';

const _ = require('lodash');

const GET_MEMBER = gql`
  query getMember {
    members {
      me {
        id
        firstName
        lastName
        profileSlug
        company
        jobTitle
        profileImage
        profileSlug
        bio
        interests
        lifeHack
        profileLinks {
          linkType
        }
      }
    }
  }
`;

const StyledGrid = styled(Grid)`
  grid-gap: 2.5rem;

  ${below.med`
    grid-gap: 0;
  `};
`;

const MemberInfoCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  grid-column: span 2;
`;

const Name = styled.h2`
  text-transform: uppercase;
  font-size: 4.5rem;
  color: ${({ theme }) => theme.colors.fonts.dark};
  margin-bottom: 0.2rem;
`;

const Title = styled.p`
  font-weight: 800;
  font-size: ${({ fontSize }) => fontSize};
  margin: 0;
`;

const Company = styled.p`
  font-weight: 400;
  font-size: ${({ fontSize }) => fontSize};
  margin: 0;
`;

const SectionTitle = styled.p`
  font-size: 3rem;
  margin-top: 0;
`;

const PlaceholderBlock = styled.div`
  height: ${({ height }) => height || 4}rem;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.lightGray};
`;

const member = ({ currentUser, slug }) => {
  if (_.isEmpty(currentUser)) {
    return <Error statusCode="404" />;
  }

  const { loading, error, data } = useQuery(GET_MEMBER);

  if (loading) return null;
  if (error) {
    throw new Error(error.message);
  }

  const {
    bio,
    company,
    firstName,
    interests,
    jobTitle,
    lastName,
    lifeHack,
    profileImage,
    profileSlug,
  } = data.members.me;

  if (slug !== profileSlug) {
    return <Error statusCode="404" />;
  }

  return (
    <>
      <Head>
        <title key="title">
          {`${firstName} ${lastName} - THAT Conference`}
        </title>
      </Head>
      <ContentSection>
        <NavItem title="Edit" href="/member/edit" icon="edit" isLocal />
        <StyledGrid columns="repeat(auto-fit,minmax(12rem,1fr))">
          <MemberInfoCell>
            <RoundImage
              imageUrl={profileImage || DEFAULT_IMAGE}
              size="250"
              showAccentLine={false}
            />
            <Name>{`${firstName} ${lastName}`}</Name>
            {jobTitle ? <Title>{jobTitle}</Title> : <PlaceholderBlock />}
            {company ? <Company>{company}</Company> : <PlaceholderBlock />}
          </MemberInfoCell>
          <Cell style={{ gridColumn: 'span 4' }}>
            <SectionTitle>{`About ${firstName}`}</SectionTitle>
            {bio ? (
              <Markdown>{bio}</Markdown>
            ) : (
              <PlaceholderBlock height="10" />
            )}
            <SectionTitle>Life Hack</SectionTitle>
            {lifeHack ? <p>{lifeHack}</p> : <PlaceholderBlock height="6" />}
          </Cell>
          <Cell style={{ gridColumn: 'span 1' }}>
            <SectionTitle>Interests</SectionTitle>
            {interests ? (
              <ul>
                {interests.map(item => {
                  return <li>{item}</li>;
                })}
              </ul>
            ) : (
              <PlaceholderBlock height="10" />
            )}
          </Cell>
        </StyledGrid>
      </ContentSection>
    </>
  );
};

member.getInitialProps = async context => {
  const slug = context.query.memberSlug;

  return { slug };
};

export default member;
