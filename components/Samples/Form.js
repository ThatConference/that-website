import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import ButterToast, { Cinnamon, POS_TOP, POS_RIGHT } from 'butter-toast';

import { RegularExpressions } from '../../utilities';

import FormInput from '../shared/FormInput';
import {
  CheckboxGroupItem,
  CheckboxGroup,
  RadioButtonGroupItem,
  RadioButtonGroup,
} from '../shared/CheckboxAndRadioButtonInput';
import { FormRow, FormRule, FormSubmit } from '../shared/FormLayout';

const yearOptions = [
  { value: '1960', label: '1960' },
  { value: '1961', label: '1961' },
  { value: '1962', label: '1962' },
  { value: '1963', label: '1963' },
  { value: '1964', label: '1964' },
  { value: '1965', label: '1965' },
];

const SampleForm = () => {
  return (
    <Formik
      initialValues={{
        fullName: 'test',
        emailAddress: 'test@test.com',
        mobilePhone: '',
        year: '',
        years: [],
        interests: '',
        bio: '',
        agreeToCodeOfConduct: true,
        agreeToCommitments: true,
        agreeToBeingRecorded: false,
        checkboxGroup: [],
        radioGroup: '',
        supportingLinks: [],
        takeaways: [],
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
        year: Yup.string(),
        years: Yup.array(),
        interests: Yup.string().max(20, 'Must be less than 21 characters'),
        bio: Yup.string(),
        supportingLinks: Yup.array(),
        takeaways: Yup.array(),
        agreeToCodeOfConduct: Yup.bool().oneOf(
          [true],
          'Must agree to the Code of Conduct',
        ),
        agreeToCommitments: Yup.bool().oneOf(
          [true],
          'Must agree to the commitments',
        ),
        agreeToBeingRecorded: Yup.bool(),
        checkboxGroup: Yup.array(),
        radioGroup: Yup.string(),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          // eslint-disable-next-line no-alert
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
          ButterToast.raise({
            sticky: true,
            content: (
              <Cinnamon.Crisp
                scheme={Cinnamon.Crisp.SCHEME_BLUE}
                content={() => <div>You can put basically anything here.</div>}
                title="ButterToast example"
              />
            ),
          });
        }, 400);
      }}
    >
      {({
        setFieldValue,
        setFieldTouched,
        getFieldProps,
        setFieldError,
        values,
        errors,
        touched,
      }) => {
        return (
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
            </FormRow>
            <FormRow>
              <FormInput
                fieldName="mobilePhone"
                getFieldProps={getFieldProps}
                errors={errors}
                touched={touched}
                label="Mobile Phone"
              />
            </FormRow>
            <FormRow>
              <FormInput
                fieldName="year"
                label="Year"
                selectOptions={yearOptions}
                inputType="select"
                setFieldValue={setFieldValue}
                values={values}
                touched={touched}
                errors={errors}
              />
            </FormRow>
            <FormRow>
              <FormInput
                fieldName="years"
                label="Years"
                selectOptions={yearOptions}
                inputType="select"
                isMulti
                setFieldValue={setFieldValue}
                values={values}
                touched={touched}
                errors={errors}
              />
            </FormRow>
            <FormRow>
              <FormInput
                inputType="textarea"
                fieldName="interests"
                getFieldProps={getFieldProps}
                errors={errors}
                touched={touched}
                label="Interests"
                helpText="Maximum of 12 interests.  Type a comma between each interest."
              />
            </FormRow>
            <FormRow>
              <FormInput
                inputType="markdown"
                fieldName="bio"
                fieldHasValidation
                getFieldProps={getFieldProps}
                setFieldTouched={setFieldTouched}
                setFieldValue={setFieldValue}
                values={values}
                errors={errors}
                touched={touched}
                label="Bio"
              />
            </FormRow>
            <FormRow>
              <FormInput
                inputType="links"
                fieldName="supportingLinks"
                getFieldProps={getFieldProps}
                setFieldTouched={setFieldTouched}
                setFieldValue={setFieldValue}
                setFieldError={setFieldError}
                errors={errors}
                touched={touched}
                label="Supporting Links/Related Resources"
                values={values}
              />
            </FormRow>
            <FormRow>
              <FormInput
                inputType="strings"
                fieldName="takeaways"
                getFieldProps={getFieldProps}
                setFieldTouched={setFieldTouched}
                setFieldValue={setFieldValue}
                setFieldError={setFieldError}
                errors={errors}
                touched={touched}
                label="Key takeaways"
                values={values}
              />
            </FormRow>
            <FormRow>
              <div>
                <FormInput
                  fieldName="agreeToCodeOfConduct"
                  getFieldProps={getFieldProps}
                  errors={errors}
                  touched={touched}
                  label="Agree to <a href=''>Code of Conduct</a>"
                  values={values}
                  inputType="checkbox"
                />
              </div>
              <div>
                <FormInput
                  fieldName="agreeToCommitments"
                  getFieldProps={getFieldProps}
                  errors={errors}
                  touched={touched}
                  label="Agree to commitments to THAT Conference laid out above"
                  values={values}
                  inputType="checkbox"
                />
              </div>
              <div>
                <FormInput
                  fieldName="agreeToBeingRecorded"
                  getFieldProps={getFieldProps}
                  errors={errors}
                  touched={touched}
                  label="Agree to being recorded"
                  values={values}
                  inputType="checkbox"
                />
              </div>
            </FormRow>
            <FormRow>
              <CheckboxGroup
                id="checkboxGroup"
                label="Which of these?"
                value={values.checkboxGroup}
                error={errors.checkboxGroup}
                touched={touched.checkboxGroup}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
              >
                <Field
                  component={CheckboxGroupItem}
                  name="checkboxGroup"
                  id="checkbox1"
                  label="Option 1"
                />
                <Field
                  component={CheckboxGroupItem}
                  name="checkboxGroup"
                  id="checkbox2"
                  label="Option 2"
                />
                <Field
                  component={CheckboxGroupItem}
                  name="checkboxGroup"
                  id="checkbox3"
                  label="Option 3"
                />
              </CheckboxGroup>
            </FormRow>
            <FormRow>
              <RadioButtonGroup
                id="radioGroup"
                label="One of these please"
                value={values.radioGroup}
                error={errors.radioGroup}
                touched={touched.radioGroup}
              >
                <Field
                  component={RadioButtonGroupItem}
                  name="radioGroup"
                  id="radioOption1"
                  label="Choose this option"
                />
                <Field
                  component={RadioButtonGroupItem}
                  name="radioGroup"
                  id="radioOption2"
                  label="Or choose this one"
                />
              </RadioButtonGroup>
            </FormRow>
            <FormRule />
            <FormSubmit />
            <ButterToast
              className="that-toast"
              position={{
                vertical: POS_TOP,
                horizontal: POS_RIGHT,
              }}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default SampleForm;
