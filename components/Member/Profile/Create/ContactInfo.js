import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import RegularExpressions from '../../../../utilities/validation';

import FormInput from '../../../shared/FormInput';
import {
  FormRow,
  FormRule,
  FormCancel,
  FormSubmit,
} from '../../../shared/FormLayout';

const ContactInfoForm = ({ featureKeyword }) => {
  return (
    <Formik
      initialValues={{
        fullName: '',
        emailAddress: '',
        mobilePhone: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        company: '',
        title: '',
        image: null,
      }}
      validationSchema={Yup.object({
        fullName: Yup.string()
          .min(3, 'Must be at least 3 characters')
          .required('Required'),
        emailAddress: Yup.string()
          .email('Invalid email address')
          .required('Required'),
        mobilePhone: Yup.string().matches(
          RegularExpressions.phoneRegExp,
          'Phone number is not valid',
        ),
        showEmailAddressOnProfile: Yup.bool(),
        showMobilePhoneOnProfile: Yup.bool(),
        city: Yup.string(),
        state: Yup.string(),
        country: Yup.string(),
        company: Yup.string(),
        title: Yup.string(),
        image: Yup.mixed()
          .test(
            'fileSize',
            'File Size is too large',
            value => !value || value.size <= 300000,
          )
          .test(
            'fileType',
            'Unsupported File Format',
            value =>
              !value ||
              ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'].includes(
                value.type,
              ),
          ),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          // eslint-disable-next-line no-alert
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
          window.location = `create/online-presence?feature=${featureKeyword}`;
        }, 400);
      }}
    >
      {({ getFieldProps, errors, touched }) => (
        <Form className="input-form">
          <FormRow>
            <FormInput
              fieldName="fullName"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
              label="Full Name"
            />
          </FormRow>
          <FormRow>
            <FormInput
              fieldName="emailAddress"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
              label="Email Address"
            />
            <FormInput
              fieldName="showEmailAddressOnProfile"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
              label="Show on my profile"
              inputType="checkbox"
            />
          </FormRow>
          <FormRow>
            <FormInput
              fieldName="mobilePhone"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
              label="Mobile Phone"
            />
            <FormInput
              fieldName="showMobilePhoneOnProfile"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
              label="Show on my profile"
              inputType="checkbox"
            />
          </FormRow>
          <FormRow>
            <FormInput
              fieldName="city"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
              label="City"
            />
          </FormRow>
          <FormRow>
            <FormInput
              fieldName="state"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
              label="State"
            />
          </FormRow>
          <FormRow>
            <FormInput
              fieldName="country"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
              label="Country"
            />
          </FormRow>
          <FormRow>
            <FormInput
              fieldName="company"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
              label="Company"
            />
          </FormRow>
          <FormRow>
            <FormInput
              fieldName="title"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
              label="Title"
            />
          </FormRow>
          <FormRow>
            <FormInput
              fieldName="image"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
              inputType="imageupload"
              label="Photo"
            />
          </FormRow>
          <FormRule />
          <FormCancel />
          <FormSubmit label="Continue" />
        </Form>
      )}
    </Formik>
  );
};

export default ContactInfoForm;
