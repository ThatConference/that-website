import React from 'react';
import BaseStepper from '../../../shared/Stepper';

const Stepper = ({ currentStep }) => {
  const currentStepInt = currentStep ? parseInt(currentStep, 10) : 0;
  const steps = [
    {
      label: 'Contact Info',
      currentOrCompleted: currentStepInt >= 0,
    },
    {
      label: 'Upload Image',
      currentOrCompleted: currentStepInt >= 1,
    },
    {
      label: 'Online Presence',
      currentOrCompleted: currentStepInt >= 2,
    },
    {
      label: 'Bio',
      currentOrCompleted: currentStepInt >= 3,
    },
  ];
  return <BaseStepper steps={steps} header="Your Profile" />;
};

export default Stepper;
