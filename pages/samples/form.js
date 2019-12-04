import React from 'react';
import styled from 'styled-components';
import { Cell } from 'styled-css-grid';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import RegularExpressions from '../../utilities/validation';

import MarkdownEditor from '../../components/shared/MarkdownEditor';
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

const Form = props => {
  const formik = useFormik({
    initialValues: {
      fullName: '',
      emailAddress: '',
      mobilePhone: '',
      interests: '',
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
      interests: Yup.string()
        .required('Required')
        .max(20, 'Must be less than 21 characters'),
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
  console.log(formik);
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
            <Cell width={2}>
              <FormInput
                inputType="textarea"
                fieldName="interests"
                formikForm={formik}
                label="Interests"
                helpText="Maximum of 12 interests.  Type a comma between each interest."
              />
            </Cell>
            <Cell width={2}>
              <MarkdownEditor />
            </Cell>
            <Cell>
              <div>
                <FormInput
                  fieldName="agreeToCodeOfConduct"
                  formikForm={formik}
                  label="Agree to <a href=''>Code of Conduct</a>"
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
          <FormSubmit />
        </form>
      </ContentSection>
    </Main>
  );
};

export default Form;
