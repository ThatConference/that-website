import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import FormInput from '../shared/FormInput';
import { FormRule, FormSubmit } from '../shared/FormLayout';

const Achknowledgment = ({ featureKeyword }) => {
  return (
    <Formik
      initialValues={{
        agreeToCodeOfConduct: false,
        agreeToCommitments: false,
        agreeToBeingRecorded: false,
        are18OrOlder: false,
      }}
      validationSchema={Yup.object({
        agreeToCodeOfConduct: Yup.bool().oneOf(
          [true],
          'Must agree to the Code of Conduct',
        ),
        agreeToCommitments: Yup.bool().oneOf(
          [true],
          'Must agree to the commitments',
        ),
        agreeToBeingRecorded: Yup.bool(),
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
      {({ getFieldProps, errors, touched }) => (
        <Form className="input-form">
          <FormRule />
          <div>
            <FormInput
              fieldName="agreeToCodeOfConduct"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
              label="Agree to the <a href='code-of-conduct'>Code of Conduct</a>"
              inputType="checkbox"
            />
          </div>
          <div>
            <FormInput
              fieldName="agreeToCommitments"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
              label="Agree to commitments to THAT Conference laid out above"
              inputType="checkbox"
            />
            <div>
              <FormInput
                fieldName="agreeToBeingRecorded"
                getFieldProps={getFieldProps}
                errors={errors}
                touched={touched}
                label="Agree to being recorded"
                inputType="checkbox"
              />
            </div>
            <div>
              <FormInput
                fieldName="are18OrOlder"
                getFieldProps={getFieldProps}
                errors={errors}
                touched={touched}
                label="Are you 18 or older as of today?"
                inputType="checkbox"
              />
            </div>
          </div>
          <FormSubmit label="Agree and Continue" />
        </Form>
      )}
    </Formik>
  );
};

export default Achknowledgment;
