import React from 'react';
import styled, { css } from 'styled-components';
import parse from 'html-react-parser';

import { FormLabel, FormInputValidationMessage } from './FormLayout';

const inputTypes = {
  checkbox: 'checkbox',
  text: 'text',
  textarea: 'textarea',
};

const sharedInputStyles = css`
  margin-top: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.mediumGray};
  background-color: ${({ theme }) => theme.colors.mediumLightGray};

  &:focus {
    outline: ${({ theme }) => theme.colors.thatBlue} auto 5px;
  }

  &.invalid {
    border-color: ${({ theme }) => theme.colors.danger};

    &:focus {
      outline: unset;
      border-color: ${({ theme }) => theme.colors.danger};
      box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.55);
    }
  }
`;

const sharedTextInputStyles = css`
  display: block;
  width: 100%;
`;

const FormInputBase = styled.input`
  ${sharedInputStyles}
`;

export const FormTextInput = styled(FormInputBase)`
  ${sharedTextInputStyles}
`;

export const FormTextArea = styled.textarea`
  ${sharedInputStyles}
  ${sharedTextInputStyles}
  resize: vertical;
`;

export const FormCheckbox = styled(FormInputBase)`
  margin-right: 1rem;
`;

export const FormInputHelpText = styled.p`
  font-family: franklin-gothic-urw, sans-serif;
  font-size: 1.3rem;
  margin: 0;
`;

const FormInput = props => {
  const {
    fieldName,
    inputType,
    formikForm,
    label,
    rows,
    cols,
    helpText,
  } = props;
  const fieldProps = formikForm.getFieldProps(fieldName);
  const isTextbox = !inputType || inputType === inputTypes.text;
  const isTextarea = inputType && inputType === inputTypes.textarea;
  const isCheckbox = inputType && inputType === inputTypes.checkbox;
  const fieldInvalid =
    formikForm.touched[fieldName] && formikForm.errors[fieldName];

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
          {parse(label)}
        </>
      )}
      {isTextbox && (
        <>
          {parse(label)}
          <FormTextInput
            name={fieldName}
            id={fieldName}
            type="text"
            className={fieldInvalid ? 'invalid' : ''}
            {...fieldProps}
          />
        </>
      )}
      {isTextarea && (
        <>
          {parse(label)}
          <FormTextArea
            name={fieldName}
            id={fieldName}
            rows={rows || '5'}
            cols={cols || null}
            className={fieldInvalid ? 'invalid' : ''}
            {...fieldProps}
          />
        </>
      )}
      {helpText && <FormInputHelpText>{helpText}</FormInputHelpText>}
      <FormInputValidationMessage>
        {fieldInvalid ? formikForm.errors[fieldName] : ''}
      </FormInputValidationMessage>
    </FormLabel>
  );
};

export default FormInput;
