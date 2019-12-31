import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import FormInput from '../../shared/FormInput';
import {
  FormRow,
  FormRule,
  FormCancel,
  FormSubmit,
} from '../../shared/FormLayout';

const OnlinePresenceForm = ({ featureKeyword }) => {
  return (
    <Formik
      initialValues={{
        website: '',
        github: '',
        twitter: '',
        facebook: '',
        instagram: '',
        linkedIn: '',
        slack: '',
      }}
      validationSchema={Yup.object({
        website: Yup.string().url('Invalid URL'),
        twitter: Yup.string(),
        facebook: Yup.string().url('Invalid URL'),
        github: Yup.string().url('Invalid URL'),
        instagram: Yup.string(),
        linkedIn: Yup.string().url('Invalid URL'),
        slack: Yup.string(),
        showSlackOnProfile: Yup.bool(),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          // eslint-disable-next-line no-alert
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
          window.location = `bio?feature=${featureKeyword}`;
        }, 400);
      }}
    >
      {({ getFieldProps, errors, touched }) => (
        <Form className="input-form">
          <FormRow>
            <FormInput
              fieldName="website"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
              label="Website"
            />
          </FormRow>
          <FormRow>
            <FormInput
              fieldName="twitter"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
              label="Twitter username"
            />
          </FormRow>
          <FormRow>
            <FormInput
              fieldName="github"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
              label="GitHub URL"
            />
          </FormRow>
          <FormRow>
            <FormInput
              fieldName="facebook"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
              label="Facebook URL"
            />
          </FormRow>
          <FormRow>
            <FormInput
              fieldName="instagram"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
              label="Instagram Handle"
            />
          </FormRow>
          <FormRow>
            <FormInput
              fieldName="linkedIn"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
              label="LinkedIn"
            />
          </FormRow>
          <FormRow>
            <FormInput
              fieldName="slack"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
              label="Slack Member ID"
            />
            <FormInput
              fieldName="showSlackOnProfile"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
              label="Show on my profile"
              inputType="checkbox"
            />
          </FormRow>
          <FormRule />
          <FormCancel label="Back" />
          <FormSubmit label="Continue" />
        </Form>
      )}
    </Formik>
  );
};

export default OnlinePresenceForm;
