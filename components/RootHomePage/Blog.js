import React from 'react';
import styled from 'styled-components';
import ContentSection from '../shared/ContentSection';

const Blog = ({ className }) => {
  return (
    <ContentSection className={className}>
      <p>this is root blog section</p>
    </ContentSection>
  );
};

export default styled(Blog)``;
