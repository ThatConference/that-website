import React from 'react';
import styled from 'styled-components';

import ContentSection from '../shared/ContentSection';
import Icon from '../shared/Icon';
import { below } from '../../utilities';

const twoColBp = 'larger';

const Main = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  ${below[twoColBp]`
    flex-direction: column;
  `};
`;

const StyledHeading = styled.h2`
  font-size: 12rem;
  min-width: 55rem;
  margin: 0;
  color: ${({ theme }) => theme.colors.fonts.light};

  ${below.small`
    font-size: 7rem;
    text-align: center;
    min-width: auto;
  `};

  ${below[twoColBp]`
    order: 2;
  `};
`;

const TreeIcon = styled(Icon)`
  fill: ${({ theme }) => theme.colors.white};

  ${below[twoColBp]`
    margin-bottom: 5rem;
    width: 50rem;
    order: 1;
  `};

  ${below.small`
    width: 30rem;
    margin-bottom: 1rem;
  `};

  ${below.xsmall`
    width: 25rem;
  `};
`;

const SectionHeader = ({ className }) => {
  return (
    <ContentSection
      className={className}
      backgroundColor="thatBlue"
      backgroundOpacity={0.82}
      backgroundImage="/images/group.jpg"
    >
      <Main>
        <StyledHeading>
          Events,
          <br />
          Meet-Ups, &
          <br />
          Gatherings
        </StyledHeading>
        <TreeIcon
          icon="thatTrees"
          width="600"
          height="250"
          viewBoxHeight="87"
          viewBoxWidth="200"
        />
      </Main>
    </ContentSection>
  );
};

export default styled(SectionHeader)``;
