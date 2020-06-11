import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useLazyQuery } from '@apollo/react-hooks';
import FormInput from '../../shared/FormInput';
import { FormRow } from '../../shared/FormLayout';
// import IconText from '../../shared/IconText';

const GET_PROFILE_SLUG_VALID = gql`
  query isProfileSlugTaken($slug: Slug!) {
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

// const ValidIcon = styled(IconText)`
//   fill: green;
// `;

// const InvalidIcon = styled(IconText)`
//   fill: red;
// `;

// const ProfileSlugValid = styled.div`
//   display: flex;
//   align-items: center;
// `;

const ContactInfoForm = ({
  editMode,
  errors,
  getFieldProps,
  touched,
  values,
}) => {
  const [validProfileSlug, setValidProfileSlug] = useState(null);

  const [validateSlug, { loading, data }] = useLazyQuery(
    GET_PROFILE_SLUG_VALID,
    {
      fetchPolicy: 'network-only',
      onCompleted: ({ members }) => {
        setValidProfileSlug(!members.isProfileSlugTaken);
      },
      onError: () => setValidProfileSlug(false),
    },
  );

  const getProfileSlugErrors = () => {
    if (loading) {
      return null;
    }

    if (touched.profileSlug) {
      if (!values.profileSlug) {
        return 'Required';
      }

      if (validProfileSlug === false) {
        return 'Slug already taken or invalid characters';
      }
    }
    return null;
  };

  useEffect(() => {
    if (!loading && data && data.members) {
      setValidProfileSlug(!data.members.isProfileSlugTaken);
    }
  });

  if (!editMode && getProfileSlugErrors()) {
    // eslint-disable-next-line no-param-reassign
    errors.profileSlug = getProfileSlugErrors();
  }

  return (
    <>
      <FlexFormRow>
        <FormInput
          fieldName="firstName"
          getFieldProps={getFieldProps}
          errors={errors}
          touched={touched}
          label="First Name"
          required
        />
        <FormInput
          fieldName="lastName"
          getFieldProps={getFieldProps}
          errors={errors}
          touched={touched}
          label="Last Name"
          required
        />
        <FormInput
          fieldName="profileSlug"
          getFieldProps={getFieldProps}
          errors={errors}
          touched={touched}
          label="Profile Slug"
          disabled={editMode}
          onBlur={e => {
            if (!editMode && e.target.value) {
              let userSlug = e.target.value;
              let isSlugValid = /^[a-zA-Z0-9-_]+$/g.test(userSlug)
              if (isSlugValid) {
                validateSlug({
                  variables: { slug: userSlug },
                });
              } else {
                errors.profileSlug = 'Invalid characters';
              }
            }
          }}
          required
          helpText="Part of the path to your THAT Profile (i.e. thatconference.com/member/<Profile Slug>). Valid characters: letters, numbers, underscore and dash"
        />
        {/* <ProfileSlugValid>
          {!validProfileSlug && (
            <InvalidIcon
              icon="error"
              height="20"
              width="20"
              viewBoxHeight="15"
              viewBoxWidth="15"
            >
              Profile slug is already taken
            </InvalidIcon>
          )}
          {validProfileSlug && (
            <ValidIcon
              icon="check"
              height="20"
              width="20"
              viewBoxHeight="15"
              viewBoxWidth="15"
            >
              Available
            </ValidIcon>
          )}
        </ProfileSlugValid> */}
      </FlexFormRow>
      <FormRow>
        <FormInput
          fieldName="email"
          getFieldProps={getFieldProps}
          errors={errors}
          touched={touched}
          label="Email Address"
          placeholder="hello@youareawesome.com"
          required
        />
      </FormRow>
      <FormRow>
        <FormInput
          fieldName="mobilePhone"
          getFieldProps={getFieldProps}
          errors={errors}
          touched={touched}
          label="Mobile Phone"
          helpText="Enter like: +10001110000"
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
            required
          />
          <FormInput
            fieldName="isOver13"
            getFieldProps={getFieldProps}
            errors={errors}
            touched={touched}
            label="Are you over 13 years old?"
            inputType="checkbox"
            values={values}
            required
          />
          <FormInput
            fieldName="acceptedTermsOfService"
            getFieldProps={getFieldProps}
            errors={errors}
            touched={touched}
            label="Agree to <a href='/wi/terms-of-use' target='_blank'>THAT Terms of Use</a>?"
            inputType="checkbox"
            values={values}
            required
          />
        </FlexFormRow>
      )}
    </>
  );
};

export default ContactInfoForm;
