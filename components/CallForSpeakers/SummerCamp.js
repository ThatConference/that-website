import React from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';

import ContentSection from '../shared/ContentSection';

import { below } from '../../utilities';

const Main = styled(ContentSection)`
  height: 83rem;
  margin-bottom: 14rem;
`;

const SummerCampHeader = styled.h3`
  font-size: 5.5rem;
  margin-top: 15rem;
  margin-bottom: 2.5rem;
  margin-left: 0;
  font-weight: 100;
  color: ${({ theme }) => theme.colors.fonts.light};
`;

const MegaphoneBear = styled.img`
  margin-top: 23rem;
  max-height: 60rem;

  ${below.large`
    height: 20rem;
  `};
`;

const SummerCamp = props => {
  return (
    <Main backgroundColor="primary" fontColor="light" hasTrees>
      <Grid columns="repeat(auto-fit,minmax(320px,1fr))">
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
        <Cell>
          <MegaphoneBear src="/images/bear-pig.png" />
        </Cell>
      </Grid>
    </Main>
  );
};

export default SummerCamp;
