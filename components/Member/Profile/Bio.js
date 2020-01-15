import React from 'react';
import { FormRow, FormCancel, FormSubmit } from '../../shared/FormLayout';
import FormInput from '../../shared/FormInput';

const Bio = ({
  getFieldProps,
  errors,
  touched,
  formCancel,
  formSubmit,
  showButtons,
  setFieldValue,
  setFieldTouched,
  values,
}) => {
  return (
    <>
      <FormRow>
        <FormInput
          fieldName="bio"
          fieldHasValidation
          inputType="markdown"
          values={values}
          getFieldProps={getFieldProps}
          setFieldTouched={setFieldTouched}
          setFieldValue={setFieldValue}
          errors={errors}
          touched={touched}
          label="Bio"
          required
        />
      </FormRow>
      {showButtons && (
        <>
          <FormCancel label="Back" onClick={formCancel} />
          <FormSubmit label="Create" onClick={formSubmit} />
        </>
      )}
    </>
  );
};

export default Bio;
