import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

import FormInput from '../shared/FormInput';
import { FormRow, FormRule, FormSubmit } from '../shared/FormLayout';
import { useUser } from '../../hooks/user';

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
  const router = useRouter();

  const { user } = useUser();

  const [updateProfile] = useMutation(UPDATE_PROFILE, {
    onCompleted: () => {
      // update user context
      user.acceptedCommitments = true;

      router.push('/wi/session/create');
    },
    onError: createError => {
      // dlog('Error updating session %o', createError);
      throw new Error(createError);
    },
  });

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
        });
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
