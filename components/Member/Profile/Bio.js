import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Router from 'next/router';
import debug from 'debug';

import {
  FormRow,
  FormRule,
  FormCancel,
  FormSubmit,
} from '../../shared/FormLayout';
import FormInput from '../../shared/FormInput';

const dlog = debug('that:member:update:bio');

const GET_MEMBER = gql`
  query getMember {
    members {
      me {
        id
        bio
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
          bio
        }
      }
    }
  }
`;

const Bio = () => {
  const { loading, error, data } = useQuery(GET_MEMBER);

  const [updateMember] = useMutation(UPDATE_MEMBER, {
    onCompleted: () => {
      Router.push(`/member/${profileSlug}`);
    },
    onError: updateError => {
      dlog('Error updating member', updateError);
    },
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const { bio, profileSlug } = data.members.me;

  return (
    <Formik
      initialValues={{
        bio,
      }}
      validationSchema={Yup.object({
        bio: Yup.string()
          .min(10, 'Must be at least 10 characters')
          .required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          const profile = { ...values };
          updateMember({ variables: { profile } });
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        setFieldValue,
        setFieldTouched,
        getFieldProps,
        errors,
        touched,
        values,
      }) => (
        <Form className="input-form">
          <FormRow>
            <FormInput
              fieldName="bio"
              fieldHasValidation
              inputType="markdown"
              values={values}
              getFieldProps={getFieldProps}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              errors={errors}
              touched={touched}
              label="Bio"
            />
          </FormRow>
          <FormRule />
          <FormCancel label="Back" />
          <FormSubmit label="Complete" />
        </Form>
      )}
    </Formik>
  );
};

export default Bio;
