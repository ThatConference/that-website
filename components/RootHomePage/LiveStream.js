import React from 'react';
import styled from 'styled-components';
import ContentSection from '../shared/ContentSection';

const LiveStream = ({ className }) => {
  return (
    <ContentSection className={className}>
      <p>this is root live stream section</p>
    </ContentSection>
  );
};

export default styled(LiveStream)``;
