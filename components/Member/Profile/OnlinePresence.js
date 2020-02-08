import React from 'react';
import FormInput from '../../shared/FormInput';
import { FormRow, FormCancel, FormSubmit } from '../../shared/FormLayout';

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
        />
      </FormRow>
      <FormRow>
        <FormInput
          fieldName="twitter"
          getFieldProps={getFieldProps}
          errors={errors}
          touched={touched}
          label="Twitter URL"
        />
      </FormRow>
      <FormRow>
        <FormInput
          fieldName="github"
          getFieldProps={getFieldProps}
          errors={errors}
          touched={touched}
          label="GitHub URL"
        />
      </FormRow>
      <FormRow>
        <FormInput
          fieldName="facebook"
          getFieldProps={getFieldProps}
          errors={errors}
          touched={touched}
          label="Facebook URL"
        />
      </FormRow>
      <FormRow>
        <FormInput
          fieldName="instagram"
          getFieldProps={getFieldProps}
          errors={errors}
          touched={touched}
          label="Instagram URL"
        />
      </FormRow>
      <FormRow>
        <FormInput
          fieldName="linkedin"
          getFieldProps={getFieldProps}
          errors={errors}
          touched={touched}
          label="LinkedIn URL"
        />
      </FormRow>
      <FormRow>
        <FormInput
          fieldName="thatSlackUsername"
          getFieldProps={getFieldProps}
          errors={errors}
          touched={touched}
          label="<a href='https://thatslack.thatconference.com' class='basic-link' target='_blank'>THAT Slack</a> Username"
        />
      </FormRow>
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
