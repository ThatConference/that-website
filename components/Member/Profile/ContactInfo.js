import React from 'react';
import styled from 'styled-components';
import FormInput from '../../shared/FormInput';
import { FormRow } from '../../shared/FormLayout';

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

const ContactInfoForm = ({ getFieldProps, errors, touched, values }) => {
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
        />
      </FlexFormRow>
      <FormRow>
        <FormInput
          fieldName="email"
          getFieldProps={getFieldProps}
          errors={errors}
          touched={touched}
          label="Email Address"
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
      <FlexFormRow>
        <FormInput
          fieldName="acceptedCodeOfConduct"
          getFieldProps={getFieldProps}
          errors={errors}
          touched={touched}
          label="Agree to the <a href='code-of-conduct'>Code of Conduct</a>"
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
      </FlexFormRow>
      <FlexFormRow>
        <FormInput
          fieldName="acceptedTermsOfService"
          getFieldProps={getFieldProps}
          errors={errors}
          touched={touched}
          label="Agree to <a href='terms-of-service'>THAT Terms of Service</a>?"
          inputType="checkbox"
          values={values}
        />
      </FlexFormRow>
    </>
  );
};

export default ContactInfoForm;
