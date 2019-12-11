import React from 'react';
import Head from 'next/head';

import ContentSection from '../../components/shared/ContentSection';
import { FormTitle } from '../../components/shared/FormLayout';
import Form from '../../components/Samples/Form';

const SampleForm = () => {
  return (
    <div>
      <Head>
        <title key="title">THAT Conference - Sample Form</title>
      </Head>

      <ContentSection forForm>
        <FormTitle>Sample Form</FormTitle>
        <Form />
      </ContentSection>
    </div>
  );
};

export default SampleForm;
