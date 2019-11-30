import React from 'react';
import styled from 'styled-components';

import { FormLabel, FormInputValidationMessage } from './FormLayout';

const inputTypes = {
  checkbox: 'checkbox',
  text: 'text',
};

const FormInputBase = styled.input`
  margin-top: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.mediumGray};
  background-color: ${({ theme }) => theme.colors.mediumLightGray};
`;

export const FormTextInput = styled(FormInputBase)`
  display: block;
  width: 100%;
`;

export const FormCheckbox = styled(FormInputBase)`
  margin-right: 1rem;
`;

const FormInput = props => {
  const { fieldName, inputType, formikForm, label } = props;
  const fieldProps = formikForm.getFieldProps(fieldName);
  const isTextbox = !inputType || inputType === inputTypes.text;
  const isCheckbox = inputType && inputType === inputTypes.checkbox;

  return (
    <FormLabel htmlFor={fieldName}>
      {isCheckbox && (
        <>
          <FormCheckbox
            name={fieldName}
            id={fieldName}
            type="checkbox"
            {...fieldProps}
          />
          {label}
        </>
      )}
      {isTextbox && (
        <>
          {label}
          <FormTextInput
            name={fieldName}
            id={fieldName}
            type="text"
            {...fieldProps}
          />
        </>
      )}
      {formikForm.touched[fieldName] && formikForm.errors[fieldName] ? (
        <FormInputValidationMessage>
          {formikForm.errors[fieldName]}
        </FormInputValidationMessage>
      ) : null}
    </FormLabel>
  );
};

export default FormInput;
