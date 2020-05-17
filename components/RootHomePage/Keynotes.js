import React from 'react';
import styled from 'styled-components';
import ContentSection from '../shared/ContentSection';

const Keynotes = ({ className }) => {
  return (
    <ContentSection className={className}>
      <p>this is root keynote section</p>
    </ContentSection>
  );
};

export default styled(Keynotes)``;
