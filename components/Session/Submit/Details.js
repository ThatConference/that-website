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

const categories = [
  { value: 'ACCESSIBILITY', label: 'Accessibility' },
  { value: 'ARCHITECTURE', label: 'Architecture' },
  { value: 'AR_VR', label: 'AR/VR' },
  { value: 'CLOUD_COMPUTING', label: 'Cloud' },
  { value: 'DATABASE_STORAGE', label: 'Database/Storage' },
  { value: 'DESIGN_UX', label: 'Design/UX' },
  { value: 'DEV_OPS', label: 'DevOps' },
  { value: 'INTRASTRUCTURE', label: 'Infrastructure' },
  { value: 'IOT_MAKER', label: 'IoT/Maker' },
  { value: 'LANGUAGES', label: 'Languages' },
  { value: 'MACHINE_LEARNING', label: 'Machine Learning' },
  { value: 'MOBILE', label: 'Mobile' },
  { value: 'PRODUCT_MANAGEMENT', label: 'Product Management' },
  { value: 'SOFT_SKILLS', label: 'Soft Skills' },
  { value: 'SECURITY', label: 'Security' },
  { value: 'TESTING', label: 'Testing' },
  { value: 'TOOLING', label: 'Tooliing' },
  { value: 'USER_INTERFACES', label: 'UI' },
  { value: 'WEB', label: 'Web' },
  { value: 'OTHER', label: "You Can't Put a Label on Me" },
];

const audiences = [
  { value: 'ANYBODY', label: 'Anybody' },
  { value: 'DEVELOPERS', label: 'Developers' },
  { value: 'MANAGERS', label: 'Managers' },
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

const DetailForm = ({ sessionId, featureKeyword }) => {
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
          secondaryCategory: values.secondaryCategories
            ? values.secondaryCategories.map(sc => sc.value)
            : null,
          targetAudience: values.targetAudiences
            ? values.targetAudiences.map(sc => sc.value)
            : null,
          supportingArtifacts: values.supportingArtifacts,
        };
        console.log(`Session: ${JSON.stringify(session, null, 2)}`);
        updateSession({
          variables: { session, sessionId },
        }).then(
          () => {
            Router.push(
              `/wi/session/submit/additional-info?feature=${featureKeyword}`,
            );
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

const mapStateToProps = state => {
  return {
    sessionId: state.sessionId,
  };
};

export default connect(mapStateToProps)(DetailForm);
