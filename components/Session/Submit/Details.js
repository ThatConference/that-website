import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import debug from 'debug';

import { sessionConstants } from '../../../utilities';
import FormInput from '../../shared/FormInput';
import {
  FormRow,
  FormRule,
  FormCancel,
  FormSubmit,
} from '../../shared/FormLayout';

const dlog = debug('that:session:details');

const categories = sessionConstants.SessionCategories;
const audiences = sessionConstants.SessionAudiences;

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
        }
      }
    }
  }
`;

const DetailForm = ({ session, setSession, setStepNumber, formCancel }) => {
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
        shortDescription: session.shortDescription || '',
        longDescription: session.longDescription || '',
        primaryCategory: session.primaryCategory
          ? categories.find(c => c.value === session.primaryCategory)
          : '',
        secondaryCategories: session.secondaryCategory
          ? categories.filter(
              c => session.secondaryCategory.indexOf(c.value) !== -1,
            )
          : [],
        targetAudiences: session.targetAudience
          ? audiences.filter(
              a => session.targetAudience.indexOf(a.value) !== -1,
            )
          : [],
        supportingArtifacts: session.supportingArtifacts
          ? session.supportingArtifacts.map(m => {
              return { name: m.name, url: m.url };
            })
          : [],
      }}
      validationSchema={Yup.object({
        ...sessionConstants.sessionValidations.details,
      })}
      onSubmit={values => {
        const updates = {
          title: values.title,
          shortDescription: values.shortDescription,
          longDescription: values.longDescription,
          primaryCategory: values.primaryCategory.value,
          secondaryCategory: values.secondaryCategories
            ? values.secondaryCategories.map(sc => sc.value)
            : null,
          targetAudience: values.targetAudiences
            ? values.targetAudiences.map(sc => sc.value)
            : null,
          supportingArtifacts: values.supportingArtifacts,
        };
        updateSession({
          variables: { session: updates, sessionId: session.id },
        });
      }}
    >
      {({
        errors,
        getFieldProps,
        isSubmitting,
        setFieldError,
        setFieldTouched,
        setFieldValue,
        touched,
        values,
      }) => (
        <Form className="input-form">
          <FormRow>
            <FormInput
              fieldName="shortDescription"
              label="Short Description"
              helpText="Maximum 100 characters"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
            />
          </FormRow>
          <FormRow>
            <FormInput
              fieldName="longDescription"
              fieldHasValidation
              label="Full Description"
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
              fieldName="primaryCategory"
              label="Primary Category"
              selectOptions={categories}
              inputType="select"
              setFieldValue={setFieldValue}
              values={values}
              touched={touched}
              errors={errors}
              helpText="You might not find a perfect fit, just choose the one that applies the most"
            />
          </FormRow>
          <FormRow>
            <FormInput
              fieldName="secondaryCategories"
              label="Secondary Categories"
              selectOptions={categories}
              inputType="select"
              isMulti
              setFieldValue={setFieldValue}
              values={values}
              touched={touched}
              errors={errors}
            />
          </FormRow>
          <FormRow>
            <FormInput
              fieldName="targetAudiences"
              label="Target Audiences"
              selectOptions={audiences}
              inputType="select"
              isMulti
              setFieldValue={setFieldValue}
              values={values}
              touched={touched}
              errors={errors}
            />
          </FormRow>
          <FormRow>
            <FormInput
              inputType="links"
              fieldName="supportingArtifacts"
              getFieldProps={getFieldProps}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              setFieldError={setFieldError}
              errors={errors}
              touched={touched}
              label="Supporting Links/Related Resources"
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

export default DetailForm;
