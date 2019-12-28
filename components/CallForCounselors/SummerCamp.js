import React from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';

import ContentSection from '../shared/ContentSection';

import { below } from '../../utilities';

const Main = styled(ContentSection)`
  margin-bottom: 14rem;

  ${below.large`

  `};

  ${below.med`

  `};
`;

const SummerCampHeader = styled.h3`
  font-size: 5.5rem;
  margin-top: 8rem;
  margin-bottom: 2.5rem;
  margin-left: 0;
  font-weight: 100;
  color: ${({ theme }) => theme.colors.fonts.light};
`;

const MainGrid = styled(Grid)``;

const MegaphoneBearCell = styled(Cell)`
  text-align: center;
`;

const MegaphoneBear = styled.img`
  transform: scaleX(-1);
  max-height: 48rem;
  position: relative;
  top: 10rem;

  ${below.med`
    max-height: 35rem;
  `};

  ${below.small`
    height: 30rem;
  `};
`;

const SummerCamp = () => {
  return (
    <Main backgroundColor="primary" fontColor="light" hasTrees>
      <MainGrid columns="repeat(auto-fit,minmax(320px,1fr))">
        <Cell>
          <div>
            <SummerCampHeader>Summer Camp for Geeks</SummerCampHeader>
            <span className="large-body-copy">
              THAT Conference is the largest tech event in the US Midwest and
              it’s held at a waterpark. We are a family-friendly conference and
              encourage children (geeklings) to submit talks as well! We are
              looking for counselors on a wide variety of topics and
              backgrounds. Do you have a story to tell? Do you have expertise in
              a specific field to share? We want to hear from you!
            </span>
          </div>
        </Cell>
        <MegaphoneBearCell>
          <MegaphoneBear src="/images/bear-pig.png" />
        </MegaphoneBearCell>
      </MainGrid>
    </Main>
  );
};

export default SummerCamp;
