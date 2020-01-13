import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Router from 'next/router';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

import FormInput from '../shared/FormInput';
import { FormRow, FormRule, FormSubmit } from '../shared/FormLayout';

const UPDATE_PROFILE = gql`
  mutation updateMember($profile: ProfileUpdateInput!) {
    members {
      member {
        update(profile: $profile) {
          id
        }
      }
    }
  }
`;

const Achknowledgment = ({ acceptedCommitments }) => {
  const [updateProfile] = useMutation(UPDATE_PROFILE);
  return (
    <Formik
      initialValues={{
        agreeToCommitments: acceptedCommitments || false,
      }}
      validationSchema={Yup.object({
        agreeToCommitments: Yup.bool().oneOf(
          [true],
          'Must agree to the commitments',
        ),
        are18OrOlder: Yup.bool(),
      })}
      onSubmit={values => {
        const profile = {
          acceptedCommitments: values.agreeToCommitments,
        };
        updateProfile({
          variables: { profile },
        }).then(
          () => {
            Router.push('/wi/session/submit');
          },
          error => {
            // ToDo: Appropriately log and handle error
            // eslint-disable-next-line no-console
            console.log(`Error: ${error}`);
          },
        );
      }}
    >
      {({ getFieldProps, errors, touched, isSubmitting, values }) => (
        <Form className="input-form">
          <FormRule />
          <FormRow>
            <FormInput
              fieldName="agreeToCommitments"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
              label="Agree to commitments to THAT Conference laid out above"
              inputType="checkbox"
              values={values}
            />
          </FormRow>
          <FormSubmit label="Agree and Continue" disabled={isSubmitting} />
        </Form>
      )}
    </Formik>
  );
};

export default Achknowledgment;
