import React from 'react';
import styled from 'styled-components';
import ContentSection from '../shared/ContentSection';

const SectionHeader = ({ className }) => {
  return (
    <ContentSection className={className}>
      <p>this is root section header</p>
    </ContentSection>
  );
};

export default styled(SectionHeader)``;
