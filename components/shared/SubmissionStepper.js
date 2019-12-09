import React from 'react';
import Stepper from './Stepper';

const SubmissionsStepper = props => {
  const { currentStep } = props;
  const currentStepInt = currentStep ? parseInt(currentStep, 10) : 0;
  const steps = [
    {
      label: '01. Agreement',
      currentOrCompleted: currentStepInt >= 0,
    },
    {
      label: '02. Your Profile',
      currentOrCompleted: currentStepInt >= 1,
    },
    {
      label: '03. Your Sessions',
      currentOrCompleted: currentStepInt === 2,
    },
  ];
  return <Stepper steps={steps} />;
};

export default SubmissionsStepper;
