/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import fetch from 'isomorphic-unfetch';
import {
  FormRow,
  FormRule,
  FormCancel,
  FormSubmit,
} from '../../shared/FormLayout';

const Image = ({
  formCancel,
  formSubmit,
  showButtons,
  setFieldValue,
  setFieldTouched,
  user,
}) => {
  // eslint-disable-next-line consistent-return
  const fileUpload = async uploadFile => {
    const formData = new FormData();
    formData.append('file', uploadFile);

    const res = await fetch('https://api.that.tech/profile', {
      method: 'POST',
      headers: {
        Authorization: `bearer ${user.session.accessToken}`,
      },
      body: formData,
    });

    if (!res.ok) {
      // prolly need to do something here
      return null;
    }

    const json = await res.json();

    setFieldValue('profileImage', json.data.url);
    setFieldTouched('profileImage', true);
  };

  const handleUpload = event => {
    fileUpload(event.currentTarget.files[0]);
  };

  return (
    <>
      <FormRow>
        <label htmlFor="profileImage" style={{ paddingRight: '1.5rem' }}>
          File upload
        </label>
        <input
          id="profileImage"
          name="profileImage"
          type="file"
          onChange={handleUpload}
          className="form-control"
        />
        {/* <Thumb file={values.file} /> */}
      </FormRow>
      {showButtons && (
        <>
          <FormRule />
          <FormCancel label="Back" onClick={formCancel} />
          <FormSubmit label="Next" onClick={formSubmit} />
        </>
      )}
    </>
  );
};

export default Image;
