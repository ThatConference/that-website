import React from 'react';
import styled from 'styled-components';
import ContentSection from '../shared/ContentSection';

const StayInTouch = ({ className }) => {
  return (
    <ContentSection className={className}>
      <p>this is root stay in touch section</p>
    </ContentSection>
  );
};

export default styled(StayInTouch)``;
