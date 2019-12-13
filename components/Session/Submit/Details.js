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

const DetailForm = () => {
  return (
    <Formik
      initialValues={{
        title: '',
      }}
      validationSchema={Yup.object({
        title: Yup.string()
          .min(3, 'Must be at least 3 characters')
          .required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          // eslint-disable-next-line no-alert
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
          window.location = 'create/online-presence';
        }, 400);
      }}
    >
      {({ getFieldProps, errors, touched }) => (
        <Form className="input-form">
          <FormRow>
            <FormInput
              fieldName="title"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
              label="Title"
            />
          </FormRow>
          <FormRule />
          <FormCancel />
          <FormSubmit label="Continue" />
        </Form>
      )}
    </Formik>
  );
};

export default DetailForm;
