import React from 'react';
import styled, { css } from 'styled-components';
import parse from 'html-react-parser';

import SquareButton from './SquareButton';
import Icon from './Icon';

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
let formik;
let fieldName;
let invalid = false;
let markdown = '';
let preview = '';
let state = 'edit';

const handleStateToggle = () => {
  if (state === 'edit') {
    preview = converter.render(markdown);
    state = 'preview';
  } else {
    state = 'edit';
  }
  formik.setFieldTouched(fieldName, true);
};

const handleMarkdownChange = event => {
  markdown = event.target.value;
  formik.setFieldTouched(fieldName, true);
  formik.setFieldValue(fieldName, markdown, true);
  invalid = !markdown || markdown === '';
};

const MarkdownEditor = ({ formikForm, field }) => {
  formik = formikForm;
  fieldName = field;
  return (
    <>
      <Toggler
        color="light"
        backgroundColor="thatBlue"
        label={state === 'edit' ? 'Preview' : 'Edit'}
        onClick={handleStateToggle}
        width="15rem"
      />
      {state === 'edit' && (
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
      {state === 'preview' && <Preview>{parse(preview)}</Preview>}
    </>
  );
};

export default MarkdownEditor;
