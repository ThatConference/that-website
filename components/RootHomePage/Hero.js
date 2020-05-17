import React from 'react';
import styled from 'styled-components';
import ContentSection from '../shared/ContentSection';

const Hero = ({ className }) => {
  return (
    <ContentSection className={className}>
      <p>this is root hero</p>
    </ContentSection>
  );
};

export default styled(Hero)``;
