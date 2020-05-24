import React from 'react';
import styled from 'styled-components';
import ContentSection from '../shared/ContentSection';

const Container = styled.div`
  background-color: red;
`;

const Blog = ({ className }) => {
  return (
    <Container className={className}>
      <p>this is root blog section</p>
    </Container>
  );
};

export default styled(Blog)``;
