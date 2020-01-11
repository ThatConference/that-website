import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import Router from 'next/router';

import { sessionConstants } from '../../../utilities';
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
        audience: session.category
          ? sessionConstants.SessionFors.find(
              sf => sf.value === session.category,
            ).value
          : 'PROFESSIONAL',
        sessionType: session.type
          ? sessionConstants.SessionTypes.find(st => st.value === session.type)
              .value
          : 'REGULAR',
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
              {sessionConstants.SessionFors.map(sf => {
                return (
                  <Field
                    key={sf.value}
                    component={RadioButtonGroupItem}
                    name="audience"
                    id={sf.value}
                    label={sf.label}
                  />
                );
              })}
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
              {sessionConstants.SessionTypes.map(st => {
                return (
                  <Field
                    key={st.value}
                    component={RadioButtonGroupItem}
                    name="sessionType"
                    id={st.value}
                    label={st.label}
                  />
                );
              })}
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
