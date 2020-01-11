import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useRouter } from 'next/router';
import debug from 'debug';
import { useFetchUser } from '../../hooks/user';
import { below, RegularExpressions } from '../../utilities';
import ContentSection from '../../components/shared/ContentSection';
import LoadingIndicator from '../../components/shared/LoadingIndicator';
import BaseStepper from '../../components/shared/Stepper';
import ContactInfo from '../../components/Member/Profile/ContactInfo';
import OnlinePresence from '../../components/Member/Profile/OnlinePresence';
import Bio from '../../components/Member/Profile/Bio';

import {
  FormRule,
  FormCancel,
  FormSubmit,
} from '../../components/shared/FormLayout';

const _ = require('lodash');

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

const dlog = debug('that:member:create');

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

const CREATE_MEMBER = gql`
  mutation createMember($profile: ProfileCreateInput!) {
    members {
      create(profile: $profile) {
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
`;

const createProfile = () => {
  dlog('create profile');
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const { user, loading } = useFetchUser();

  useEffect(() => {
    if (!loading && _.isEmpty(user)) {
      router.push('/api/login?redirect-url=/member/create');
    }
  });

  const [createMember] = useMutation(CREATE_MEMBER, {
    onCompleted: ({ members }) => {
      dlog('profile created %o', members);
      router.push(`/member/${members.create.profileSlug}`);
    },
    onError: updateError => {
      dlog('Error updating member %o', updateError);
      throw new Error(updateError);
    },
  });

  const contactValidation = {
    acceptedCodeOfConduct: Yup.bool().required('Field must be checked'),
    acceptedTermsOfService: Yup.bool().required('Field must be checked'),
    city: Yup.string().nullable(),
    company: Yup.string().nullable(),
    firstName: Yup.string()
      .min(3, 'Must be at least 3 characters')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
    country: Yup.string().nullable(),
    isOver13: Yup.bool().required('Field must be checked'),
    jobTitle: Yup.string().nullable(),
    lastName: Yup.string()
      .min(3, 'Must be at least 3 characters')
      .required('Required'),
    mobilePhone: Yup.string()
      .matches(RegularExpressions.phoneRegExp, 'Phone number is not valid')
      .nullable(),
    profileSlug: Yup.string().required('Required'),
    state: Yup.string().nullable(),
  };

  const profileLinkValidations = {
    facebook: Yup.string().url('Invalid URL'),
    github: Yup.string().url('Invalid URL'),
    instagram: Yup.string().url('Invalid URL'),
    linkedin: Yup.string().url('Invalid URL'),
    slack: Yup.string(),
    twitter: Yup.string().url('Invalid URL'),
    website: Yup.string().url('Invalid URL'),
  };

  const bioValidation = {
    bio: Yup.string().min(10, 'Must be at least 10 characters'),
  };

  const steps = [
    {
      label: 'Contact Info',
      currentOrCompleted: currentStep === 0,
      validationRules: contactValidation,
    },
    {
      label: 'Online Presence',
      currentOrCompleted: currentStep === 1,
      validationRules: profileLinkValidations,
    },
    {
      label: 'Bio',
      currentOrCompleted: currentStep === 2,
      validationRules: bioValidation,
    },
  ];

  const formCancel = () => {
    if (currentStep === 0) {
      router.push('/wi');
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const getValidationSchema = () => {
    return Yup.object({
      ...steps[currentStep].validationRules,
    });
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <div>
      <Head>
        <title key="title">Create Member Profile - THAT Conference</title>
      </Head>
      <ContentSection forForm>
        <BaseStepper steps={steps} header="Create Your Profile" />
        <Title>{steps[currentStep].label}</Title>
        <Formik
          initialValues={{
            email: user.session.email,
          }}
          validationSchema={getValidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            if (currentStep === steps.length - 1) {
              setTimeout(() => {
                // only want to save fields with value, empty strings don't count
                const valuesToSave = _.omitBy(
                  values,
                  val => _.isString(val) && val.length === 0,
                );
                const profileLinks = Object.keys(linkTypes)
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
                  profileLinks,
                  isDeactivated: false,
                  canFeature: false,
                };
                dlog('submitted and valuesToSave', valuesToSave);
                createMember({
                  variables: {
                    profile,
                  },
                });
                setSubmitting(false);
              }, 400);
            } else {
              setCurrentStep(currentStep + 1);
            }
          }}
        >
          {({
            getFieldProps,
            errors,
            touched,
            setFieldValue,
            setFieldTouched,
            values,
          }) => (
            <Form className="input-form">
              {currentStep === 0 && (
                <ContactInfo
                  getFieldProps={getFieldProps}
                  errors={errors}
                  touched={touched}
                  values={values}
                />
              )}
              {currentStep === 1 && (
                <OnlinePresence
                  getFieldProps={getFieldProps}
                  errors={errors}
                  touched={touched}
                  submitLabel="Next"
                />
              )}
              {currentStep === 2 && (
                <Bio
                  getFieldProps={getFieldProps}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  values={values}
                  submitLabel="Next"
                />
              )}
              <FormRule />
              <FormCancel onClick={formCancel} />
              <FormSubmit label="Continue" />
            </Form>
          )}
        </Formik>
      </ContentSection>
    </div>
  );
};

export default createProfile;
