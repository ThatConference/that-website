import React from 'react';
import styled from 'styled-components';

import {
  FormInputValidationMessage,
  FormLabel,
  FormInputRequiredIndicator,
} from './FormLayout';

const Label = styled.label`
  margin-left: 1rem;
`;

export const CheckboxGroupItem = ({
  field: { name, value, onChange, onBlur },
  form: { errors },
  id,
  label,
}) => {
  return (
    <div>
      <input
        name={name}
        id={id}
        type="checkbox"
        value={value}
        checked={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <Label htmlFor={id}>{label}</Label>
      <FormInputValidationMessage>{errors[name]}</FormInputValidationMessage>
    </div>
  );
};

export class CheckboxGroup extends React.Component {
  handleChange = event => {
    const target = event.currentTarget;
    const { value, id, onChange } = this.props;
    const valueArray = [...value] || [];

    if (target.checked) {
      valueArray.push(target.id);
    } else {
      valueArray.splice(valueArray.indexOf(target.id), 1);
    }

    onChange(id, valueArray);
  };

  handleBlur = () => {
    const { id, onBlur } = this.props;
    onBlur(id, true);
  };

  render() {
    const { id, label, value, error, touched, required, children } = this.props;

    return (
      <FormLabel htmlFor={id}>
        {label}
        {required && (
          <FormInputRequiredIndicator> *</FormInputRequiredIndicator>
        )}
        <div>
          {React.Children.map(children, child => {
            return React.cloneElement(child, {
              field: {
                value: value.includes(child.props.id),
                onChange: this.handleChange,
                onBlur: this.handleBlur,
              },
            });
          })}
          <FormInputValidationMessage>
            {touched && error ? error : ''}
          </FormInputValidationMessage>
        </div>
      </FormLabel>
    );
  }
}

export const RadioButtonGroupItem = ({
  field: { name, value, onChange, onBlur },
  id,
  label,
  className,
  ...props
}) => {
  return (
    <div>
      <input
        name={name}
        id={id}
        type="radio"
        value={id}
        checked={id === value}
        onChange={onChange}
        onBlur={onBlur}
        {...props}
      />
      <Label htmlFor={id}>{label}</Label>
    </div>
  );
};

export const RadioButtonGroup = ({
  id,
  error,
  touched,
  label,
  required,
  children,
}) => {
  return (
    <FormLabel htmlFor={id}>
      {label}
      {required && <FormInputRequiredIndicator> *</FormInputRequiredIndicator>}
      <div>
        {children}
        <FormInputValidationMessage>
          {touched && error ? error : ''}
        </FormInputValidationMessage>
      </div>
    </FormLabel>
  );
};
