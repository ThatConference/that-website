import React from 'react';
import Router from 'next/router';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { connect } from 'react-redux';

import { sessionConstants } from '../../../utilities';
import FormInput from '../../shared/FormInput';
import {
  FormRow,
  FormRule,
  FormCancel,
  FormSubmit,
} from '../../shared/FormLayout';
import {
  RadioButtonGroupItem,
  RadioButtonGroup,
} from '../../shared/CheckboxAndRadioButtonInput';

const categories = sessionConstants.SessionCategories;

const audiences = sessionConstants.SessionAudiences;

const GET_MY_SESSION = gql`
  query getSessionById($sessionId: ID!) {
    sessions {
      me {
        session(id: $sessionId) {
          id
          type
          category
          status
          title
          shortDescription
          longDescription
          primaryCategory
          secondaryCategory
          targetAudience
          supportingArtifacts {
            name
            url
          }
          prerequisites
          agenda
          takeaways
          canRecord
          mentorship
          whyAreYou
          otherComments
          status
        }
      }
    }
  }
`;

const UPDATE_SESSION = gql`
  mutation updateSession($sessionId: ID!, $session: SessionUpdateInput!) {
    sessions {
      session(id: $sessionId) {
        update(session: $session) {
          id
          type
          category
          status
          title
          shortDescription
          longDescription
          primaryCategory
          secondaryCategory
          targetAudience
          supportingArtifacts {
            name
            url
          }
        }
      }
    }
  }
`;

const DetailForm = ({ dispatch, session: reduxSession }) => {
  const [updateSession] = useMutation(UPDATE_SESSION);

  const { loading, error: sessionError, data } = useQuery(GET_MY_SESSION, {
    variables: {
      sessionId: reduxSession.id,
    },
  });

  if (loading) return null;
  if (sessionError) return null;

  const { session } = data.sessions.me;

  return (
    <Formik
      initialValues={{
        title: session.title || '',
        audience: session.category
          ? sessionConstants.SessionFors.find(
              sf => sf.value === session.category,
            ).value
          : 'PROFESSIONAL',
        sessionType: session.type
          ? sessionConstants.SessionTypes.find(st => st.value === session.type)
              .value
          : 'REGULAR',
        shortDescription: session.shortDescription || '',
        longDescription: session.longDescription || '',
        primaryCategory: session.primaryCategory
          ? categories.find(c => c.value === session.primaryCategory)
          : '',
        secondaryCategories: session.secondaryCategory
          ? categories.filter(
              c => session.secondaryCategory.indexOf(c.value) !== -1,
            )
          : [],
        targetAudiences: session.targetAudience
          ? audiences.filter(
              a => session.targetAudience.indexOf(a.value) !== -1,
            )
          : [],
        supportingArtifacts: session.supportingArtifacts
          ? session.supportingArtifacts.map(m => {
              return { name: m.name, url: m.url };
            })
          : [],
        prerequisites: session.prerequisites || '',
        agenda: session.agenda || '',
        takeaways: session.takeaways
          ? session.takeaways.map(t => {
              return { text: t };
            })
          : [],
        agreeToBeingRecorded: session.canRecord || false,
        mentorshipLevel: session.mentorship || '',
        whyAreYouBestPerson: session.whyAreYou || '',
        whatElseShouldWeKnow: session.otherComments || '',
      }}
      validationSchema={Yup.object({
        title: Yup.string()
          .min(3, 'Must be at least 3 characters')
          .required('Required'),
        audience: Yup.string().required('Selection required'),
        sessionType: Yup.string().required('Selection required'),
        shortDescription: Yup.string()
          .min(3, 'Must be at least 3 characters')
          .max(100, 'Must be 100 characters or less')
          .required('Required'),
        longDescription: Yup.string()
          .min(3, 'Must be at least 3 characters')
          .required('Required'),
        primaryCategory: Yup.string().required('Required'),
        secondaryCategories: Yup.array(),
        targetAudiences: Yup.array().required('At least one is required'),
        supportingArtifacts: Yup.array(),
        prerequisites: Yup.string(),
        agenda: Yup.string(),
        takeaways: Yup.array().required('At least one is required'),
        agreeToBeingRecorded: Yup.bool(),
        mentorshipLevel: Yup.string().required('Required'),
        whyAreYouBestPerson: Yup.string(),
        whatElseShouldWeKnow: Yup.string(),
      })}
      onSubmit={values => {
        const updates = {
          type: values.sessionType,
          category: values.audience,
          title: values.title,
          shortDescription: values.shortDescription,
          longDescription: values.longDescription,
          primaryCategory: values.primaryCategory.value,
          secondaryCategory: values.secondaryCategories
            ? values.secondaryCategories.map(sc => sc.value)
            : null,
          targetAudience: values.targetAudiences
            ? values.targetAudiences.map(sc => sc.value)
            : null,
          supportingArtifacts: values.supportingArtifacts,
          prerequisites: values.prerequisites,
          agenda: values.agenda,
          takeaways: values.takeaways
            ? values.takeaways.map(t => t.text)
            : null,
          canRecord: values.agreeToBeingRecorded,
          mentorship: values.mentorshipLevel,
          whyAreYou: values.whyAreYouBestPerson,
          otherComments: values.whatElseShouldWeKnow,
        };
        updateSession({
          variables: { session: updates, sessionId: session.id },
        }).then(
          result => {
            dispatch({
              type: 'SESSION',
              payload: result.data.sessions.session.update,
            });
            Router.push('/wi/session/submit/additional-info');
          },
          error => {
            // ToDo: Appropriately log and handle error
            // eslint-disable-next-line no-console
            console.log(`Error: ${error}`);
          },
        );
      }}
    >
      {({
        getFieldProps,
        errors,
        touched,
        setFieldValue,
        setFieldTouched,
        setFieldError,
        values,
        isSubmitting,
      }) => (
        <Form className="input-form">
          <FormRow>
            <RadioButtonGroup
              id="audience"
              label="Who is your session for?"
              value={values.audience}
              error={errors.audience}
              touched={touched.audience}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
            >
              {sessionConstants.SessionFors.map(sf => {
                return (
                  <Field
                    component={RadioButtonGroupItem}
                    name="audience"
                    id={sf.value}
                    label={sf.label}
                  />
                );
              })}
            </RadioButtonGroup>
          </FormRow>
          <FormRow>
            <RadioButtonGroup
              id="sessionType"
              label="What type of session are you proposing?"
              value={values.sessionType}
              error={errors.sessionType}
              touched={touched.sessionType}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
            >
              {sessionConstants.SessionTypes.map(st => {
                return (
                  <Field
                    component={RadioButtonGroupItem}
                    name="sessionType"
                    id={st.value}
                    label={st.label}
                  />
                );
              })}
            </RadioButtonGroup>
          </FormRow>
          <FormRow>
            <FormInput
              fieldName="title"
              label="Title"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
            />
          </FormRow>
          <FormRow>
            <FormInput
              fieldName="shortDescription"
              label="Short Description"
              helpText="Maximum 100 characters"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
            />
          </FormRow>
          <FormRow>
            <FormInput
              fieldName="longDescription"
              fieldHasValidation
              label="Full Description"
              inputType="markdown"
              getFieldProps={getFieldProps}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              errors={errors}
              touched={touched}
              values={values}
            />
          </FormRow>
          <FormRow>
            <FormInput
              fieldName="primaryCategory"
              label="Primary Category"
              selectOptions={categories}
              inputType="select"
              setFieldValue={setFieldValue}
              values={values}
              touched={touched}
              errors={errors}
              helpText="You might not find a perfect fit, just choose the one that applies the most"
            />
          </FormRow>
          <FormRow>
            <FormInput
              fieldName="secondaryCategories"
              label="Secondary Categories"
              selectOptions={categories}
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
              fieldName="targetAudiences"
              label="Target Audiences"
              selectOptions={audiences}
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
              inputType="links"
              fieldName="supportingArtifacts"
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
              fieldName="prerequisites"
              fieldHasValidation={false}
              label="Prerequisites or Previous Experience"
              inputType="markdown"
              getFieldProps={getFieldProps}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              errors={errors}
              touched={touched}
              values={values}
            />
          </FormRow>
          <FormRow>
            <FormInput
              fieldName="agenda"
              fieldHasValidation={false}
              label="Agenda"
              inputType="markdown"
              getFieldProps={getFieldProps}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              errors={errors}
              touched={touched}
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
              label="Key Takeaways"
              values={values}
            />
          </FormRow>
          <FormRow>
            <FormInput
              fieldName="agreeToBeingRecorded"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
              values={values}
              label="Agree to have this session recorded if accepted?"
              inputType="checkbox"
            />
          </FormRow>
          <FormRow>
            <RadioButtonGroup
              id="mentorshipLevel"
              label="If this session is selected, how much mentorship/collaboration with our team would you like?"
              value={values.mentorshipLevel}
              error={errors.mentorshipLevel}
              touched={touched.mentorshipLevel}
            >
              {sessionConstants.SessionMentorshipLevels.map(m => {
                return (
                  <Field
                    component={RadioButtonGroupItem}
                    name="mentorshipLevel"
                    id={m.value}
                    label={m.label}
                  />
                );
              })}
            </RadioButtonGroup>
          </FormRow>
          <FormRow>
            <FormInput
              inputType="textarea"
              fieldName="whyAreYouBestPerson"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
              label="Why are you the best person to give this talk?"
              helpText="Are you an authority? Super passionate about it? Brag on yourself a bit.  We want you to."
            />
          </FormRow>
          <FormRow>
            <FormInput
              inputType="textarea"
              fieldName="whatElseShouldWeKnow"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
              label="What else should we know about your session or how to help you be successful"
            />
          </FormRow>
          <FormRule />
          <FormCancel label="Back" />
          <FormSubmit label="Continue" disabled={isSubmitting} />
        </Form>
      )}
    </Formik>
  );
};

const mapStateToProps = state => {
  return {
    session: state.session,
  };
};

export default connect(mapStateToProps)(DetailForm);
