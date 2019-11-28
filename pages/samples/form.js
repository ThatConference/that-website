import React from 'react';
import styled from 'styled-components';
import { Cell } from 'styled-css-grid';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import ContentSection from '../../components/shared/ContentSection';
import {
  FormGrid,
  FormLabel,
  FormTextInput,
  FormCheckbox,
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
        phoneRegExp,
        'Phone number is not valid',
      ),
      agreeToCodeOfConduct: Yup.bool().oneOf(
        [true],
        'Must agree to the Code of Conduct',
      ),
      agreeToCommitments: Yup.bool().oneOf(
        [true],
        'Must agree to the commitments',
      ),
      agreeToBeingRecorded: Yup.bool(),
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
                <FormTextInput
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
                <FormTextInput
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
                <FormTextInput
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
            <Cell>
              <div>
                <FormLabel htmlFor="agreeToCodeOfConduct">
                  <FormCheckbox
                    name="agreeToCodeOfConduct"
                    id="agreeToCodeOfConduct"
                    type="checkbox"
                    {...formik.getFieldProps('agreeToCodeOfConduct')}
                  />
                  Agree to Code of Conduct
                  {formik.touched.agreeToCodeOfConduct &&
                  formik.errors.agreeToCodeOfConduct ? (
                    <FormInputValidationMessage>
                      {formik.errors.agreeToCodeOfConduct}
                    </FormInputValidationMessage>
                  ) : null}
                </FormLabel>
              </div>
              <div>
                <FormLabel htmlFor="agreeToCommitments">
                  <FormCheckbox
                    name="agreeToCommitments"
                    id="agreeToCommitments"
                    type="checkbox"
                    {...formik.getFieldProps('agreeToCommitments')}
                  />
                  Agree to commitments to THAT Conference laid out above
                  {formik.touched.agreeToCommitments &&
                  formik.errors.agreeToCommitments ? (
                    <FormInputValidationMessage>
                      {formik.errors.agreeToCommitments}
                    </FormInputValidationMessage>
                  ) : null}
                </FormLabel>
              </div>
              <div>
                <FormLabel htmlFor="agreeToBeingRecorded">
                  <FormCheckbox
                    name="agreeToBeingRecorded"
                    id="agreeToBeingRecorded"
                    type="checkbox"
                    {...formik.getFieldProps('agreeToBeingRecorded')}
                  />
                  Agree to being recorded
                  {formik.touched.agreeToBeingRecorded &&
                  formik.errors.agreeToBeingRecorded ? (
                    <FormInputValidationMessage>
                      {formik.errors.agreeToBeingRecorded}
                    </FormInputValidationMessage>
                  ) : null}
                </FormLabel>
              </div>
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
