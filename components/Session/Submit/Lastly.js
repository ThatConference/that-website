import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import debug from 'debug';

import { sessionConstants } from '../../../utilities';

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

const dlog = debug('that:session:lastly');

const UPDATE_SESSION = gql`
  mutation updateSession($sessionId: ID!, $session: SessionUpdateInput!) {
    sessions {
      session(id: $sessionId) {
        update(session: $session) {
          id
          type
          category
          status
          title
          shortDescription
          longDescription
          primaryCategory
          secondaryCategory
          targetAudience
          supportingArtifacts {
            name
            url
          }
          prerequisites
          agenda
          takeaways
          canRecord
          mentorship
          whyAreYou
          otherComments
        }
      }
    }
  }
`;

const Lastly = ({ session, setSession, setStepNumber, formCancel }) => {
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

  return (
    <Formik
      initialValues={{
        agreeToBeingRecorded: session.canRecord || false,
        mentorshipLevel: session.mentorship || '',
        whyAreYouBestPerson: session.whyAreYou || '',
        whatElseShouldWeKnow: session.otherComments || '',
      }}
      validationSchema={Yup.object({
        ...sessionConstants.sessionValidations.lastly,
      })}
      onSubmit={values => {
        const updates = {
          canRecord: values.agreeToBeingRecorded,
          mentorship: values.mentorshipLevel,
          whyAreYou: values.whyAreYouBestPerson,
          otherComments: values.whatElseShouldWeKnow,
        };
        updateSession({
          variables: { session: updates, sessionId: session.id },
        });
      }}
    >
      {({ getFieldProps, errors, touched, values, isSubmitting }) => (
        <Form className="input-form">
          <FormRow>
            <FormInput
              fieldName="agreeToBeingRecorded"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
              values={values}
              label="Agree to have this session recorded if accepted?"
              inputType="checkbox"
            />
          </FormRow>
          <FormRow>
            <RadioButtonGroup
              id="mentorshipLevel"
              label="If this session is selected, how much mentorship/collaboration with our team would you like?"
              value={values.mentorshipLevel}
              error={errors.mentorshipLevel}
              touched={touched.mentorshipLevel}
            >
              {sessionConstants.SessionMentorshipLevels.map(m => {
                return (
                  <Field
                    key={m.value}
                    component={RadioButtonGroupItem}
                    name="mentorshipLevel"
                    id={m.value}
                    label={m.label}
                  />
                );
              })}
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
          <FormCancel label="Back" onClick={formCancel} />
          <FormSubmit label="Continue" disabled={isSubmitting} />
        </Form>
      )}
    </Formik>
  );
};

export default Lastly;
