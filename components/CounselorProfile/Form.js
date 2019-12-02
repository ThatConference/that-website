import React from 'react';
import styled from 'styled-components';
import { Cell } from 'styled-css-grid';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import RegularExpressions from '../../utilities/validation';

import FormInput from '../shared/FormInput';
import { FormGrid, FormRule, FormSubmit } from '../shared/FormLayout';

const Form = props => {
  const formik = useFormik({
    initialValues: {
      fullName: '',
      emailAddress: '',
      mobilePhone: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      company: '',
      title: '',
      website: '',
      github: '',
      twitter: '',
      facebook: '',
      instagram: '',
      linkedIn: '',
      slack: '',
      bio: '',
      shortLifeHack: '',
      interests: '',
    },
    validationSchema: Yup.object({
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
      website: Yup.string().url('Invalid URL'),
      twitter: Yup.string(),
      facebook: Yup.string().url('Invalid URL'),
      github: Yup.string().url('Invalid URL'),
      instagram: Yup.string(),
      linkedIn: Yup.string().url('Invalid URL'),
      slack: Yup.string(),
      showSlackOnProfile: Yup.bool(),
      bio: Yup.string().required('Required'),
      shortLifeHack: Yup.string(),
      interests: Yup.string(),
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <FormGrid columns={2}>
        <Cell>
          <FormInput
            fieldName="fullName"
            formikForm={formik}
            label="Full Name"
          />
        </Cell>
        <Cell />
        <Cell>
          <FormInput
            fieldName="emailAddress"
            formikForm={formik}
            label="Email Address"
          />
          <FormInput
            fieldName="showEmailAddressOnProfile"
            formikForm={formik}
            label="Show on my profile"
            inputType="checkbox"
          />
        </Cell>
        <Cell>
          <FormInput
            fieldName="mobilePhone"
            formikForm={formik}
            label="Mobile Phone"
          />
          <FormInput
            fieldName="showMobilePhoneOnProfile"
            formikForm={formik}
            label="Show on my profile"
            inputType="checkbox"
          />
        </Cell>
        <Cell>
          <FormInput fieldName="city" formikForm={formik} label="City" />
        </Cell>
        <Cell>
          <FormGrid columns={2}>
            <Cell>
              <FormInput fieldName="state" formikForm={formik} label="State" />
            </Cell>
            <Cell>
              <FormInput
                fieldName="country"
                formikForm={formik}
                label="Country"
              />
            </Cell>
          </FormGrid>
        </Cell>
        <Cell>
          <FormInput fieldName="company" formikForm={formik} label="Company" />
        </Cell>
        <Cell>
          <FormInput fieldName="title" formikForm={formik} label="Title" />
        </Cell>
        <Cell>
          <FormInput fieldName="website" formikForm={formik} label="Website" />
        </Cell>
        <Cell>
          <FormInput
            fieldName="twitter"
            formikForm={formik}
            label="Twitter username"
          />
        </Cell>
        <Cell>
          <FormInput
            fieldName="github"
            formikForm={formik}
            label="GitHub URL"
          />
        </Cell>
        <Cell>
          <FormInput
            fieldName="facebook"
            formikForm={formik}
            label="Facebook URL"
          />
        </Cell>
        <Cell>
          <FormInput
            fieldName="instagram"
            formikForm={formik}
            label="Instagram Handle"
          />
        </Cell>
        <Cell>
          <FormInput
            fieldName="linkedIn"
            formikForm={formik}
            label="LinkedIn"
          />
        </Cell>
        <Cell>
          <FormInput
            fieldName="slack"
            formikForm={formik}
            label="Slack Member ID"
          />
          <FormInput
            fieldName="showSlackOnProfile"
            formikForm={formik}
            label="Show on my profile"
            inputType="checkbox"
          />
        </Cell>
      </FormGrid>
      <FormRule />
      <FormSubmit />
    </form>
  );
};

export default Form;
