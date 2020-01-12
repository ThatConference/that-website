import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import debug from 'debug';
import { sessionConstants } from '../../../utilities';
import { FormRow, FormRule, FormSubmit } from '../../shared/FormLayout';
import {
  RadioButtonGroupItem,
  RadioButtonGroup,
} from '../../shared/CheckboxAndRadioButtonInput';

const dlog = debug('that:session:intro');

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

const Intro = ({ session, setSession, setStepNumber }) => {
  const [createSession] = useMutation(CREATE_SESSION, {
    onCompleted: ({ sessions }) => {
      dlog('session created %o', sessions);
      setSession(sessions.create);
      setStepNumber();
    },
    onError: createError => {
      dlog('Error creating session %o', createError);
      throw new Error(createError);
    },
  });

  const audience = session.category
    ? sessionConstants.SessionFors.find(sf => sf.value === session.category)
        .value
    : 'PROFESSIONAL';

  const sessionType = session.type
    ? sessionConstants.SessionTypes.find(st => st.value === session.type).value
    : 'REGULAR';

  return (
    <Formik
      initialValues={{
        audience,
        sessionType,
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
        });
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

export default Intro;
