import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import debug from 'debug';
import Router from 'next/router';

import FormInput from '../../shared/FormInput';
import {
  FormRow,
  FormRule,
  FormCancel,
  FormSubmit,
} from '../../shared/FormLayout';

const dlog = debug('that:member:update:online');

const GET_MEMBER = gql`
  query getMember {
    members {
      me {
        profileLinks {
          isPublic
          linkType
          url
        }
      }
    }
  }
`;

const UPDATE_MEMBER = gql`
  mutation updateMember($profile: ProfileUpdateInput!) {
    members {
      member {
        update(profile: $profile) {
          id
          profileSlug
          firstName
          profileLinks {
            isPublic
            linkType
            url
          }
          createdAt
          lastUpdatedAt
        }
      }
    }
  }
`;

// commented out some links until we get icons
const linkTypes = {
  // devTo: "DEV_TO",
  // dribbble: "DRIBBBLE",
  facebook: 'FACEBOOK',
  github: 'GITHUB',
  instagram: 'INSTAGRAM',
  linkedin: 'LINKEDIN',
  medium: 'MEDIUM',
  // stackOverflow: "STACK_OVERFLOW",
  // tictok: "TICTOK",
  // twitch: "TWITCH",
  twitter: 'TWITTER',
  website: 'WEBSITE',
  youtube: 'YOUTUBE',
};

const OnlinePresenceForm = () => {
  const { loading, error, data } = useQuery(GET_MEMBER);
  const [updateMember] = useMutation(UPDATE_MEMBER, {
    onCompleted: () => {
      Router.push('/member/bio');
    },
    onError: updateError => {
      dlog('Error updating member', updateError);
    },
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const getProfileLinkValue = linkType => {
    return data.members.me.profileLinks.filter(profileLink => {
      return profileLink.linkType === linkType;
    })[0];
  };

  const initialValues = () => {
    return Object.keys(linkTypes).reduce((acc, key) => {
      const value = getProfileLinkValue(linkTypes[key]);
      acc[key] = value ? value.url : '';
      return acc;
    }, {});
  };

  return (
    <Formik
      initialValues={initialValues()}
      validationSchema={Yup.object({
        facebook: Yup.string().url('Invalid URL'),
        github: Yup.string().url('Invalid URL'),
        instagram: Yup.string().url('Invalid URL'),
        linkedin: Yup.string().url('Invalid URL'),
        slack: Yup.string(),
        twitter: Yup.string().url('Invalid URL'),
        website: Yup.string().url('Invalid URL'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          const profileLinks = Object.keys(linkTypes)
            .filter(key => values[key].length > 0)
            .map(key => {
              return {
                isPublic: true,
                linkType: linkTypes[key],
                url: values[key],
              };
            });
          updateMember({ variables: { profile: { profileLinks } } });
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ getFieldProps, errors, touched }) => (
        <Form className="input-form">
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
              fieldName="slack"
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
              label="Slack Member ID"
            />
          </FormRow>
          <FormRule />
          <FormCancel label="Back" />
          <FormSubmit label="Continue" />
        </Form>
      )}
    </Formik>
  );
};

export default OnlinePresenceForm;
