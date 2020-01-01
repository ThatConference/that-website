import React, { useState } from 'react';
import styled from 'styled-components';

import Button from './SquareButton';

let setValue;
let fieldName;
let updateImagePreviewGlobal;

const ImageInputButtonWrapper = styled.div`
  position: relative;
  overflow: hidden;
  display: block;

  button {
    display: block;
    width: auto;
    padding: 1rem;
  }

  input[type='file'] {
    font-size: 100px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }
`;

const ImageInput = styled.input`
  display: block;
  width: 100%;
`;

const handleImageChange = e => {
  e.preventDefault();
  const reader = new FileReader();
  const file = e.target.files[0];

  reader.onloadend = () => {
    updateImagePreviewGlobal(reader.result);
    setValue(fieldName, file);
  };

  reader.readAsDataURL(file);
};

const ImageUpload = ({ setFieldValue, field }) => {
  const [imagePreviewUrl, updateImagePreview] = useState('');
  updateImagePreviewGlobal = updateImagePreview;

  setValue = setFieldValue;
  fieldName = field;

  let $imagePreview = null;
  if (imagePreviewUrl) {
    $imagePreview = <img src={imagePreviewUrl} alt="" />;
  }

  return (
    <>
      <ImageInputButtonWrapper>
        <Button label="Upload a photo" />
        <ImageInput
          type="file"
          onChange={handleImageChange}
          name={field}
          id={field}
          accept="image/*"
        />
      </ImageInputButtonWrapper>
      {$imagePreview}
    </>
  );
};

export default ImageUpload;
