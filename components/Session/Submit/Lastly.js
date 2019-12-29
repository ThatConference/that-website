import React from 'react';
import Router from 'next/router';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { connect } from 'react-redux';

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
        }
      }
    }
  }
`;

const Lastly = ({ sessionId, featureKeyword }) => {
  const [updateSession] = useMutation(UPDATE_SESSION);
  return (
    <Formik
      initialValues={{
        agreeToBeingRecorded: false,
        mentorshipLevel: '',
        whyAreYouBestPerson: '',
        whatElseShouldWeKnow: '',
      }}
      validationSchema={Yup.object({
        agreeToBeingRecorded: Yup.bool(),
        mentorshipLevel: Yup.string().required('Required'),
        whyAreYouBestPerson: Yup.string(),
        whatElseShouldWeKnow: Yup.string(),
      })}
      onSubmit={values => {
        const session = {
          canRecord: values.agreeToBeingRecorded,
          mentorship: values.mentorshipLevel,
          whyAreYou: values.whyAreYouBestPerson,
          otherComments: values.whatElseShouldWeKnow,
        };
        updateSession({
          variables: { session, sessionId },
        }).then(
          () => {
            Router.push(`/wi/session/submit/preview?feature=${featureKeyword}`);
          },
          error => {
            console.log(`Error: ${error}`);
          },
        );
      }}
    >
      {({ getFieldProps, errors, touched, values }) => (
        <Form className="input-form">
          <FormRow>
            <FormInput
              fieldName="agreeToBeingRecorded"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
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
              <Field
                component={RadioButtonGroupItem}
                name="mentorshipLevel"
                id="NO"
                label="None, I've got this"
              />
              <Field
                component={RadioButtonGroupItem}
                name="mentorshipLevel"
                id="SOME"
                label="Some would be good"
              />
              <Field
                component={RadioButtonGroupItem}
                name="mentorshipLevel"
                id="YES"
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

const mapStateToProps = state => {
  return {
    sessionId: state.sessionId,
  };
};

export default connect(mapStateToProps)(Lastly);
