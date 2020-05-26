import React from 'react';
import styled from 'styled-components';

import ContainerWithBGImageAndLG from './ContainerWithBGImageAndLG';

const Container = styled(ContainerWithBGImageAndLG)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Trees = styled.img`
  width: 31.1rem;
`;

const PageFooter = ({ className }) => {
  return (
    <Container
      height={60}
      className={className}
      image="./images/root_join_conversation.jpg"
    >
      <Trees src="./images/that_trees_white.png" alt="THAT Conference" />
    </Container>
  );
};

export default styled(PageFooter)``;
