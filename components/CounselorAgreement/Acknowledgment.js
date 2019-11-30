import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { DEFAULT_WIP_PAGE } from '../../utilities';
import FormInput from '../shared/FormInput';
import { FormRule, FormSubmit } from '../shared/FormLayout';

const Achknowledgment = props => {
  const formik = useFormik({
    initialValues: {
      agreeToCodeOfConduct: false,
      agreeToCommitments: false,
      agreeToBeingRecorded: false,
      are18OrOlder: false,
    },
    validationSchema: Yup.object({
      agreeToCodeOfConduct: Yup.bool().oneOf(
        [true],
        'Must agree to the Code of Conduct',
      ),
      agreeToCommitments: Yup.bool().oneOf(
        [true],
        'Must agree to the commitments',
      ),
      agreeToBeingRecorded: Yup.bool(),
      are18OrOlder: Yup.bool(),
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const codeOfConductLink = `Agree to the <a href='/${DEFAULT_WIP_PAGE}'>Code of Conduct</a>`;

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormRule />
      <div>
        <FormInput
          fieldName="agreeToCodeOfConduct"
          formikForm={formik}
          label={codeOfConductLink}
          inputType="checkbox"
        />
      </div>
      <div>
        <FormInput
          fieldName="agreeToCommitments"
          formikForm={formik}
          label="Agree to commitments to THAT Conference laid out above"
          inputType="checkbox"
        />
        <div>
          <FormInput
            fieldName="agreeToBeingRecorded"
            formikForm={formik}
            label="Agree to being recorded"
            inputType="checkbox"
          />
        </div>
        <div>
          <FormInput
            fieldName="are18OrOlder"
            formikForm={formik}
            label="Are you 18 or older as of today?"
            inputType="checkbox"
          />
        </div>
      </div>

      <FormSubmit
        color="dark"
        backgroundColor="white"
        borderColor="gray"
        label="Agree &amp; Continue"
        width="22.5rem"
        height="6.32rem"
        isSubmit
      />
    </form>
  );
};

export default Achknowledgment;
