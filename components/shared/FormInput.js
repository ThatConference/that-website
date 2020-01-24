import React from 'react';
import styled, { css } from 'styled-components';
import parse from 'html-react-parser';
import Select from 'react-select';
import nextId from 'react-id-generator';

import { Field } from 'formik';
import baseTheme from '../../styles/baseTheme';
import {
  FormLabel,
  FormInputValidationMessage,
  FormInputRequiredIndicator,
} from './FormLayout';
import MarkdownEditor from './MarkdownEditor';
import ImageUpload from './ImageUpload';
import LinksInput from './LinksInput';
import StringsInput from './StringsInput';

const inputTypes = {
  checkbox: 'checkbox',
  file: 'file',
  links: 'links',
  markdown: 'markdown',
  select: 'select',
  strings: 'strings',
  text: 'text',
  textarea: 'textarea',
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

export const FormTextInput = styled(Field)`
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
    cols,
    disabled,
    errors,
    fieldHasValidation,
    fieldName,
    getFieldProps,
    helpText,
    inputType,
    isMulti,
    label,
    placeholder,
    rows,
    selectOptions,
    setFieldError,
    setFieldTouched,
    setFieldValue,
    touched,
    validate,
    values,
    required,
    onBlur,
  } = props;
  const fieldProps = getFieldProps ? getFieldProps(fieldName) : null;
  const isCheckbox = inputType && inputType === inputTypes.checkbox;
  const isImage = inputType && inputType === inputTypes.imageupload;
  const isLinks = inputType && inputType === inputTypes.links;
  const isMarkdown = inputType && inputType === inputTypes.markdown;
  const isSelect = inputType && inputType === inputTypes.select;
  const isStrings = inputType && inputType === inputTypes.strings;
  const isTextarea = inputType && inputType === inputTypes.textarea;
  const isTextbox = !inputType || inputType === inputTypes.text;

  const fieldInvalid = touched[fieldName] && errors[fieldName];
  const parsedLabel = parse(label);

  const getLabel = () => {
    return (
      <>
        {parsedLabel}
        {required && (
          <FormInputRequiredIndicator> *</FormInputRequiredIndicator>
        )}
      </>
    );
  };

  const getStyles = () => {
    const validClass = fieldInvalid ? 'invalid' : '';
    const disabledClass = disabled ? 'disabled' : '';

    return `${validClass} ${disabledClass}`;
  };

  return (
    <FormLabel htmlFor={fieldName}>
      {isCheckbox && (
        <>
          <FormCheckbox
            name={fieldName}
            id={fieldName}
            type="checkbox"
            checked={values[fieldName]}
            className={getStyles()}
            {...fieldProps}
          />
          {getLabel()}
        </>
      )}
      {isTextbox && (
        <>
          {getLabel()}
          <FormTextInput
            name={fieldName}
            id={fieldName}
            type="text"
            className={getStyles()}
            disabled={disabled}
            placeholder={placeholder}
            {...fieldProps}
            validate={validate}
            onBlur={e => {
              fieldProps.onBlur(e);
              if (onBlur) {
                onBlur(e);
              }
            }}
          />
        </>
      )}
      {isTextarea && (
        <>
          {getLabel()}
          <FormTextArea
            name={fieldName}
            id={fieldName}
            rows={rows || '5'}
            cols={cols || null}
            className={getStyles()}
            {...fieldProps}
          />
        </>
      )}
      {isSelect && (
        <>
          {getLabel()}
          <Select
            name={fieldName}
            id={fieldName}
            instanceId={nextId()}
            options={selectOptions}
            value={values[fieldName]}
            onChange={value => setFieldValue(fieldName, value)}
            isMulti={isMulti}
            placeholder=""
            className={`react-select-container ${getStyles()}`}
            styles={getSelectStyles()}
            {...fieldProps}
          />
        </>
      )}
      {isMarkdown && (
        <>
          {getLabel()}
          <MarkdownEditor
            field={fieldName}
            fieldHasValidation={fieldHasValidation}
            setFieldTouched={setFieldTouched}
            setFieldValue={setFieldValue}
            touched={touched}
            errors={errors}
            value={values[fieldName]}
            preview=""
            className={getStyles()}
            rows={rows}
            cols={cols}
            {...fieldProps}
          />
        </>
      )}
      {isImage && (
        <>
          {getLabel()}
          <ImageUpload field={fieldName} {...fieldProps} />
        </>
      )}
      {isLinks && (
        <>
          {getLabel()}
          <LinksInput
            field={fieldName}
            setFieldTouched={setFieldTouched}
            setFieldValue={setFieldValue}
            setFieldError={setFieldError}
            className={getStyles()}
            values={values}
            errors={errors}
            touched={touched}
            {...fieldProps}
          />
        </>
      )}
      {isStrings && (
        <>
          {getLabel()}
          <StringsInput
            field={fieldName}
            setFieldTouched={setFieldTouched}
            setFieldValue={setFieldValue}
            setFieldError={setFieldError}
            className={getStyles()}
            values={values}
            errors={errors}
            touched={touched}
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
