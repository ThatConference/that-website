import React from 'react';
import styled from 'styled-components';

const Steps = styled.div`
  margin-top: -2rem;
`;

const Step = styled.div`
  display: inline-block;
  border-top: 2px solid
    ${({ currentOrCompleted, theme }) =>
      currentOrCompleted && currentOrCompleted === true
        ? theme.colors.success
        : theme.colors.gray};
  margin-right: 2rem;
  width: 14rem;
  text-align: center;
`;

const FormInput = props => {
  const { steps } = props;
  return (
    <Steps>
      {steps.map(s => {
        return (
          <Step key={s.label} currentOrCompleted={s.currentOrCompleted}>
            <span>{s.label}</span>
          </Step>
        );
      })}
    </Steps>
  );
};

export default FormInput;
