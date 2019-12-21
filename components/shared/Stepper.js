import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: -5rem;
`;

const Header = styled.h5`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.mediumGray};
`;

const Steps = styled.div``;

const Step = styled.div`
  display: inline-block;
  border-top: 4px solid
    ${({ currentOrCompleted, theme }) =>
      currentOrCompleted && currentOrCompleted === true
        ? theme.colors.success
        : theme.colors.gray};
  margin-right: 2rem;
  width: 12rem;
  text-align: center;
`;

const FormInput = ({ header, steps }) => {
  return (
    <Container>
      {header && <Header>{header}</Header>}
      <Steps>
        {steps.map(s => {
          return (
            <Step key={s.label} currentOrCompleted={s.currentOrCompleted}>
              <span>{s.label}</span>
            </Step>
          );
        })}
      </Steps>
    </Container>
  );
};

export default FormInput;
