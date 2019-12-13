import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import {
  FormRow,
  FormRule,
  FormCancel,
  FormSubmit,
} from '../../shared/FormLayout';

import {
  RadioButtonGroupItem,
  RadioButtonGroup,
} from '../../shared/CheckboxAndRadioButtonInput';

const Intro = () => {
  return (
    <Formik
      initialValues={{
        audience: '',
        sessionType: '',
      }}
      validationSchema={Yup.object({
        audience: Yup.string().required('Selection required'),
        sessionType: Yup.string().required('Selection required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          // eslint-disable-next-line no-alert
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
          window.location = 'submit/details';
        }, 400);
      }}
    >
      {({ setFieldValue, setFieldTouched, values, errors, touched }) => (
        <Form className="input-form">
          <FormRow>
            <RadioButtonGroup
              id="audience"
              label="Who is your session for?"
              value={values.audience}
              error={errors.audience}
              touched={touched.audience}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
            >
              <Field
                component={RadioButtonGroupItem}
                name="audience"
                id="professionals"
                label="Professionals"
              />
              <Field
                component={RadioButtonGroupItem}
                name="audience"
                id="family"
                label="Family"
              />
            </RadioButtonGroup>
          </FormRow>
          <FormRow>
            <RadioButtonGroup
              id="sessionType"
              label="What type of session are you proposing?"
              value={values.sessionType}
              error={errors.sessionType}
              touched={touched.sessionType}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
            >
              <Field
                component={RadioButtonGroupItem}
                name="sessionType"
                id="standard"
                label="Regular session (60 minute talk)"
              />
              <Field
                component={RadioButtonGroupItem}
                name="sessionType"
                id="keynote"
                label="Keynote (90 minute talk)"
              />
              <Field
                component={RadioButtonGroupItem}
                name="sessionType"
                id="preconHalfDay"
                label="Half-day Workshop (pre-conference)"
              />
              <Field
                component={RadioButtonGroupItem}
                name="sessionType"
                id="preconFullDay"
                label="Full-day Workshop (pre-conference)"
              />
            </RadioButtonGroup>
          </FormRow>
          <FormRule />
          <FormCancel label="Back" />
          <FormSubmit label="Continue" />
        </Form>
      )}
    </Formik>
  );
};

export default Intro;
