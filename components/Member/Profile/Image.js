import React from 'react';
import fetch from 'isomorphic-unfetch';
import Imgix from 'react-imgix';
import styled from 'styled-components';
import {
  FormRow,
  FormRule,
  FormCancel,
  FormSubmit,
} from '../../shared/FormLayout';

const StyledImgix = styled(Imgix)`
  margin-left: 2rem;
`;

const Image = ({
  formCancel,
  formSubmit,
  showButtons,
  setFieldValue,
  setFieldTouched,
  setFileUplaoding,
  user,
  values,
}) => {
  const fileUpload = async uploadFile => {
    setFileUplaoding(true);
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
    setFileUplaoding(false);
    setFieldTouched('profileImage', true);
  };

  const handleUpload = event => {
    fileUpload(event.currentTarget.files[0]);
  };

  return (
    <>
      <FormRow style={{ display: 'flex', alignItems: 'center' }}>
        <label htmlFor="profileImage" style={{ paddingRight: '1.5rem' }}>
          File upload
        </label>
        <input
          id="profileImage"
          name="profileImage"
          type="file"
          onChange={handleUpload}
          className="form-control"
          style={{ maxHeight: '4.5rem' }}
          accept="image/*"
        />
        {values.profileImage && (
          <StyledImgix
            src={values.profileImage}
            width={80}
            height={80}
            imgixParams={{ fit: 'facearea', facepad: 4 }}
          />
        )}
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
