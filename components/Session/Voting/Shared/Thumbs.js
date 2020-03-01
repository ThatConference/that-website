import React from 'react';
import styled, { css } from 'styled-components';
import Icon from '../../../shared/Icon';

const ThumbRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 2rem;
`;

const ThumbsIcon = css`
  cursor: pointer;
  fill: ${({ theme }) => theme.colors.primary};
`;

const ThumbsDownIcon = styled(Icon)`
  ${ThumbsIcon}
  transform: scaleY(-1);
  &:hover,
  &.vote-selected {
    fill: ${({ theme }) => theme.colors.danger};
  }
`;

const ThumbsUpIcon = styled(Icon)`
  ${ThumbsIcon}
  padding-right: 2rem;
  &:hover,
  &.vote-selected {
    fill: ${({ theme }) => theme.colors.success};
  }
`;

const Thumbs = ({ voteUp, voteDown, currentVote, style }) => {
  return (
    <ThumbRow style={style}>
      <ThumbsUpIcon
        icon="thumbsUp"
        title="Thumbs Up, I would attend"
        height="50"
        width="50"
        viewBoxHeight="25"
        viewBoxWidth="25"
        onClick={voteUp}
        className={currentVote === true ? 'vote-selected' : ''}
      />
      <ThumbsDownIcon
        icon="thumbsUp"
        title="Thumbs Down, I would NOT attend"
        height="50"
        width="50"
        viewBoxHeight="25"
        viewBoxWidth="25"
        onClick={voteDown}
        className={currentVote === false ? 'vote-selected' : ''}
      />
    </ThumbRow>
  );
};

export default Thumbs;
