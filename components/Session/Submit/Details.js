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

const categories = [
  { value: 'accessibility', label: 'Accessibility' },
  { value: 'architecture', label: 'Architecture' },
  { value: 'arvr', label: 'AR/VR' },
];

const DetailForm = () => {
  return (
    <Formik
      initialValues={{
        title: '',
        shortDescription: '',
        description: '',
        primaryCategory: '',
        secondaryCategories: [],
      }}
      validationSchema={Yup.object({
        title: Yup.string()
          .min(3, 'Must be at least 3 characters')
          .required('Required'),
        shortDescription: Yup.string()
          .min(3, 'Must be at least 3 characters')
          .max(100, 'Must be 100 characters or less')
          .required('Required'),
        description: Yup.string()
          .min(3, 'Must be at least 3 characters')
          .required('Required'),
        primaryCategory: Yup.string().required('Required'),
        secondaryCategories: Yup.array().required('At least one is required'),
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
      {({
        getFieldProps,
        errors,
        touched,
        setFieldValue,
        setFieldTouched,
        values,
      }) => (
        <Form className="input-form">
          <FormRow>
            <FormInput
              fieldName="title"
              label="Title"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
            />
          </FormRow>
          <FormRow>
            <FormInput
              fieldName="shortDescription"
              label="Short Description"
              helpText="Maximum 100 characters"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
            />
          </FormRow>
          <FormRow>
            <FormInput
              fieldName="description"
              label="Full Description"
              inputType="markdown"
              getFieldProps={getFieldProps}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              errors={errors}
              touched={touched}
            />
          </FormRow>
          <FormRow>
            <FormInput
              fieldName="primaryCategory"
              label="Primary Category"
              selectOptions={categories}
              inputType="select"
              setFieldValue={setFieldValue}
              values={values}
              touched={touched}
              errors={errors}
              helpText="You might not find a perfect fit, just choose the one that applies the most"
            />
          </FormRow>
          <FormRow>
            <FormInput
              fieldName="secondaryCategories"
              label="Secondary Categories"
              selectOptions={categories}
              inputType="select"
              isMulti
              setFieldValue={setFieldValue}
              values={values}
              touched={touched}
              errors={errors}
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
