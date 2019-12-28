import React from 'react';
import Router from 'next/router';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import FormInput from '../../shared/FormInput';
import {
  FormRow,
  FormRule,
  FormCancel,
  FormSubmit,
} from '../../shared/FormLayout';

const categories = [
  { value: 'WEB_DEVELOPMENT', label: 'Web Development' },
  { value: 'architecture', label: 'Architecture' },
  { value: 'arvr', label: 'AR/VR' },
];

const audiences = [
  { value: 'anybody', label: 'Anybody' },
  { value: 'developers', label: 'Developers' },
  { value: 'managers', label: 'Managers' },
];

const UPDATE_SESSION = gql`
  mutation updateSession($sessionId: ID!, $session: SessionUpdateInput!) {
    sessions {
      session(id: $sessionId) {
        update(session: $session) {
          id
          title
          shortDescription
          longDescription
          primaryCategory
          secondaryCategory
        }
      }
    }
  }
`;

const DetailForm = ({ featureKeyword }) => {
  const [updateSession] = useMutation(UPDATE_SESSION);
  return (
    <Formik
      initialValues={{
        title: '',
        shortDescription: '',
        longDescription: '',
        primaryCategory: '',
        secondaryCategories: [],
        targetAudiences: [],
        supportingArtifacts: [],
      }}
      validationSchema={Yup.object({
        title: Yup.string()
          .min(3, 'Must be at least 3 characters')
          .required('Required'),
        shortDescription: Yup.string()
          .min(3, 'Must be at least 3 characters')
          .max(100, 'Must be 100 characters or less')
          .required('Required'),
        longDescription: Yup.string()
          .min(3, 'Must be at least 3 characters')
          .required('Required'),
        primaryCategory: Yup.string().required('Required'),
        secondaryCategories: Yup.array().required('At least one is required'),
        targetAudiences: Yup.array().required('At least one is required'),
        supportingArtifacts: Yup.array(),
      })}
      onSubmit={values => {
        const session = {
          title: values.title,
          shortDescription: values.shortDescription,
          longDescription: values.longDescription,
          primaryCategory: values.primaryCategory.value,
          secondaryCategory: values.secondaryCategory
            ? values.secondaryCategory[0].value
            : null,
          // supportingArtifacts: values.supportingArtifacts,
        };
        updateSession({
          variables: { session, sessionId: 'UgbscKWvLTwlREA8o1N8' },
        }).then(
          result => {
            console.log(`Result: ${JSON.stringify(result, null, 2)}`);
            // eslint-disable-next-line no-alert
            alert(`Session Update Successfully`);
            Router.push(`/wi/session/submit/details?feature=${featureKeyword}`);
          },
          error => {
            console.log(`Error: ${error}`);
          },
        );
      }}
    >
      {({
        getFieldProps,
        errors,
        touched,
        setFieldValue,
        setFieldTouched,
        setFieldError,
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
            />
          </FormRow>
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
              links={[]}
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

export default DetailForm;
