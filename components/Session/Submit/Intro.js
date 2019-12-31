import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import Router from 'next/router';

import { FormRow, FormRule, FormSubmit } from '../../shared/FormLayout';

import {
  RadioButtonGroupItem,
  RadioButtonGroup,
} from '../../shared/CheckboxAndRadioButtonInput';

const CREATE_SESSION = gql`
  mutation createSession($eventId: ID!, $session: SessionCreateInput!) {
    sessions {
      create(eventId: $eventId, session: $session) {
        id
        type
        category
        status
      }
    }
  }
`;

const Intro = ({ dispatch, session }) => {
  const [createSession] = useMutation(CREATE_SESSION);
  return (
    <Formik
      initialValues={{
        audience: session.category || 'PROFESSIONAL',
        sessionType: session.type || 'REGULAR',
      }}
      validationSchema={Yup.object({
        audience: Yup.string().required('Selection required'),
        sessionType: Yup.string().required('Selection required'),
      })}
      onSubmit={values => {
        const newSession = {
          title: 'Step1_Temporary_Title',
          type: values.sessionType,
          category: values.audience,
          status: 'DRAFT',
        };
        createSession({
          variables: { session: newSession, eventId: '1234' },
        }).then(
          result => {
            dispatch({
              type: 'SESSION',
              payload: result.data.sessions.create,
            });
            Router.push('/wi/session/submit/details');
          },
          error => {
            // ToDo: Appropriately log and handle error
            // eslint-disable-next-line no-console
            console.log(`Error: ${error}`);
          },
        );
      }}
    >
      {({
        setFieldValue,
        setFieldTouched,
        values,
        errors,
        touched,
        isSubmitting,
      }) => (
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
                id="PROFESSIONAL"
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
          <FormSubmit label="Continue" disabled={isSubmitting} />
        </Form>
      )}
    </Formik>
  );
};

const mapStateToProps = state => {
  return {
    session: state.session,
  };
};

export default connect(mapStateToProps)(Intro);
