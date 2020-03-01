import React from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import { FormRule } from '../../../shared/FormLayout';
import { gridRepeat } from '../../../../utilities';

const Rule = styled(FormRule)`
  margin-bottom: 1rem;
  margin-top: 3rem;
`;

const Stats = ({ totalSubmitted, totalVotedOn, totalRemaining }) => {
  return (
    <>
      <Rule />
      <Grid columns={gridRepeat.small}>
        <Cell width={1}>
          <strong>Total:</strong> {totalSubmitted}
        </Cell>
        <Cell width={1} center>
          <strong>Voted:</strong> {totalVotedOn}
        </Cell>
        <Cell width={1} className="text-right">
          <strong>Remaining:</strong> {totalRemaining}
        </Cell>
      </Grid>
    </>
  );
};

export default Stats;
