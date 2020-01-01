import React from 'react';
import styled, { css } from 'styled-components';
import parse from 'html-react-parser';
import Select from 'react-select';
import nextId from 'react-id-generator';

import baseTheme from '../../styles/baseTheme';
import { FormLabel, FormInputValidationMessage } from './FormLayout';
import MarkdownEditor from './MarkdownEditor';
import ImageUpload from './ImageUpload';
import LinksInput from './LinksInput';
import StringsInput from './StringsInput';

const inputTypes = {
  checkbox: 'checkbox',
  text: 'text',
  textarea: 'textarea',
  select: 'select',
  markdown: 'markdown',
  imageupload: 'imageupload',
  links: 'links',
  strings: 'strings',
};

const sharedTextInputStyles = css`
  display: block;
  width: 100%;
`;

const getSelectStyles = () => {
  return {
    control: (base, state) => ({
      ...base,
      borderRadius: 0,
      border: `0.1rem solid ${baseTheme.colors.mediumGray}`,
      backgroundColor: baseTheme.colors.mediumLightGray,
      boxShadow: state.isFocused ? 0 : 0,
      outlineOffset: '-2px',
      outline: state.isFocused
        ? `${baseTheme.colors.thatBlue} auto 1px !important`
        : '',
      '&:hover': {
        outline: state.isFocused
          ? `${baseTheme.colors.thatBlue} auto 1px !important`
          : '',
      },
    }),
  };
};

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
    fieldHasValidation,
    inputType,
    getFieldProps,
    touched,
    setFieldTouched,
    setFieldValue,
    setFieldError,
    errors,
    label,
    rows,
    cols,
    helpText,
    selectOptions,
    values,
    isMulti,
    links,
    strings,
  } = props;
  const fieldProps = getFieldProps ? getFieldProps(fieldName) : null;
  const isTextbox = !inputType || inputType === inputTypes.text;
  const isTextarea = inputType && inputType === inputTypes.textarea;
  const isMarkdown = inputType && inputType === inputTypes.markdown;
  const isImage = inputType && inputType === inputTypes.imageupload;
  const isCheckbox = inputType && inputType === inputTypes.checkbox;
  const isSelect = inputType && inputType === inputTypes.select;
  const isLinks = inputType && inputType === inputTypes.links;
  const isStrings = inputType && inputType === inputTypes.strings;

  const fieldInvalid = touched[fieldName] && errors[fieldName];
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
      {isSelect && (
        <>
          {parsedLabel}
          <Select
            name={fieldName}
            id={fieldName}
            instanceId={nextId()}
            options={selectOptions}
            value={values[fieldName]}
            onChange={value => setFieldValue(fieldName, value)}
            isMulti={isMulti}
            placeholder=""
            className={`react-select-container ${styleClass}`}
            styles={getSelectStyles()}
            {...fieldProps}
          />
        </>
      )}
      {isMarkdown && (
        <>
          {parsedLabel}
          <MarkdownEditor
            field={fieldName}
            fieldHasValidation={fieldHasValidation}
            setFieldTouched={setFieldTouched}
            setFieldValue={setFieldValue}
            touched={touched}
            value={values[fieldName]}
            preview=""
            className={styleClass}
            rows={rows}
            cols={cols}
            {...fieldProps}
          />
        </>
      )}
      {isImage && (
        <>
          {parsedLabel}
          <ImageUpload field={fieldName} {...fieldProps} />
        </>
      )}
      {isLinks && (
        <>
          {parsedLabel}
          <LinksInput
            field={fieldName}
            setFieldTouched={setFieldTouched}
            setFieldValue={setFieldValue}
            setFieldError={setFieldError}
            className={styleClass}
            links={links}
            {...fieldProps}
          />
        </>
      )}
      {isStrings && (
        <>
          {parsedLabel}
          <StringsInput
            field={fieldName}
            setFieldTouched={setFieldTouched}
            setFieldValue={setFieldValue}
            setFieldError={setFieldError}
            className={styleClass}
            strings={strings}
            {...fieldProps}
          />
        </>
      )}
      {helpText && <FormInputHelpText>{helpText}</FormInputHelpText>}
      <FormInputValidationMessage>
        {fieldInvalid ? errors[fieldName] : ''}
      </FormInputValidationMessage>
    </FormLabel>
  );
};

export default FormInput;
