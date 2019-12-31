import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import {
  FormRow,
  FormRule,
  FormCancel,
  FormSubmit,
} from '../../shared/FormLayout';
import FormInput from '../../shared/FormInput';

const UploadImage = () => {
  return (
    <Formik
      initialValues={{
        bio: '',
      }}
      validationSchema={Yup.object({
        bio: Yup.string()
          .min(10, 'Must be at least 10 characters')
          .required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          // eslint-disable-next-line no-alert
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
          window.location = 'preview';
        }, 400);
      }}
    >
      {({
        setFieldValue,
        setFieldTouched,
        getFieldProps,
        errors,
        touched,
        values,
      }) => (
        <Form className="input-form">
          <FormRow>
            <FormInput
              fieldName="bio"
              fieldHasValidation
              inputType="markdown"
              values={values}
              getFieldProps={getFieldProps}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              errors={errors}
              touched={touched}
              label="Bio"
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

export default UploadImage;
