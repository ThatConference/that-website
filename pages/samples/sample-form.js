import React from 'react';
import { NextSeo } from 'next-seo';
import ContentSection from '../../components/shared/ContentSection';
import { FormTitle } from '../../components/shared/FormLayout';
import Form from '../../components/Samples/Form';

const SampleForm = () => {
  return (
    <div>
      <NextSeo
        title="Sample Form - THAT Conference"
        description="Sample form and elements for THAT website style guide"
        noindex
      />

      <ContentSection forForm>
        <FormTitle>Sample Form</FormTitle>
        <Form />
      </ContentSection>
    </div>
  );
};

export default SampleForm;
