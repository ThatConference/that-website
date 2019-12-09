import React, { useState } from 'react';

let formik;
let fieldName;
let updateImagePreviewGlobal;

const handleImageChange = e => {
  e.preventDefault();
  const reader = new FileReader();
  const file = e.target.files[0];

  reader.onloadend = () => {
    updateImagePreviewGlobal(reader.result);
    formik.setFieldValue(fieldName, file);
  };

  reader.readAsDataURL(file);
};

const ImageUpload = ({ formikForm, field }) => {
  const [imagePreviewUrl, updateImagePreview] = useState('');
  updateImagePreviewGlobal = updateImagePreview;

  formik = formikForm;
  fieldName = field;

  let $imagePreview = null;
  if (imagePreviewUrl) {
    $imagePreview = <img src={imagePreviewUrl} alt="" />;
  }

  return (
    <>
      <input
        type="file"
        onChange={handleImageChange}
        name={field}
        id={field}
        accept="image/*"
      />
      {$imagePreview}
    </>
  );
};

export default ImageUpload;
