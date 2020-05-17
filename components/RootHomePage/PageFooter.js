import React from 'react';
import styled from 'styled-components';
import ContentSection from '../shared/ContentSection';

const PageFooter = ({ className }) => {
  return (
    <ContentSection className={className}>
      <p>this is root footer</p>
    </ContentSection>
  );
};

export default styled(PageFooter)``;
