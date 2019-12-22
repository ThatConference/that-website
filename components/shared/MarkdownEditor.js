import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import parse from 'html-react-parser';

import SquareButton from './SquareButton';

const MarkdownIt = require('markdown-it');

const Toggler = styled(SquareButton)`
  float: right;
  margin-bottom: 0.25rem;
  width: 7rem;
  height: 3rem;
`;

const shared = css`
  border: 1px solid ${({ theme }) => theme.colors.mediumGray};
  width: 100%;
  max-width: inherit;
  min-height: 20rem;
  overflow: auto;
  padding: 0.5rem;
  margin: 0;
`;

const TextArea = styled.textarea`
  ${shared}
  resize: vertical;
`;

const Preview = styled.div`
  ${shared}
  min-height: 20rem;
`;

const MarkdownNote = styled.p`
  margin: 0;
  float: right;
  margin-top: -1rem;
  font-size: 1.2rem;
`;

const converter = new MarkdownIt();
let setTouched;
let setValue;
let fieldName;
let invalid = false;
let markdown = '';

const handleMarkdownChange = event => {
  markdown = event.target.value;
  setTouched(fieldName, true);
  setValue(fieldName, markdown, true);
  invalid = !markdown || markdown === '';
};

const MarkdownEditor = ({
  setFieldTouched,
  setFieldValue,
  field,
  fieldHasValidation,
  touched,
}) => {
  const [displayPreview, setDisplayPreview] = useState(false);
  setTouched = setFieldTouched;
  setValue = setFieldValue;
  fieldName = field;
  invalid =
    fieldHasValidation &&
    touched &&
    touched[field] &&
    (!markdown || markdown === '');
  return (
    <>
      <Toggler
        color="light"
        backgroundColor="thatBlue"
        label={displayPreview ? 'Edit' : 'Preview'}
        onClick={() => {
          setDisplayPreview(!displayPreview);
          setTouched(fieldName, true);
        }}
        width="15rem"
      />
      {!displayPreview && (
        <>
          <TextArea
            value={markdown}
            onChange={handleMarkdownChange}
            name={field}
            id={field}
            className={invalid ? 'invalid' : ''}
          />
          <MarkdownNote>*Markdown supported</MarkdownNote>
        </>
      )}
      {displayPreview && <Preview>{parse(converter.render(markdown))}</Preview>}
    </>
  );
};

export default MarkdownEditor;
