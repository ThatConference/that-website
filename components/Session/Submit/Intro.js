import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  FormRow,
  FormRule,
  FormCancel,
  FormSubmit,
} from '../../shared/FormLayout';

const UploadImage = () => {
  const formik = useFormik({
    initialValues: {
      audience: null,
      sessionType: null,
    },
    validationSchema: Yup.object({
      audience: Yup.string().required('An audience is required'),
      sessionType: Yup.string().required('An session typer is required'),
    }),
    onSubmit: values => {
      // eslint-disable-next-line no-alert
      alert(JSON.stringify(values, null, 2));
      window.location = 'preview';
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <FormRow />
      <FormRule />
      <FormCancel label="Back" />
      <FormSubmit label="Continue" />
    </form>
  );
};

export default UploadImage;
