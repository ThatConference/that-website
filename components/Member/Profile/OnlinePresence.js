import React from 'react';
import * as Yup from 'yup';
import FormInput from '../../shared/FormInput';
import {
  FormRow,
  FormRule,
  FormCancel,
  FormSubmit,
} from '../../shared/FormLayout';

const OnlinePresenceForm = ({
  getFieldProps,
  errors,
  touched,
  formCancel,
  formSubmit,
  showButtons,
}) => {
  return (
    <>
      <FormRow>
        <FormInput
          fieldName="website"
          getFieldProps={getFieldProps}
          errors={errors}
          touched={touched}
          label="Website"
          validate={Yup.string().url('Invalid URL')}
        />
      </FormRow>
      <FormRow>
        <FormInput
          fieldName="twitter"
          getFieldProps={getFieldProps}
          errors={errors}
          touched={touched}
          label="Twitter URL"
          validate={Yup.string().url('Invalid URL')}
        />
      </FormRow>
      <FormRow>
        <FormInput
          fieldName="github"
          getFieldProps={getFieldProps}
          errors={errors}
          touched={touched}
          label="GitHub URL"
          validate={Yup.string().url('Invalid URL')}
        />
      </FormRow>
      <FormRow>
        <FormInput
          fieldName="facebook"
          getFieldProps={getFieldProps}
          errors={errors}
          touched={touched}
          label="Facebook URL"
          validate={Yup.string().url('Invalid URL')}
        />
      </FormRow>
      <FormRow>
        <FormInput
          fieldName="instagram"
          getFieldProps={getFieldProps}
          errors={errors}
          touched={touched}
          label="Instagram URL"
          validate={Yup.string().url('Invalid URL')}
        />
      </FormRow>
      <FormRow>
        <FormInput
          fieldName="linkedin"
          getFieldProps={getFieldProps}
          errors={errors}
          touched={touched}
          label="LinkedIn URL"
          validate={Yup.string().url('Invalid URL')}
        />
      </FormRow>
      <FormRow>
        <FormInput
          fieldName="slack"
          getFieldProps={getFieldProps}
          errors={errors}
          touched={touched}
          label="Slack Member ID"
          validate={Yup.string().url('Invalid URL')}
        />
      </FormRow>
      <FormRule />
      {showButtons && (
        <>
          <FormCancel label="Back" onClick={formCancel} />
          <FormSubmit label="Continue" onClick={formSubmit} />
        </>
      )}
    </>
  );
};

export default OnlinePresenceForm;
