import React from 'react';
import styled from 'styled-components';
import ContentSection from '../shared/ContentSection';
import Icon from '../shared/Icon';
import { below } from '../../utilities';

const TreeBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TreeIcon = styled(Icon)`
  fill: ${({ theme }) => theme.colors.white};
  margin: 5rem 0;

  ${below.med`
    width: 20rem;
  `};
`;

const PageFooter = ({ className }) => {
  return (
    <ContentSection
      className={className}
      backgroundColor="thatBlue"
      backgroundOpacity={0.82}
      backgroundImage="/images/group.jpg"
    >
      <TreeBlock>
        <TreeIcon icon="thatWordTrees" height="200" />
      </TreeBlock>
    </ContentSection>
  );
};

export default styled(PageFooter)``;
