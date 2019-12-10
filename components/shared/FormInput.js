import React from 'react';
import styled, { css } from 'styled-components';
import parse from 'html-react-parser';

import { FormLabel, FormInputValidationMessage } from './FormLayout';
import MarkdownEditor from './MarkdownEditor';
import ImageUpload from './ImageUpload';

const inputTypes = {
  checkbox: 'checkbox',
  text: 'text',
  textarea: 'textarea',
  markdown: 'markdown',
  imageupload: 'imageupload',
};

const sharedTextInputStyles = css`
  display: block;
  width: 100%;
`;

export const FormTextInput = styled.input`
  ${sharedTextInputStyles}
`;

export const FormTextArea = styled.textarea`
  ${sharedTextInputStyles}
  resize: vertical;
`;

export const FormImageInput = styled(ImageUpload)`
  ${sharedTextInputStyles}
`;

export const FormCheckbox = styled.input`
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
  const isMarkdown = inputType && inputType === inputTypes.markdown;
  const isImage = inputType && inputType === inputTypes.imageupload;
  const isCheckbox = inputType && inputType === inputTypes.checkbox;

  const fieldInvalid =
    formikForm.touched[fieldName] && formikForm.errors[fieldName];
  const styleClass = fieldInvalid ? 'invalid' : '';
  const parsedLabel = parse(label);

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
          {parsedLabel}
        </>
      )}
      {isTextbox && (
        <>
          {parsedLabel}
          <FormTextInput
            name={fieldName}
            id={fieldName}
            type="text"
            className={styleClass}
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
            className={styleClass}
            {...fieldProps}
          />
        </>
      )}
      {isMarkdown && (
        <>
          {parsedLabel}
          <MarkdownEditor
            field={fieldName}
            formikForm={formikForm}
            preview=""
            className={styleClass}
            {...fieldProps}
          />
        </>
      )}
      {isImage && (
        <>
          {parsedLabel}
          <ImageUpload
            field={fieldName}
            formikForm={formikForm}
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
