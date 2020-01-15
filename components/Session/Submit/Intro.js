import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import debug from 'debug';
import { sessionConstants } from '../../../utilities';
import FormInput from '../../shared/FormInput';
import {
  FormRow,
  FormSubmit,
  FormRuleWithRequired,
} from '../../shared/FormLayout';
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
        title
        category
        status
      }
    }
  }
`;

const UPDATE_SESSION = gql`
  mutation updateSession($sessionId: ID!, $session: SessionUpdateInput!) {
    sessions {
      session(id: $sessionId) {
        update(session: $session) {
          id
          type
          title
          category
          status
        }
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

  const [updateSession] = useMutation(UPDATE_SESSION, {
    onCompleted: ({ sessions }) => {
      dlog('session updated %o', sessions.session.update);
      setSession({ ...session, ...sessions.session.update });
      setStepNumber();
    },
    onError: createError => {
      dlog('Error updating session %o', createError);
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
        title: session.title || '',
        audience,
        sessionType,
      }}
      validationSchema={Yup.object({
        ...sessionConstants.sessionValidations.intro,
      })}
      onSubmit={values => {
        if (session.id) {
          const newValues = {
            title: values.title,
            type: values.sessionType,
            category: values.audience,
          };
          updateSession({
            variables: {
              session: newValues,
              eventId: '1234',
              sessionId: session.id,
            },
          });
        } else {
          const newSession = {
            title: values.title,
            type: values.sessionType,
            category: values.audience,
            status: 'DRAFT',
          };
          createSession({
            variables: { session: newSession, eventId: 'ByE7Dc7eCGcRFzLhWhuI' },
          });
        }
      }}
    >
      {({
        errors,
        getFieldProps,
        isSubmitting,
        setFieldTouched,
        setFieldValue,
        touched,
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
              required
            />
          </FormRow>
          <FormRow>
            <RadioButtonGroup
              id="audience"
              label="Who is your session for?"
              value={values.audience}
              error={errors.audience}
              touched={touched.audience}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              required
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
              required
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
          <FormRuleWithRequired />
          <FormSubmit label="Continue" disabled={isSubmitting} />
        </Form>
      )}
    </Formik>
  );
};

export default Intro;
