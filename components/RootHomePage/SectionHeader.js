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
    font-size: 6rem;
    text-align: center;
  `};
`;

const TreeIcon = styled(Icon)`
  fill: ${({ theme }) => theme.colors.white};

  ${below[twoColBp]`
    margin-top: 5rem;
    width: 60%;
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
