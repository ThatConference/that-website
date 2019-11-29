import React from 'react';
import styled from 'styled-components';
import { Cell } from 'styled-css-grid';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import ContentSection from '../../components/shared/ContentSection';
import FormInput from '../../components/shared/FormInput';
import {
  FormGrid,
  FormRule,
  FormSubmit,
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
            </Cell>
            <Cell>
              <FormInput
                fieldName="mobilePhone"
                formikForm={formik}
                label="Mobile Phone"
              />
            </Cell>
            <Cell>
              <div>
                <FormInput
                  fieldName="agreeToCodeOfConduct"
                  formikForm={formik}
                  label="Agree to Code of Conduct"
                  inputType="checkbox"
                />
              </div>
              <div>
                <FormInput
                  fieldName="agreeToCommitments"
                  formikForm={formik}
                  label="Agree to commitments to THAT Conference laid out above"
                  inputType="checkbox"
                />
              </div>
              <div>
                <FormInput
                  fieldName="agreeToBeingRecorded"
                  formikForm={formik}
                  label="Agree to being recorded"
                  inputType="checkbox"
                />
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
