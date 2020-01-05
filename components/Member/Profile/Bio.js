import React from 'react';
import * as Yup from 'yup';
import {
  FormRow,
  FormRule,
  FormCancel,
  FormSubmit,
} from '../../shared/FormLayout';
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
          validate={Yup.string().min(10, 'Must be at least 10 characters')}
        />
      </FormRow>
      <FormRule />
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
