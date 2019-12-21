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

const AdditionalInfo = ({ featureKeyword }) => {
  return (
    <Formik
      initialValues={{
        prerequisites: '',
        agenda: '',
        takeaways: [],
      }}
      validationSchema={Yup.object({
        prerequisites: Yup.string(),
        agenda: Yup.string(),
        takeaways: Yup.array(),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log(JSON.stringify(values));
          // eslint-disable-next-line no-alert
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
          window.location = `preview?feature=${featureKeyword}`;
        }, 400);
      }}
    >
      {({
        getFieldProps,
        errors,
        touched,
        setFieldValue,
        setFieldTouched,
        setFieldError,
      }) => (
        <Form className="input-form">
          <FormRow>
            <FormInput
              fieldName="prerequisites"
              label="Prerequisites or Previous Experience"
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
              fieldName="agenda"
              label="Agenda"
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
              inputType="links"
              fieldName="takeaways"
              getFieldProps={getFieldProps}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              setFieldError={setFieldError}
              errors={errors}
              touched={touched}
              label="Key Takeaways"
              links={[]}
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

export default AdditionalInfo;
