import React, { useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Router from 'next/router';
import debug from 'debug';

import { below, RegularExpressions } from '../../utilities';
import ContentSection from '../../components/shared/ContentSection';

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

const createProfile = ({ currentUser }) => {
  if (_.isEmpty(currentUser)) {
    Router.push('/api/login?redirect-url=/member/create');
  }

  const [currentStep, setCurrentStep] = useState(0);

  const [createMember] = useMutation(CREATE_MEMBER, {
    onCompleted: ({ profileSlug }) => {
      console.log('CREATED YOOOOO');
      Router.push(`/member/${profileSlug}`);
    },
    onError: updateError => {
      dlog('Error updating member', updateError);
    },
  });

  const steps = [
    {
      label: 'Contact Info',
      currentOrCompleted: currentStep === 0,
    },
    {
      label: 'Online Presence',
      currentOrCompleted: currentStep === 1,
    },
    {
      label: 'Bio',
      currentOrCompleted: currentStep === 2,
    },
  ];

  const formCancel = () => {
    if (currentStep === 0) {
      Router.push('/wi');
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

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
            email: currentUser.email,
            firstName: currentUser.given_name,
            lastName: currentUser.family_name,
          }}
          validationSchema={Yup.object({
            acceptedCodeOfConduct: Yup.bool().required('Field must be checked'),
            acceptedTermsOfService: Yup.bool().required(
              'Field must be checked',
            ),
            // bio: Yup.string().min(10, 'Must be at least 10 characters'),
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
            isOver18: Yup.bool().required('Field must be checked'),
            jobTitle: Yup.string().nullable(),
            lastName: Yup.string()
              .min(3, 'Must be at least 3 characters')
              .required('Required'),
            mobilePhone: Yup.string()
              .matches(
                RegularExpressions.phoneRegExp,
                'Phone number is not valid',
              )
              .nullable(),
            profileSlug: Yup.string().required('Required'),
            state: Yup.string().nullable(),

            // profile links
            // facebook: Yup.string().url('Invalid URL'),
            // github: Yup.string().url('Invalid URL'),
            // instagram: Yup.string().url('Invalid URL'),
            // linkedin: Yup.string().url('Invalid URL'),
            // slack: Yup.string(),
            // twitter: Yup.string().url('Invalid URL'),
            // website: Yup.string().url('Invalid URL'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            if (currentStep === 2) {
              console.log('submitted and creatgggggg', values);
              setTimeout(() => {
                const valuesToSave = values;
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

                const profile = { ...valuesToSave, profileLinks };
                console.log('submitted and valuesToSave', valuesToSave);
                createMember({
                  variables: {
                    profile,
                    profileLinks,
                    isDeactivated: false,
                    canFeature: false,
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
