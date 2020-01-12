import React, { useEffect } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useRouter } from 'next/router';
import debug from 'debug';
import ContentSection from '../../components/shared/ContentSection';
import ContactInfo from '../../components/Member/Profile/ContactInfo';
import OnlinePresence from '../../components/Member/Profile/OnlinePresence';
import Image from '../../components/Member/Profile/Image';
import Bio from '../../components/Member/Profile/Bio';
import LoadingIndicator from '../../components/shared/LoadingIndicator';
import { below, memberConstants } from '../../utilities';

import {
  FormCancel,
  FormRule,
  FormSubmit,
} from '../../components/shared/FormLayout';

const _ = require('lodash');

const dlog = debug('that:member:edit');

const GET_MEMBER = gql`
  query getMember {
    members {
      me {
        id
        bio
        city
        company
        country
        email
        firstName
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

const { linkTypes } = memberConstants;

const editProfile = ({ user, loading: loadingUser }) => {
  const router = useRouter();

  useEffect(() => {
    if (!loadingUser && _.isEmpty(user)) {
      router.push('/api/login?redirect-url=/member/edit');
    }

    if (!loadingUser && !user.profileComplete) {
      router.push('/member/create');
    }
  });

  const { loading, error, data } = useQuery(GET_MEMBER);

  if (loading) return null;
  if (error) {
    throw new Error(error.message);
  }

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
    profileImage,
    profileLinks,
    profileSlug,
    state,
  } = data.members.me;

  const [updateMember] = useMutation(UPDATE_MEMBER, {
    onCompleted: () => {
      router.push(`/member/${profileSlug}`);
    },
    onError: updateError => {
      dlog('Error updating member', updateError);
      throw new Error(updateError);
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
    router.push(`/member/${profileSlug}`);
  };

  if (loading) {
    return <LoadingIndicator />;
  }

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
            profileImage,
            profileSlug,
            state,
            ...profileLinkInitialValues(),
          }}
          validationSchema={Yup.object(
            { ...memberConstants.validationRules.contactInfo },
            { ...memberConstants.validationRules.onlinePresence },
            { ...memberConstants.validationRules.image },
            { ...memberConstants.validationRules.bio },
          )}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              // don't include non-editable fields only being displayed
              const valuesToSave = _.omit(values, ['profileSlug']);
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
                values={values}
                editMode
              />
              <OnlinePresence
                getFieldProps={getFieldProps}
                errors={errors}
                touched={touched}
              />
              <Image
                getFieldProps={getFieldProps}
                errors={errors}
                touched={touched}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                values={values}
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
