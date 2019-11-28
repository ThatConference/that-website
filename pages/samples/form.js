import React from 'react';
import styled from 'styled-components';
import { Cell } from 'styled-css-grid';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import ContentSection from '../../components/shared/ContentSection';
import {
  FormGrid,
  FormLabel,
  FormInput,
  FormRule,
  FormSubmit,
  FormInputValidationMessage,
} from '../../components/shared/FormLayout';

const Main = styled.div``;

const Heading = styled.h2`
  margin-bottom: 1rem;
`;

const form = props => {
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const formik = useFormik({
    initialValues: {
      fullName: '',
      emailAddress: '',
      mobilePhone: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(3, 'Must be at least 3 characters')
        .required('Required'),
      emailAddress: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      mobilePhone: Yup.string().matches(
        phoneRegExp,
        'Phone number is not valid',
      ),
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Main>
      <ContentSection forForm>
        <Heading>Sample Form</Heading>
        <span className="large-body-copy">
          Bacon ipsum dolor amet swine doner frankfurter pork pancetta ball tip
        </span>
      </ContentSection>
      <ContentSection forForm>
        <form onSubmit={formik.handleSubmit}>
          <FormGrid columns={2}>
            <Cell>
              <FormLabel htmlFor="fullName">
                Full Name
                <FormInput
                  name="fullName"
                  {...formik.getFieldProps('fullName')}
                />
                {formik.touched.fullName && formik.errors.fullName ? (
                  <FormInputValidationMessage>
                    {formik.errors.fullName}
                  </FormInputValidationMessage>
                ) : null}
              </FormLabel>
            </Cell>

            <Cell />
            <Cell>
              <FormLabel htmlFor="emailAddress">
                Email Address
                <FormInput
                  name="emailAddress"
                  {...formik.getFieldProps('emailAddress')}
                />
                {formik.touched.emailAddress && formik.errors.emailAddress ? (
                  <FormInputValidationMessage>
                    {formik.errors.emailAddress}
                  </FormInputValidationMessage>
                ) : null}
              </FormLabel>
            </Cell>
            <Cell>
              <FormLabel htmlFor="mobilePhone">
                Mobile Phone
                <FormInput
                  id="mobilePhone"
                  {...formik.getFieldProps('mobilePhone')}
                />
                {formik.touched.mobilePhone && formik.errors.mobilePhone ? (
                  <FormInputValidationMessage>
                    {formik.errors.mobilePhone}
                  </FormInputValidationMessage>
                ) : null}
              </FormLabel>
            </Cell>
          </FormGrid>
          <FormRule />
          <FormSubmit
            color="dark"
            backgroundColor="white"
            borderColor="gray"
            label="Submit"
            width="22.5rem"
            height="6.32rem"
            isSubmit
          />
        </form>
      </ContentSection>
    </Main>
  );
};

export default form;
