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
  const { canFeature } = values;
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
          required={canFeature}
        />
      </FormRow>
      <FormRow>
        <FormInput
          fieldName="canFeature"
          getFieldProps={getFieldProps}
          errors={errors}
          touched={touched}
          values={values}
          label="Make my profile public (list on members pages, required to create sessions)"
          inputType="checkbox"
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
