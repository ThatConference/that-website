/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import fetch from 'isomorphic-unfetch';
import Imgix from 'react-imgix';
import styled from 'styled-components';
import {
  FormRow,
  FormRule,
  FormCancel,
  FormSubmit,
  FormInputRequiredIndicator,
} from '../../shared/FormLayout';
import LoadingIndicator from '../../shared/LoadingIndicator';

const StyledImgix = styled(Imgix)`
  margin-left: 2rem;
`;

const Image = ({
  fileUploading,
  formCancel,
  formSubmit,
  showButtons,
  setFieldValue,
  setFieldTouched,
  setFileUplaoding,
  user,
  values,
}) => {
  // eslint-disable-next-line consistent-return
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

  const { canFeature, profileImage } = values;

  return (
    <>
      <FormRow style={{ display: 'flex', alignItems: 'center' }}>
        <label htmlFor="profileImage" style={{ paddingRight: '1.5rem' }}>
          File upload
          {canFeature && (
            <FormInputRequiredIndicator> *</FormInputRequiredIndicator>
          )}
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
        {!fileUploading && profileImage && (
          <StyledImgix
            src={profileImage}
            width={80}
            height={80}
            imgixParams={{ fit: 'facearea', facepad: 4 }}
          />
        )}
        {fileUploading && (
          <div style={{ paddingLeft: '2rem' }}>
            <LoadingIndicator size="1rem" />
          </div>
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
