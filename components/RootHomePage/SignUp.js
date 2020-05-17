import React from 'react';
import styled from 'styled-components';
import ContentSection from '../shared/ContentSection';

const SignUp = ({ className }) => {
  return (
    <ContentSection className={className}>
      <p>this is root sign up section</p>
    </ContentSection>
  );
};

export default styled(SignUp)``;
