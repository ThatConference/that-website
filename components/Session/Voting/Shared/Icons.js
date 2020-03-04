import React from 'react';
import styled, { css } from 'styled-components';
import Icon from '../../../shared/Icon';

const isTouch =
  !!('ontouchstart' in window) || window.navigator.msMaxTouchPoints > 0;

const OrganizerNotesIcon = styled(Icon)`
  cursor: pointer;
  fill: ${({ color, theme }) => theme.colors[color]};
  height: 5.5rem;
  position: relative;
  top: 0.6rem;
  &.vote-selected {
    fill: ${({ theme }) => theme.colors.highlight};
  }
  &:hover {
    fill: ${({ color, theme }) =>
      isTouch ? theme.colors[color] : theme.colors.highlight};
  }
`;

const ThumbsIcon = css`
  cursor: pointer;
  fill: ${({ color, theme }) => theme.colors[color]};
`;

const ThumbsDownStyledIcon = styled(Icon)`
  ${ThumbsIcon}
  transform: scaleY(-1);
  &.vote-selected {
    fill: ${({ theme }) => theme.colors.danger};
  }
  &:hover {
    fill: ${({ color, theme }) =>
      isTouch ? theme.colors[color] : theme.colors.danger};
  }
`;

const ThumbsUpStyledIcon = styled(Icon)`
  ${ThumbsIcon}
  padding-right: 2rem;
  &.vote-selected {
    fill: ${({ theme }) => theme.colors.success};
  }
  &:hover {
    fill: ${({ color, theme }) =>
      isTouch ? theme.colors[color] : theme.colors.success};
  }
`;

export const NotesIcon = ({ clickHandler }) => {
  return (
    <OrganizerNotesIcon
      icon="notes"
      title="Add notes for organizers"
      height="50"
      width="50"
      viewBoxHeight="30"
      viewBoxWidth="30"
      color="lightGray"
      onClick={clickHandler}
    />
  );
};

export const ThumbsDownIcon = ({ color, currentVote, clickHandler }) => {
  return (
    <ThumbsDownStyledIcon
      icon="thumbsUp"
      title="Thumbs Down, I would NOT attend"
      height="50"
      width="50"
      viewBoxHeight="25"
      viewBoxWidth="25"
      onClick={clickHandler}
      className={currentVote === false ? 'vote-selected' : ''}
      color={color}
      isTouch={isTouch}
    />
  );
};

export const ThumbsUpIcon = ({ color, currentVote, clickHandler }) => {
  return (
    <ThumbsUpStyledIcon
      ontouchmove
      icon="thumbsUp"
      title="Thumbs Up, I would attend"
      height="50"
      width="50"
      viewBoxHeight="25"
      viewBoxWidth="25"
      onClick={clickHandler}
      className={currentVote === true ? 'vote-selected' : ''}
      color={color}
    />
  );
};
