import React from 'react';
import styled, { css } from 'styled-components';
import Icon from '../../../shared/Icon';

const OrganizerNotesIcon = styled(Icon)`
  cursor: pointer;
  fill: ${({ color, theme }) => theme.colors[color]};
  height: 5rem;
  position: relative;
  top: 0;
  &.vote-selected {
    fill: ${({ theme }) => theme.colors.highlight};
  }
`;

const ThumbsIcon = css`
  cursor: pointer;
  fill: ${({ color, theme }) => theme.colors[color]};
`;

const ThumbsDownStyledIcon = styled(Icon)`
  ${ThumbsIcon}
  transform: scale(-1, -1);
  &.vote-selected {
    fill: ${({ theme }) => theme.colors.danger};
  }
`;

const ThumbsUpStyledIcon = styled(Icon)`
  ${ThumbsIcon}
  padding-right: 2rem;
  &.vote-selected {
    fill: ${({ theme }) => theme.colors.success};
  }
`;

export const NotesIcon = ({ clickHandler, size }) => {
  return (
    <OrganizerNotesIcon
      icon="notes"
      title="Add notes for organizers"
      height={size}
      width={size}
      viewBoxHeight="30"
      viewBoxWidth="30"
      color="lightGray"
      onClick={clickHandler}
    />
  );
};

export const ThumbsDownIcon = ({ color, currentVote, clickHandler, size }) => {
  return (
    <ThumbsDownStyledIcon
      icon="thumbsUp"
      title="Thumbs Down, I would NOT attend"
      height={size}
      width={size}
      viewBoxHeight="25"
      viewBoxWidth="25"
      onClick={clickHandler}
      className={currentVote === false ? 'vote-selected' : ''}
      color={color}
    />
  );
};

export const ThumbsUpIcon = ({ color, currentVote, clickHandler, size }) => {
  return (
    <ThumbsUpStyledIcon
      ontouchmove
      icon="thumbsUp"
      title="Thumbs Up, I would attend"
      height={size}
      width={size}
      viewBoxHeight="25"
      viewBoxWidth="25"
      onClick={clickHandler}
      className={currentVote === true ? 'vote-selected' : ''}
      color={color}
    />
  );
};
