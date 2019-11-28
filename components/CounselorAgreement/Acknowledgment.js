import React from 'react';
import { useFormik, Field } from 'formik';
import * as Yup from 'yup';

import { DEFAULT_WIP_PAGE } from '../../utilities';
import {
  FormLabel,
  FormRule,
  FormCheckbox,
  FormSubmit,
  FormInputValidationMessage,
} from '../shared/FormLayout';

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

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormRule />
      <div>
        <FormLabel htmlFor="agreeToCodeOfConduct">
          <FormCheckbox
            name="agreeToCodeOfConduct"
            id="agreeToCodeOfConduct"
            type="checkbox"
            {...formik.getFieldProps('agreeToCodeOfConduct')}
          />
          Agree to the <a href={`/${DEFAULT_WIP_PAGE}`}>Code of Conduct</a>
          {formik.touched.agreeToCodeOfConduct &&
          formik.errors.agreeToCodeOfConduct ? (
            <FormInputValidationMessage>
              {formik.errors.agreeToCodeOfConduct}
            </FormInputValidationMessage>
          ) : null}
        </FormLabel>
      </div>
      <div>
        <FormLabel htmlFor="agreeToCommitments">
          <FormCheckbox
            name="agreeToCommitments"
            id="agreeToCommitments"
            type="checkbox"
            {...formik.getFieldProps('agreeToCommitments')}
          />
          Agree to commitments to THAT Conference laid out above
          {formik.touched.agreeToCommitments &&
          formik.errors.agreeToCommitments ? (
            <FormInputValidationMessage>
              {formik.errors.agreeToCommitments}
            </FormInputValidationMessage>
          ) : null}
        </FormLabel>
        <div>
          <FormLabel htmlFor="agreeToBeingRecorded">
            <FormCheckbox
              name="agreeToBeingRecorded"
              id="agreeToBeingRecorded"
              type="checkbox"
              {...formik.getFieldProps('agreeToBeingRecorded')}
            />
            Agree to being recorded
            {formik.touched.agreeToBeingRecorded &&
            formik.errors.agreeToBeingRecorded ? (
              <FormInputValidationMessage>
                {formik.errors.agreeToBeingRecorded}
              </FormInputValidationMessage>
            ) : null}
          </FormLabel>
        </div>
        <div>
          <FormLabel htmlFor="are18OrOlder">
            <FormCheckbox
              name="are18OrOlder"
              id="are18OrOlder"
              type="checkbox"
              {...formik.getFieldProps('are18OrOlder')}
            />
            Are you 18 or older as of today?
            {formik.touched.are18OrOlder && formik.errors.are18OrOlder ? (
              <FormInputValidationMessage>
                {formik.errors.are18OrOlder}
              </FormInputValidationMessage>
            ) : null}
          </FormLabel>
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
