import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import RegularExpressions from '../../utilities/validation';

import FormInput from '../shared/FormInput';
import { FormRow, FormRule, FormSubmit } from '../shared/FormLayout';

const Form = () => {
  return (
    <Formik
      initialValues={{
        fullName: '',
        emailAddress: '',
        mobilePhone: '',
        interests: '',
        bio: '',
        agreeToCodeOfConduct: false,
        agreeToCommitments: false,
        agreeToBeingRecorded: false,
      }}
      validationSchema={Yup.object({
        fullName: Yup.string()
          .min(3, 'Must be at least 3 characters')
          .required('Required'),
        emailAddress: Yup.string()
          .email('Invalid email address')
          .required('Required'),
        mobilePhone: Yup.string().matches(
          RegularExpressions.phoneRegExp,
          'Phone number is not valid',
        ),
        interests: Yup.string()
          .required('Required')
          .max(20, 'Must be less than 21 characters'),
        bio: Yup.string().required('Required'),
        agreeToCodeOfConduct: Yup.bool().oneOf(
          [true],
          'Must agree to the Code of Conduct',
        ),
        agreeToCommitments: Yup.bool().oneOf(
          [true],
          'Must agree to the commitments',
        ),
        agreeToBeingRecorded: Yup.bool(),
      })}
      onSumbit={(values, { setSubmitting }) => {
        setTimeout(() => {
          // eslint-disable-next-line no-alert
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {formik => (
        <form className="input-form" onSubmit={formik.handleSubmit}>
          <FormRow>
            <FormInput
              fieldName="fullName"
              formikForm={formik}
              label="Full Name"
            />
          </FormRow>
          <FormRow>
            <FormInput
              fieldName="emailAddress"
              formikForm={formik}
              label="Email Address"
            />
          </FormRow>
          <FormRow>
            <FormInput
              fieldName="mobilePhone"
              formikForm={formik}
              label="Mobile Phone"
            />
          </FormRow>
          <FormRow>
            <FormInput
              inputType="textarea"
              fieldName="interests"
              formikForm={formik}
              label="Interests"
              helpText="Maximum of 12 interests.  Type a comma between each interest."
            />
          </FormRow>
          <FormRow>
            <FormInput
              inputType="markdown"
              fieldName="bio"
              formikForm={formik}
              label="Bio"
            />
          </FormRow>
          <FormRow>
            <div>
              <FormInput
                fieldName="agreeToCodeOfConduct"
                formikForm={formik}
                label="Agree to <a href=''>Code of Conduct</a>"
                inputType="checkbox"
              />
            </div>
            <div>
              <FormInput
                fieldName="agreeToCommitments"
                formikForm={formik}
                label="Agree to commitments to THAT Conference laid out above"
                inputType="checkbox"
              />
            </div>
            <div>
              <FormInput
                fieldName="agreeToBeingRecorded"
                formikForm={formik}
                label="Agree to being recorded"
                inputType="checkbox"
              />
            </div>
          </FormRow>
          <FormRule />
          <FormSubmit />
        </form>
      )}
    </Formik>
  );
};

export default Form;
