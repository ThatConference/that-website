import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import FormInput from '../../shared/FormInput';
import {
  RadioButtonGroupItem,
  RadioButtonGroup,
} from '../../shared/CheckboxAndRadioButtonInput';
import {
  FormRow,
  FormRule,
  FormCancel,
  FormSubmit,
} from '../../shared/FormLayout';

const Lastly = ({ featureKeyword }) => {
  return (
    <Formik
      initialValues={{
        mentorshipLevel: '',
        whyAreYouBestPerson: '',
        whatElseShouldWeKnow: '',
      }}
      validationSchema={Yup.object({
        mentorshipLevel: Yup.string().required('Required'),
        whyAreYouBestPerson: Yup.string(),
        whatElseShouldWeKnow: Yup.array(),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          // eslint-disable-next-line no-console
          console.log(JSON.stringify(values));
          // eslint-disable-next-line no-alert
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
          window.location = `preview?feature=${featureKeyword}`;
        }, 400);
      }}
    >
      {({ getFieldProps, errors, touched, values }) => (
        <Form className="input-form">
          <FormRow>
            <RadioButtonGroup
              id="mentorshipLevel"
              label="If this session is selected, how much mentorship/collaboration with our team would you like?"
              value={values.mentorshipLevel}
              error={errors.mentorshipLevel}
              touched={touched.mentorshipLevel}
            >
              <Field
                component={RadioButtonGroupItem}
                name="mentorshipLevel"
                id="none"
                label="None, I've got this"
              />
              <Field
                component={RadioButtonGroupItem}
                name="mentorshipLevel"
                id="some"
                label="Some would be good"
              />
              <Field
                component={RadioButtonGroupItem}
                name="mentorshipLevel"
                id="alot"
                label="All I can get"
              />
            </RadioButtonGroup>
          </FormRow>
          <FormRow>
            <FormInput
              inputType="textarea"
              fieldName="whyAreYouBestPerson"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
              label="Why are you the best person to give this talk?"
              helpText="Are you an authority? Super passionate about it? Brag on yourself a bit.  We want you to."
            />
          </FormRow>
          <FormRow>
            <FormInput
              inputType="textarea"
              fieldName="whatElseShouldWeKnow"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
              label="What else should we know about your session or how to help you be successful"
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

export default Lastly;
