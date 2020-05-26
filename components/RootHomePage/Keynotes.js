import React from 'react';
import styled from 'styled-components';

import ContainerWithBGImageAndLG from './ContainerWithBGImageAndLG';

const Container = styled.div``;
const Content = styled.div`
  padding-top: 10rem;
  text-align: center;
`;

const Keynotes = ({ className }) => {
  return (
    <Container className={className}>
      <ContainerWithBGImageAndLG
        height={5.7}
        image="./images/root_join_conversation.jpg"
      />
      <Content>
        <h1>Past Keynotes</h1>
      </Content>
      >
    </Container>
  );
};

export default styled(Keynotes)``;
