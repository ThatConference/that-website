import React from 'react';
import BaseStepper from '../../shared/Stepper';

const Stepper = ({ currentStep }) => {
  const currentStepInt = currentStep ? parseInt(currentStep, 10) : 0;
  const steps = [
    {
      label: 'Introduction',
      currentOrCompleted: currentStepInt >= 0,
    },
    {
      label: 'Details',
      currentOrCompleted: currentStepInt >= 1,
    },
    {
      label: 'Additional Info',
      currentOrCompleted: currentStepInt >= 2,
    },
    {
      label: 'Lastly',
      currentOrCompleted: currentStepInt >= 3,
    },
    {
      label: 'Preview',
      currentOrCompleted: currentStepInt >= 4,
    },
  ];
  return <BaseStepper steps={steps} header="Your Session" />;
};

export default Stepper;
