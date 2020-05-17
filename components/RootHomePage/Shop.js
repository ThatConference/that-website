import React from 'react';
import styled from 'styled-components';
import ContentSection from '../shared/ContentSection';

const Shop = ({ className }) => {
  return (
    <ContentSection className={className}>
      <p>this is root shop section</p>
    </ContentSection>
  );
};

export default styled(Shop)``;
