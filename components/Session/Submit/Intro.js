import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

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
      onSubmit={values => {
        const session = values;
        session.title = 'temp';

        const SUBMIT = gql`
          mutation createSession($eventId: ID!, $session: SessionCreateInput!) {
            sessions {
              create(eventId: $eventId, session: $session) {
                id
                title
                type
                targetAudience
                createdAt
                lastUpdatedAt
              }
            }
          }
        `;

        const { loading, error, data } = useMutation(SUBMIT, {
          variables: { session, eventId: 'ByE7Dc7eCGcRFzLhWhuI' },
        });
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
                id="PROFESSIONALS"
                label="Professionals"
              />
              <Field
                component={RadioButtonGroupItem}
                name="audience"
                id="FAMILY"
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
                id="REGULAR"
                label="Regular session (60 minute talk)"
              />
              <Field
                component={RadioButtonGroupItem}
                name="sessionType"
                id="KEYNOTE"
                label="Keynote (90 minute talk)"
              />
              <Field
                component={RadioButtonGroupItem}
                name="sessionType"
                id="HALF_DAY_WORKSHOP"
                label="Half-day Workshop (pre-conference)"
              />
              <Field
                component={RadioButtonGroupItem}
                name="sessionType"
                id="FULL_DAY_WORKSHOP"
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
