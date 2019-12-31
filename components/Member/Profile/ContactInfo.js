import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Router from 'next/router';

import RegularExpressions from '../../../utilities/validation';

import FormInput from '../../shared/FormInput';
import {
  FormRow,
  FormRule,
  FormCancel,
  FormSubmit,
} from '../../shared/FormLayout';

const GET_MEMBER = gql`
  query getMember {
    members {
      me {
        id
        firstName
        isOver18
        lastName
        city
        state
        country
        email
        mobilePhone
        company
        jobTitle
        profileImage
        profileSlug
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

const FlexFormRow = styled(FormRow)`
  display: flex;
  justify-content: space-between;

  label {
    flex-grow: 2;
    &:not(:last-child) {
      padding-right: 2rem;
    }
  }
`;

const ContactInfoForm = () => {
  const { loading, error, data } = useQuery(GET_MEMBER);
  const [updateMember] = useMutation(UPDATE_MEMBER, {
    onCompleted: () => {
      Router.push('/member/online-presence');
    },
    onError: updateError => {
      console.log('Error updating member', updateError);
    },
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const {
    city,
    company,
    country,
    email,
    firstName,
    isOver18,
    jobTitle,
    lastName,
    mobilePhone,
    // profileImage,
    profileSlug,
    state,
  } = data.members.me;

  return (
    <Formik
      initialValues={{
        city,
        company,
        country,
        email,
        firstName,
        jobTitle,
        lastName,
        mobilePhone,
        state,
        // image: null,
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
          .matches(RegularExpressions.phoneRegExp, 'Phone number is not valid')
          .nullable(),
        // showEmailAddressOnProfile: Yup.bool(),
        // showMobilePhoneOnProfile: Yup.bool(),
        city: Yup.string().nullable(),
        state: Yup.string().nullable(),
        country: Yup.string().nullable(),
        company: Yup.string().nullable(),
        jobTitle: Yup.string().nullable(),
        // image: Yup.mixed()
        //   .test(
        //     'fileSize',
        //     'File Size is too large',
        //     value => !value || value.size <= 300000,
        //   )
        //   .test(
        //     'fileType',
        //     'Unsupported File Format',
        //     value =>
        //       !value ||
        //       ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'].includes(
        //         value.type,
        //       ),
        //   ),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log('values', values);
          const profile = { ...values, isOver18, isDeactivated: false };
          updateMember({ variables: { profile } });

          // if (!mutationLoading && mutationError) {
          //   console.log('Error updating member');
          // }

          // if (!mutationLoading && !mutationError) {
          //   setSubmitting(false);
          //   Router.push('/member/online-presence');
          // }
        }, 400);
      }}
    >
      {({ getFieldProps, errors, touched }) => (
        <Form className="input-form">
          <FlexFormRow>
            <FormInput
              fieldName="firstName"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
              label="First Name"
            />
            <FormInput
              fieldName="lastName"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
              label="Last Name"
            />
          </FlexFormRow>
          <FormRow>
            <FormInput
              fieldName="email"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
              label="Email Address"
            />
            {/* <FormInput
              fieldName="showEmailAddressOnProfile"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
              label="Show on my profile"
              inputType="checkbox"
            /> */}
          </FormRow>
          <FormRow>
            <FormInput
              fieldName="mobilePhone"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
              label="Mobile Phone"
            />
            {/* <FormInput
              fieldName="showMobilePhoneOnProfile"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
              label="Show on my profile"
              inputType="checkbox"
            /> */}
          </FormRow>
          <FlexFormRow>
            <FormInput
              fieldName="city"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
              label="City"
            />
            <FormInput
              fieldName="state"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
              label="State"
            />
            <FormInput
              fieldName="country"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
              label="Country"
            />
          </FlexFormRow>
          <FormRow>
            <FormInput
              fieldName="company"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
              label="Company"
            />
          </FormRow>
          <FormRow>
            <FormInput
              fieldName="jobTitle"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
              label="Title"
            />
          </FormRow>
          {/* <FormRow>
            <FormInput
              fieldName="image"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
              inputType="imageupload"
              label="Photo"
            />
          </FormRow> */}
          <FormRule />
          <FormCancel onClick={() => Router.push(`/member/${profileSlug}`)} />
          <FormSubmit label="Continue" />
        </Form>
      )}
    </Formik>
  );
};

export default ContactInfoForm;
