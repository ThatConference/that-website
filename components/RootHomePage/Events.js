import React from 'react';
import styled from 'styled-components';
import ContentSection from '../shared/ContentSection';

const Events = ({ className }) => {
  return (
    <ContentSection className={className}>
      <p>this is root events section</p>
    </ContentSection>
  );
};

export default styled(Events)``;
