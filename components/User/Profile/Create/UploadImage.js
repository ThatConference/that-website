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
      image: null,
    },
    validationSchema: Yup.object({
      image: Yup.mixed()
        .test(
          'fileSize',
          'File Size is too large',
          value => !value || value.size <= 300000,
        )
        .test(
          'fileType',
          'Unsupported File Format',
          value =>
            !value ||
            ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'].includes(
              value.type,
            ),
        ),
    }),
    onSubmit: values => {
      // eslint-disable-next-line no-alert
      alert(JSON.stringify(values, null, 2));
      window.location = 'create/upload-image';
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <FormRow>
        <FormInput
          fieldName="image"
          formikForm={formik}
          inputType="imageupload"
          label=""
        />
      </FormRow>
      <FormRule />
      <FormCancel />
      <FormSubmit />
    </form>
  );
};

export default UploadImage;
