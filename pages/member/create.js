import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useRouter } from 'next/router';
import debug from 'debug';
import { below, memberConstants } from '../../utilities';
import ContentSection from '../../components/shared/ContentSection';
import LoadingIndicator from '../../components/shared/LoadingIndicator';
import BaseStepper from '../../components/shared/Stepper';
import ContactInfo from '../../components/Member/Profile/ContactInfo';
import OnlinePresence from '../../components/Member/Profile/OnlinePresence';
import Image from '../../components/Member/Profile/Image';
import Bio from '../../components/Member/Profile/Bio';

import {
  FormCancel,
  FormSubmit,
  FormRuleWithRequired,
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
const { linkTypes } = memberConstants;

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

const createProfile = ({ user, loading }) => {
  dlog('create profile');
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [fileUploading, setFileUplaoding] = useState(false);

  useEffect(() => {
    if (!loading && _.isEmpty(user)) {
      router
        .push('/api/login?redirect-url=/member/create')
        .then(() => window.scrollTo(0, 0));
    }

    if (!loading && user.profileComplete) {
      router.push('/wi').then(() => window.scrollTo(0, 0));
    }
  });

  const [createMember] = useMutation(CREATE_MEMBER, {
    onCompleted: ({ members }) => {
      dlog('profile created %o', members);
      router
        .push(`/member/${members.create.profileSlug}`)
        .then(() => window.scrollTo(0, 0));
    },
    onError: updateError => {
      dlog('Error updating member %o', updateError);
      throw new Error(updateError);
    },
  });

  const steps = [
    {
      label: 'Contact Info',
      currentOrCompleted: currentStep === 0,
      validationRules: {
        ...memberConstants.validationRules.contactInfo,
        ...memberConstants.validationRules.createOnly,
      },
    },
    {
      label: 'Online Presence',
      currentOrCompleted: currentStep === 1,
      validationRules: memberConstants.validationRules.onlinePresence,
    },
    {
      label: 'Profile Image',
      currentOrCompleted: currentStep === 2,
      validationRules: memberConstants.validationRules.image,
    },
    {
      label: 'Bio',
      currentOrCompleted: currentStep === 3,
      validationRules: memberConstants.validationRules.bio,
    },
  ];

  const formCancel = () => {
    if (currentStep === 0) {
      router.push('/wi').then(() => window.scrollTo(0, 0));
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
    return (
      <div>
        <Head>
          <title key="title">Create Member Profile - THAT Conference</title>
        </Head>
        <ContentSection forForm>
          <Title>{steps[currentStep].label}</Title>
          <div style={{ textAlign: 'center', margin: '10rem 0 7rem 0' }}>
            <LoadingIndicator />
          </div>
        </ContentSection>
      </div>
    );
  }

  dlog('user from session on create::', user);

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
            email: user.session ? user.session.email : '',
            acceptedCodeOfConduct: false,
            acceptedTermsOfService: false,
            isOver13: false,
            canFeature: false,
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
                  acceptedCommitments: false,
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
                <Image
                  getFieldProps={getFieldProps}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  values={values}
                  submitLabel="Next"
                  user={user}
                  setFileUplaoding={setFileUplaoding}
                  fileUploading={fileUploading}
                />
              )}
              {currentStep === 3 && (
                <Bio
                  getFieldProps={getFieldProps}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  values={values}
                  submitLabel="Create"
                />
              )}
              <FormRuleWithRequired />
              <FormCancel
                label={currentStep === 0 ? 'Cancel' : 'Back'}
                onClick={formCancel}
              />
              <FormSubmit
                label={currentStep === 3 ? 'Create' : 'Continue'}
                inactive={fileUploading}
              />
            </Form>
          )}
        </Formik>
      </ContentSection>
    </div>
  );
};

export default createProfile;
