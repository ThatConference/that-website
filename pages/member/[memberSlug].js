import React from 'react';
import Head from 'next/head';
import { Grid, Cell } from 'styled-css-grid';
import styled from 'styled-components';
import Markdown from 'markdown-to-jsx';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Imgix from 'react-imgix';
import Error from '../_error';
import LoadingIndicator from '../../components/shared/LoadingIndicator';
import { below, memberConstants, socialConstants } from '../../utilities';
import ContentSection from '../../components/shared/ContentSection';
import RoundImage from '../../components/shared/RoundImage';
import ThatLink from '../../components/shared/ThatLink';
import SocialLinks from '../../components/shared/SocialLinks';
import Icon from '../../components/shared/Icon';

const DEFAULT_IMAGE = 'https://images.that.tech/members/person-placeholder.jpg';

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

const EditLink = styled.a`
  font-size: 1.4rem;
  text-align: center;
  float: right;
  color: ${props =>
    props.color
      ? props.theme.colors[props.color]
      : props.theme.colors.secondary};
  fill: ${props =>
    props.color
      ? props.theme.colors[props.color]
      : props.theme.colors.secondary};

  &:hover {
    color: ${({ theme }) => theme.colors.highlight};
    fill: ${({ theme }) => theme.colors.highlight};
  }

  ${below.med`
    font-size: 2rem;
  `};
`;

const EditIcon = styled(Icon)`
  vertical-align: text-bottom;
  margin-left: 0.7rem;
`;

const member = ({ slug, user, loading: loadingUser }) => {
  const isPublicView = !user || user.profileSlug !== slug;

  const GET_MEMBER_PUBLIC = gql`
    query getMember {
      members {
        member(slug: "${slug}") {
          id
          bio
          firstName
          lastName
          company
          jobTitle
          profileImage
          profileSlug
          profileLinks {
            isPublic
            linkType
            url
          }
          interests
        }
      }
    }
  `;

  const GET_MEMBER_PRIVATE = gql`
    query getMember {
      members {
        me {
          id
          bio
          city
          company
          firstName
          interests
          jobTitle
          lastName
          lifeHack
          profileImage
          profileSlug
          profileLinks {
            linkType
            url
          }
          state
        }
      }
    }
  `;

  if (loadingUser) {
    return <LoadingIndicator />;
  }

  const { loading, error, data } = isPublicView
    ? useQuery(GET_MEMBER_PUBLIC)
    : useQuery(GET_MEMBER_PRIVATE);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    throw new Error(error.message);
  }

  const dataRoot = isPublicView ? data.members.member : data.members.me;
  if (!dataRoot) {
    return <Error statusCode="404" />;
  }

  const {
    bio,
    city,
    company,
    firstName,
    interests,
    jobTitle,
    lastName,
    lifeHack,
    profileImage,
    profileLinks,
    state,
  } = dataRoot;

  const location = () => {
    if (city && state) {
      return `${city}, ${state}`;
    }
    if (city && !state) {
      return city;
    }
    if (state) {
      return state;
    }
    return null;
  };

  const getMemberSocialLinks = () => {
    const socialLinks = profileLinks.map(item => {
      const newKey = Object.keys(memberConstants.linkTypes).find(
        key => memberConstants.linkTypes[key] === item.linkType,
      );
      return {
        [newKey]: item.url,
      };
    });

    const filterSocialLinks = socialLinks.filter(item => {
      return Object.keys(socialConstants.socialIcons).includes(
        Object.keys(item)[0],
      );
    });

    if (filterSocialLinks.length > 0) {
      return Object.assign(...filterSocialLinks);
    }
    return {};
  };

  const getProfileLinkFor = linkType => {
    return profileLinks.filter(obj => {
      return obj.linkType === linkType;
    })[0];
  };

  const getWebsiteLink = () => {
    const websiteLink = getProfileLinkFor('WEBSITE');
    if (websiteLink) {
      return <ThatLink title={websiteLink.url} href={websiteLink.url} />;
    }
    return '';
  };

  return (
    <>
      <Head>
        <title key="title">
          {`${firstName} ${lastName} - THAT Conference`}
        </title>
      </Head>
      <ContentSection>
        {/* Not sure why next but using this to link to edit causes a hook re-render issue */}
        {/* <ThatLink
          title="Edit My Profile"
          href="/member/edit"
          icon="edit"
          style={{ float: 'right' }}
        /> */}
        {!isPublicView && (
          <EditLink href="/member/edit">
            <span>
              Edit My Profile
              <EditIcon icon="edit" height="20" width="20" />
            </span>
          </EditLink>
        )}
        <StyledGrid columns="repeat(auto-fit,minmax(12rem,1fr))">
          <MemberInfoCell>
            {profileImage && (
              <Imgix
                src={profileImage}
                width={270}
                height={270}
                imgixParams={{ mask: 'ellipse', fit: 'facearea', facepad: 4 }}
              />
            )}
            {!profileImage && (
              <RoundImage
                imageUrl={DEFAULT_IMAGE}
                size="250"
                showAccentLine={false}
              />
            )}
            <Name>{`${firstName} ${lastName}`}</Name>
            {jobTitle && <Title>{jobTitle}</Title>}
            {company && <Company>{company}</Company>}
            {location()}
            {getWebsiteLink()}
            <SocialLinks socialLinks={getMemberSocialLinks()} />
          </MemberInfoCell>
          <Cell style={{ gridColumn: 'span 4' }}>
            <SectionTitle>{`About ${firstName}`}</SectionTitle>
            {bio && <Markdown>{bio}</Markdown>}

            {lifeHack && (
              <>
                <SectionTitle>Life Hack</SectionTitle>
                <p>{lifeHack}</p>
              </>
            )}
          </Cell>
          <Cell style={{ gridColumn: 'span 1' }}>
            {interests && (
              <>
                <SectionTitle>Interests</SectionTitle>
                <ul>
                  {interests.map(item => {
                    return <li>{item}</li>;
                  })}
                </ul>
              </>
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
