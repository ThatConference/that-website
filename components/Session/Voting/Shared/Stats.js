import React from 'react';
import styled from 'styled-components';
import { FormRule } from '../../../shared/FormLayout';

const Rule = styled(FormRule)`
  margin-bottom: 1rem;
  margin-top: 3rem;
`;

const StatRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const Stats = ({ totalSubmitted, totalVotedOn, totalRemaining }) => {
  return (
    <>
      <Rule />
      <StatRow>
        <div style={{ alignSelf: 'flex-start' }}>
          <strong>Total:</strong> {totalSubmitted}
        </div>
        <div style={{ flexGrow: 2, textAlign: 'center' }}>
          <strong>Voted:</strong> {totalVotedOn}
        </div>
        <div style={{ alignSelf: 'flex-end' }}>
          <strong>Remaining:</strong> {totalRemaining}
        </div>
      </StatRow>
    </>
  );
};

export default Stats;
