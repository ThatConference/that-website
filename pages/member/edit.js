import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Router from 'next/router';
import debug from 'debug';

import ContentSection from '../../components/shared/ContentSection';
import ContactInfo from '../../components/Member/Profile/ContactInfo';
import OnlinePresence from '../../components/Member/Profile/OnlinePresence';
import Bio from '../../components/Member/Profile/Bio';

import { below, RegularExpressions } from '../../utilities';

import {
  FormRule,
  FormCancel,
  FormSubmit,
} from '../../components/shared/FormLayout';

const _ = require('lodash');

const dlog = debug('that:member:edit');

// commented out some links until we get icons
const linkTypes = {
  // devTo: "DEV_TO",
  // dribbble: "DRIBBBLE",
  facebook: 'FACEBOOK',
  github: 'GITHUB',
  instagram: 'INSTAGRAM',
  linkedin: 'LINKEDIN',
  medium: 'MEDIUM',
  // stackOverflow: "STACK_OVERFLOW",
  // tictok: "TICTOK",
  // twitch: "TWITCH",
  twitter: 'TWITTER',
  website: 'WEBSITE',
  youtube: 'YOUTUBE',
};

const GET_MEMBER = gql`
  query getMember {
    members {
      me {
        bio
        city
        company
        country
        email
        firstName
        id
        interests
        isOver13
        jobTitle
        lastName
        mobilePhone
        profileImage
        profileSlug
        profileLinks {
          isPublic
          linkType
          url
        }
        state
      }
    }
  }
`;

const UPDATE_MEMBER = gql`
  mutation updateMember($profile: ProfileUpdateInput!) {
    members {
      member {
        update(profile: $profile) {
          id
          profileSlug
          firstName
          lastName
          email
          canFeature
          createdAt
          lastUpdatedAt
        }
      }
    }
  }
`;

const twoColBp = 'large';

const Title = styled.h1`
  margin: 1.8rem 0 3rem 0;

  ${below[twoColBp]`
    text-align: center;
  `};

  ${below.small`
    font-size: 8rem;
  `};

  ${below.xsmall`
    font-size: 7rem;
  `};
`;

const editProfile = ({ currentUser }) => {
  if (_.isEmpty(currentUser)) {
    Router.push('/api/login?redirect-url=/member/edit');
  }

  const { loading, error, data } = useQuery(GET_MEMBER);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const {
    bio,
    city,
    company,
    country,
    email,
    firstName,
    interests,
    jobTitle,
    lastName,
    mobilePhone,
    // profileImage,
    profileLinks,
    profileSlug,
    state,
  } = data.members.me;

  const [updateMember] = useMutation(UPDATE_MEMBER, {
    onCompleted: () => {
      Router.push(`/member/${profileSlug}`);
    },
    onError: updateError => {
      dlog('Error updating member', updateError);
    },
  });

  const getProfileLinkValue = linkType => {
    return profileLinks.filter(profileLink => {
      return profileLink.linkType === linkType;
    })[0];
  };

  const profileLinkInitialValues = () => {
    return Object.keys(linkTypes).reduce((acc, key) => {
      const value = getProfileLinkValue(linkTypes[key]);
      acc[key] = value ? value.url : '';
      return acc;
    }, {});
  };

  const formCancel = () => {
    Router.push(`/member/${profileSlug}`);
  };

  console.log('profileLinkInitialValues', profileLinkInitialValues());
  return (
    <div>
      <Head>
        <title key="title">
          Member Profile: Contact Info - THAT Conference
        </title>
      </Head>
      <ContentSection forForm>
        <Title>Edit Profile</Title>
        <Formik
          initialValues={{
            bio,
            city,
            company,
            country,
            email,
            firstName,
            interests,
            jobTitle,
            lastName,
            mobilePhone,
            state,
            ...profileLinkInitialValues(),
          }}
          validationSchema={Yup.object({
            firstName: Yup.string()
              .min(3, 'Must be at least 3 characters')
              .required('Required'),
            lastName: Yup.string()
              .min(3, 'Must be at least 3 characters')
              .required('Required'),
            email: Yup.string()
              .email('Invalid email address')
              .required('Required'),
            mobilePhone: Yup.string()
              .matches(
                RegularExpressions.phoneRegExp,
                'Phone number is not valid',
              )
              .nullable(),
            city: Yup.string().nullable(),
            state: Yup.string().nullable(),
            country: Yup.string().nullable(),
            company: Yup.string().nullable(),
            jobTitle: Yup.string().nullable(),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              const valuesToSave = values;
              console.log('submitted and valuesToSave 1111', valuesToSave);
              const profileLinksToSave = Object.keys(linkTypes)
                .filter(key =>
                  valuesToSave[key] ? valuesToSave[key].length > 0 : false,
                )
                .map(key => {
                  return {
                    isPublic: true,
                    linkType: linkTypes[key],
                    url: valuesToSave[key],
                  };
                });

              Object.keys(linkTypes).forEach(key => {
                delete valuesToSave[key];
              });

              const profile = {
                ...valuesToSave,
                profileLinks: profileLinksToSave,
              };
              console.log('submitted and valuesToSave', valuesToSave);

              updateMember({ variables: { profile } });
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            getFieldProps,
            errors,
            setFieldValue,
            setFieldTouched,
            touched,
            values,
          }) => (
            <Form className="input-form">
              <ContactInfo
                getFieldProps={getFieldProps}
                errors={errors}
                touched={touched}
              />
              <OnlinePresence
                getFieldProps={getFieldProps}
                errors={errors}
                touched={touched}
              />
              <Bio
                getFieldProps={getFieldProps}
                errors={errors}
                touched={touched}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                values={values}
              />
              <FormRule />
              <FormCancel onClick={formCancel} />
              <FormSubmit label="Update" />
            </Form>
          )}
        </Formik>
      </ContentSection>
    </div>
  );
};

export default editProfile;
