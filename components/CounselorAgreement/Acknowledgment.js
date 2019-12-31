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

const Achknowledgment = ({ acceptedCommitments, isOver18 }) => {
  const [updateProfile] = useMutation(UPDATE_PROFILE);
  return (
    <Formik
      initialValues={{
        agreeToCommitments: acceptedCommitments,
        are18OrOlder: isOver18,
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
          isOver18: values.are18OrOlder,
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
      {({ getFieldProps, errors, touched, isSubmitting }) => (
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
            />
            <FormInput
              fieldName="are18OrOlder"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
              label="Are you 18 or older as of today?"
              inputType="checkbox"
            />
          </FormRow>
          <FormSubmit label="Agree and Continue" disabled={isSubmitting} />
        </Form>
      )}
    </Formik>
  );
};

export default Achknowledgment;
