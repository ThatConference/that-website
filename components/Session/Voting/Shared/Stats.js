import React from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import { FormRule } from '../../../shared/FormLayout';

const Rule = styled(FormRule)`
  margin-bottom: 1rem;
`;

const StatsContainer = styled(Grid)`
  margin-top: 0;
`;

const Stats = ({ totalSubmitted, totalVotedOn, totalRemaining }) => {
  return (
    <>
      <Rule />
      <StatsContainer columns={3}>
        <Cell width={1}>
          <strong>Total:</strong> {totalSubmitted}
        </Cell>
        <Cell width={1} center>
          <strong>Voted:</strong> {totalVotedOn}
        </Cell>
        <Cell width={1} className="text-right">
          <strong>Left:</strong> {totalRemaining}
        </Cell>
      </StatsContainer>
    </>
  );
};

export default Stats;
