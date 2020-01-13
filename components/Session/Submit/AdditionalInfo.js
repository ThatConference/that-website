import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import debug from 'debug';

import FormInput from '../../shared/FormInput';
import {
  FormRow,
  FormRule,
  FormCancel,
  FormSubmit,
} from '../../shared/FormLayout';

const dlog = debug('that:session:additionalInfo');

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
        }
      }
    }
  }
`;

const AdditionalInfo = ({ session, setSession, setStepNumber, formCancel }) => {
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

  const sessionIsWorkshop =
    session && session.type && session.type.indexOf('WORKSHOP') !== -1;

  return (
    <Formik
      initialValues={{
        prerequisites: session.prerequisites || '',
        agenda: session.agenda || '',
        takeaways: session.takeaways
          ? session.takeaways.map(t => {
              return { text: t };
            })
          : [],
      }}
      validationSchema={Yup.object({
        prerequisites: sessionIsWorkshop
          ? Yup.string().required('Required')
          : Yup.string(),
        agenda: sessionIsWorkshop
          ? Yup.string().required('Required')
          : Yup.string(),
        takeaways: Yup.array().min(1, 'At least 1 is required'),
      })}
      onSubmit={values => {
        const updates = {
          prerequisites: values.prerequisites,
          agenda: values.agenda,
          takeaways: values.takeaways
            ? values.takeaways.map(t => t.text)
            : null,
        };
        updateSession({
          variables: { session: updates, sessionId: session.id },
        });
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
        isSubmitting,
      }) => (
        <Form className="input-form">
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
              values={values}
            />
          </FormRow>
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
          <FormRule />
          <FormCancel label="Back" onClick={formCancel} />
          <FormSubmit label="Continue" disabled={isSubmitting} />
        </Form>
      )}
    </Formik>
  );
};

export default AdditionalInfo;
