import React from 'react';
import styled from 'styled-components';
import { Cell } from 'styled-css-grid';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import RegularExpressions from '../../utilities/validations';

import FormInput from '../shared/FormInput';
import { FormGrid, FormRule, FormSubmit } from '../shared/FormLayout';

const Form = props => {
  const formik = useFormik({
    initialValues: {
      fullName: '',
      emailAddress: '',
      mobilePhone: '',
      agreeToCodeOfConduct: false,
      agreeToCommitments: false,
      agreeToBeingRecorded: false,
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
      </FormGrid>
      <FormRule />
      <FormSubmit
        color="dark"
        backgroundColor="white"
        borderColor="gray"
        label="Preview your Profile"
        width="22.5rem"
        height="6.32rem"
        isSubmit
      />
    </form>
  );
};

export default Form;
