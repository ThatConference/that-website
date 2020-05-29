import React from 'react';
import styled from 'styled-components';
import ContentSection from '../shared/ContentSection';

import ContainerWithBGImageAndLG from './ContainerWithBGImageAndLG';

const Container = styled(ContainerWithBGImageAndLG)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled(ContentSection)`
  background-color: transparent;
  text-align: center;
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
      <Content>
        <Trees src="./images/that_trees_white.png" alt="THAT Conference" />
      </Content>
    </Container>
  );
};

export default styled(PageFooter)``;
