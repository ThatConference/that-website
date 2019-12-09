import React from 'react';
import { Cell } from 'styled-css-grid';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import FormInput from '../../../../../components/shared/FormInput';
import {
  FormGrid,
  FormRule,
  FormSubmit,
} from '../../../../../components/shared/FormLayout';

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
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <FormGrid columns={2}>
        <Cell>
          <FormInput fieldName="website" formikForm={formik} label="Website" />
        </Cell>
        <Cell>
          <FormInput
            fieldName="twitter"
            formikForm={formik}
            label="Twitter username"
          />
        </Cell>
        <Cell>
          <FormInput
            fieldName="github"
            formikForm={formik}
            label="GitHub URL"
          />
        </Cell>
        <Cell>
          <FormInput
            fieldName="facebook"
            formikForm={formik}
            label="Facebook URL"
          />
        </Cell>
        <Cell>
          <FormInput
            fieldName="instagram"
            formikForm={formik}
            label="Instagram Handle"
          />
        </Cell>
        <Cell>
          <FormInput
            fieldName="linkedIn"
            formikForm={formik}
            label="LinkedIn"
          />
        </Cell>
        <Cell>
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
        </Cell>
      </FormGrid>
      <FormRule />
      <FormSubmit />
    </form>
  );
};

export default Form;
