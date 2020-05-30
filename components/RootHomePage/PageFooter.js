import React from 'react';
import styled from 'styled-components';
import ContentSection from '../shared/ContentSection';
import { below } from '../../utilities';

const Container = styled(ContentSection)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Trees = styled.img`
  width: 31.1rem;

  ${below.small`
    width: 20rem;
  `};
`;

const PageFooter = ({ className }) => {
  return (
    <Container
      className={className}
      backgroundColor="thatBlue"
      backgroundOpacity={0.82}
      backgroundImage="/images/root_join_conversation.jpg"
    >
      <Trees src="./images/that_trees_white.png" alt="THAT Conference" />
    </Container>
  );
};

export default styled(PageFooter)``;
