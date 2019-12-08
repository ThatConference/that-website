import React from 'react';
import styled from 'styled-components';
import { svgs } from '../../utilities';

const Svg = styled.svg`
  width: auto;
  height: 100%;

  &.down {
    transform: rotate(90deg);
  }

  &.up {
    transform: rotate(-90deg);
  }

  &.left {
    transform: rotate(-270deg);
  }

  &.right {
    transform: rotate(-90deg);
  }
`;

const Icon = ({
  className,
  onClick,
  height,
  width,
  viewBoxHeight,
  viewBoxWidth,
  icon,
}) => {
  return (
    <Svg
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
      height={height}
      width={width}
      viewBox={`0 0 ${viewBoxHeight || height || '24'} ${viewBoxWidth ||
        width ||
        '24'}`}
    >
      <title>{svgs[icon].title}</title>
      {svgs[icon].path.map(item => {
        return <path key={item} d={item} />;
      })}
    </Svg>
  );
};

export default Icon;
