import React from 'react';
import styled, { css } from 'styled-components';
import parse from 'html-react-parser';

import SquareButton from './SquareButton';

const MarkdownIt = require('markdown-it');

const Toggler = styled(SquareButton)`
  float: right;
  margin-bottom: 0.25rem;
`;

const Container = styled.div``;

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

export default class MarkdownEditor extends React.Component {
  constructor(props) {
    super(props);
    this.converter = new MarkdownIt();
    this.state = {
      markdown: '',
      preview: '',
      state: 'edit',
    };
    this.handleMarkdownChange = this.handleMarkdownChange.bind(this);
    this.handleStateToggle = this.handleStateToggle.bind(this);
  }

  handleStateToggle() {
    const { state } = this.state;
    if (state === 'edit') {
      this.setState({ state: 'preview' });
    } else {
      this.setState({ state: 'edit' });
    }
  }

  handleMarkdownChange(event) {
    const markdown = event.target.value;
    const preview = this.converter.render(markdown);
    this.setState({ preview, markdown });
  }

  render() {
    const { state, markdown, preview } = this.state;
    return (
      <Container>
        <Toggler
          color="light"
          backgroundColor="thatBlue"
          label={state === 'edit' ? 'Preview' : 'Edit'}
          onClick={this.handleStateToggle}
          width="15rem"
        />
        {state === 'edit' && (
          <TextArea value={markdown} onChange={this.handleMarkdownChange} />
        )}
        {state === 'preview' && <Preview>{parse(preview)}</Preview>}
      </Container>
    );
  }
}
