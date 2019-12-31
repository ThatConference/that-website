import React from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';

import ContentSection from '../../components/shared/ContentSection';

import Header from '../../components/Member/Profile/Header';
import ContactInfo from '../../components/Member/Profile/ContactInfo';

const editProfile = ({ featureKeyword }) => {
  return (
    <div>
      <Head>
        <title key="title">
          Member Profile: Contact Info - THAT Conference
        </title>
      </Head>
      <ContentSection forForm>
        <Header title="Contact Info" currentStep="0" />
        <ContactInfo featureKeyword={featureKeyword} />
      </ContentSection>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(editProfile);
