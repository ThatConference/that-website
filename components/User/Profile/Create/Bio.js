import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  FormRow,
  FormRule,
  FormCancel,
  FormSubmit,
} from '../../../shared/FormLayout';
import FormInput from '../../../shared/FormInput';

const UploadImage = () => {
  const formik = useFormik({
    initialValues: {
      bio: '',
    },
    validationSchema: Yup.object({
      bio: Yup.string()
        .min(10, 'Must be at least 10 characters')
        .required('Required'),
    }),
    onSubmit: values => {
      // eslint-disable-next-line no-alert
      alert(JSON.stringify(values, null, 2));
      window.location = 'preview';
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <FormRow>
        <FormInput
          fieldName="bio"
          formikForm={formik}
          inputType="markdown"
          label="Bio"
        />
      </FormRow>
      <FormRule />
      <FormCancel label="Back" />
      <FormSubmit label="Continue" />
    </form>
  );
};

export default UploadImage;
