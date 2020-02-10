import React from 'react';
import styled, { css } from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';

import Icon from '../../../shared/Icon';

const ThumbsContainer = styled(Grid)`
  margin-top: 8rem;
`;

const ThumbsIcon = css`
  height: ${({ iconHeight }) => iconHeight};
  cursor: pointer;
  fill: ${({ theme }) => theme.colors.primary};
`;

const ThumbsDownIcon = styled(Icon)`
  ${ThumbsIcon}
  transform: scaleY(-1);
  &:hover {
    fill: ${({ theme }) => theme.colors.danger};
  }
  &.vote-selected {
    fill: ${({ theme }) => theme.colors.danger};
  }
`;

const ThumbsUpIcon = styled(Icon)`
  ${ThumbsIcon}
  float: right;
  &:hover {
    fill: ${({ theme }) => theme.colors.success};
  }
  &.vote-selected {
    fill: ${({ theme }) => theme.colors.success};
  }
`;

const Thumbs = ({ iconHeight, submit, vote, id }) => {
  const yesClick = () => {
    submit(true, id);
  };

  const noClick = () => {
    submit(false, id);
  };

  return (
    <ThumbsContainer className="thumbs-container" columns={2}>
      <Cell width={1}>
        <ThumbsDownIcon
          iconHeight={iconHeight}
          icon="thumbsUp"
          title="Thumbs Down, I would NOT attend"
          height="30"
          width="30"
          viewBoxHeight="20"
          viewBoxWidth="20"
          onClick={noClick}
          className={vote === false ? 'vote-selected' : ''}
        />
      </Cell>
      <Cell width={1}>
        <ThumbsUpIcon
          iconHeight={iconHeight}
          icon="thumbsUp"
          title="Thumbs Up, I would attend"
          height="30"
          width="30"
          viewBoxHeight="20"
          viewBoxWidth="20"
          onClick={yesClick}
          className={vote === true ? 'vote-selected' : ''}
        />
      </Cell>
    </ThumbsContainer>
  );
};

export default Thumbs;
