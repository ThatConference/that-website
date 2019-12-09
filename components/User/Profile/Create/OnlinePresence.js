import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import FormInput from '../../../shared/FormInput';
import {
  FormRow,
  FormRule,
  FormCancel,
  FormSubmit,
} from '../../../shared/FormLayout';

const Form = () => {
  const formik = useFormik({
    initialValues: {
      website: '',
      github: '',
      twitter: '',
      facebook: '',
      instagram: '',
      linkedIn: '',
      slack: '',
    },
    validationSchema: Yup.object({
      website: Yup.string().url('Invalid URL'),
      twitter: Yup.string(),
      facebook: Yup.string().url('Invalid URL'),
      github: Yup.string().url('Invalid URL'),
      instagram: Yup.string(),
      linkedIn: Yup.string().url('Invalid URL'),
      slack: Yup.string(),
      showSlackOnProfile: Yup.bool(),
    }),
    onSubmit: values => {
      // eslint-disable-next-line no-alert
      alert(JSON.stringify(values, null, 2));
      window.location = 'bio';
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <FormRow>
        <FormInput fieldName="website" formikForm={formik} label="Website" />
      </FormRow>
      <FormRow>
        <FormInput
          fieldName="twitter"
          formikForm={formik}
          label="Twitter username"
        />
      </FormRow>
      <FormRow>
        <FormInput fieldName="github" formikForm={formik} label="GitHub URL" />
      </FormRow>
      <FormRow>
        <FormInput
          fieldName="facebook"
          formikForm={formik}
          label="Facebook URL"
        />
      </FormRow>
      <FormRow>
        <FormInput
          fieldName="instagram"
          formikForm={formik}
          label="Instagram Handle"
        />
      </FormRow>
      <FormRow>
        <FormInput fieldName="linkedIn" formikForm={formik} label="LinkedIn" />
      </FormRow>
      <FormRow>
        <FormInput
          fieldName="slack"
          formikForm={formik}
          label="Slack Member ID"
        />
        <FormInput
          fieldName="showSlackOnProfile"
          formikForm={formik}
          label="Show on my profile"
          inputType="checkbox"
        />
      </FormRow>
      <FormRule />
      <FormCancel label="Back" />
      <FormSubmit label="Continue" />
    </form>
  );
};

export default Form;
