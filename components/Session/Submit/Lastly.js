import React from 'react';
import Router from 'next/router';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { connect } from 'react-redux';

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

const Lastly = ({ dispatch, session }) => {
  const [updateSession] = useMutation(UPDATE_SESSION);
  return (
    <Formik
      initialValues={{
        agreeToBeingRecorded: session.canRecord || false,
        mentorshipLevel: session.mentorship || '',
        whyAreYouBestPerson: session.whyAreYou || '',
        whatElseShouldWeKnow: session.otherComments || '',
      }}
      validationSchema={Yup.object({
        agreeToBeingRecorded: Yup.bool(),
        mentorshipLevel: Yup.string().required('Required'),
        whyAreYouBestPerson: Yup.string(),
        whatElseShouldWeKnow: Yup.string(),
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
        }).then(
          result => {
            dispatch({
              type: 'SESSION',
              payload: result.data.sessions.session.update,
            });
            Router.push('/wi/session/submit/preview');
          },
          error => {
            // ToDo: Appropriately log and handle error
            // eslint-disable-next-line no-console
            console.log(`Error: ${error}`);
          },
        );
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
          <FormCancel label="Back" />
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

export default connect(mapStateToProps)(Lastly);
