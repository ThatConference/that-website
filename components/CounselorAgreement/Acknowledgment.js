import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import FormInput from '../shared/FormInput';
import { FormRow, FormRule, FormSubmit } from '../shared/FormLayout';

const Achknowledgment = ({ featureKeyword }) => {
  return (
    <Formik
      initialValues={{
        agreeToCommitments: false,
        are18OrOlder: false,
      }}
      validationSchema={Yup.object({
        agreeToCommitments: Yup.bool().oneOf(
          [true],
          'Must agree to the commitments',
        ),
        are18OrOlder: Yup.bool(),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          // eslint-disable-next-line no-alert
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
          window.location = `session/submit?feature=${featureKeyword}`;
        }, 400);
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
