import React from 'react';
import Router from 'next/router';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { connect } from 'react-redux';

import FormInput from '../../shared/FormInput';
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

const AdditionalInfo = ({ sessionId, featureKeyword }) => {
  const [updateSession] = useMutation(UPDATE_SESSION);
  return (
    <Formik
      initialValues={{
        prerequisites: '',
        agenda: '',
        takeaways: [],
      }}
      validationSchema={Yup.object({
        prerequisites: Yup.string(),
        agenda: Yup.string(),
        takeaways: Yup.array(),
      })}
      onSubmit={values => {
        const session = {
          prerequisites: values.prerequisites,
          agenda: values.agenda,
          takeaways: values.takeaways
            ? values.takeaways.map(t => t.text)
            : null,
        };
        updateSession({
          variables: { session, sessionId },
        }).then(
          () => {
            Router.push(`/wi/session/submit/lastly?feature=${featureKeyword}`);
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
        getFieldProps,
        errors,
        touched,
        values,
        setFieldValue,
        setFieldTouched,
        setFieldError,
      }) => (
        <Form className="input-form">
          <FormRow>
            <FormInput
              fieldName="prerequisites"
              fieldHasValidation={false}
              label="Prerequisites or Previous Experience"
              inputType="markdown"
              getFieldProps={getFieldProps}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              errors={errors}
              touched={touched}
              values={values}
            />
          </FormRow>
          <FormRow>
            <FormInput
              fieldName="agenda"
              fieldHasValidation={false}
              label="Agenda"
              inputType="markdown"
              getFieldProps={getFieldProps}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              errors={errors}
              touched={touched}
              values={values}
            />
          </FormRow>
          <FormRow>
            <FormInput
              inputType="strings"
              fieldName="takeaways"
              getFieldProps={getFieldProps}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              setFieldError={setFieldError}
              errors={errors}
              touched={touched}
              label="Key Takeaways"
              strings={[]}
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

export default connect(mapStateToProps)(AdditionalInfo);
