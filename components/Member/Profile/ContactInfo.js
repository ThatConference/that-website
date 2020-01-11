import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import FormInput from '../../shared/FormInput';
import { FormRow } from '../../shared/FormLayout';

const GET_PROFILE_SLUG_VALID = gql`
  query isProfileSLugTaken($slug: String!) {
    members {
      isProfileSlugTaken(slug: $slug)
    }
  }
`;

const FlexFormRow = styled(FormRow)`
  display: flex;
  justify-content: space-between;

  label {
    flex-grow: 2;
    max-width: 50%;
    &:not(:last-child) {
      padding-right: 2rem;
    }
  }
`;

const ContactInfoForm = ({
  editMode,
  errors,
  getFieldProps,
  touched,
  values,
}) => {
  const [validProfileSlug, setValidProfileSlug] = useState(false);

  const validProfileSlugIndicator = newProfileSlug => {
    const { loading, error, data } = useQuery(GET_PROFILE_SLUG_VALID, {
      variables: { slug: newProfileSlug },
      onCompleted(d) {
        console.log('data', d);
        // setValidProfileSlug(d.members.isProfileSlugTaken);
        return d;
      },
    });
    return false;
  };

  return (
    <>
      <FlexFormRow>
        <FormInput
          fieldName="firstName"
          getFieldProps={getFieldProps}
          errors={errors}
          touched={touched}
          label="First Name"
        />
        <FormInput
          fieldName="lastName"
          getFieldProps={getFieldProps}
          errors={errors}
          touched={touched}
          label="Last Name"
        />
        <FormInput
          fieldName="profileSlug"
          getFieldProps={getFieldProps}
          errors={errors}
          touched={touched}
          label="Profile Slug"
          disabled={editMode}
          fieldHasValidation
          validate={e => {
            // setChangedProfileSlug(e.target.value);
            // setRunValidation(true);
            validProfileSlugIndicator(e.target.value);
          }}
        />
        <div>
          {!validProfileSlug && <p>not valid</p>}
          {validProfileSlug && <p>valid</p>}
        </div>
      </FlexFormRow>
      <FormRow>
        <FormInput
          fieldName="email"
          getFieldProps={getFieldProps}
          errors={errors}
          touched={touched}
          label="Email Address"
          placeholder="hello@youareawesome.com"
        />
      </FormRow>
      <FormRow>
        <FormInput
          fieldName="mobilePhone"
          getFieldProps={getFieldProps}
          errors={errors}
          touched={touched}
          label="Mobile Phone"
          placeholder="ex: +10001110000"
        />
      </FormRow>
      <FlexFormRow>
        <FormInput
          fieldName="city"
          getFieldProps={getFieldProps}
          errors={errors}
          touched={touched}
          label="City"
        />
        <FormInput
          fieldName="state"
          getFieldProps={getFieldProps}
          errors={errors}
          touched={touched}
          label="State"
        />
        <FormInput
          fieldName="country"
          getFieldProps={getFieldProps}
          errors={errors}
          touched={touched}
          label="Country"
        />
      </FlexFormRow>
      <FormRow>
        <FormInput
          fieldName="company"
          getFieldProps={getFieldProps}
          errors={errors}
          touched={touched}
          label="Company"
        />
      </FormRow>
      <FormRow>
        <FormInput
          fieldName="jobTitle"
          getFieldProps={getFieldProps}
          errors={errors}
          touched={touched}
          label="Title"
        />
      </FormRow>
      {!editMode && (
        <FlexFormRow>
          <FormInput
            fieldName="acceptedCodeOfConduct"
            getFieldProps={getFieldProps}
            errors={errors}
            touched={touched}
            label="Agree to the <a href='/wi/code-of-conduct' target='_blank'>Code of Conduct</a>"
            inputType="checkbox"
            values={values}
          />
          <FormInput
            fieldName="isOver13"
            getFieldProps={getFieldProps}
            errors={errors}
            touched={touched}
            label="Are you over 13 years old?"
            inputType="checkbox"
            values={values}
          />
          <FormInput
            fieldName="acceptedTermsOfService"
            getFieldProps={getFieldProps}
            errors={errors}
            touched={touched}
            label="Agree to <a href='/wi/terms-of-use' target='_blank'>THAT Terms of Use</a>?"
            inputType="checkbox"
            values={values}
          />
        </FlexFormRow>
      )}
    </>
  );
};

export default ContactInfoForm;
