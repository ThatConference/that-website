import React from 'react';
import styled from 'styled-components';
import Icon from './Icon';

const MapMarker = props => (
  <>
    <div
      style={{
        height: 20,
        width: 20,
      }}
    >
      <Icon icon="location" />
    </div>
    {/* Below is info window component */}
    {props.show && (
      <div
        style={{
          width: 100,
          height: 100,
        }}
      >
        Info window
      </div>
    )}
  </>
);

export default styled(MapMarker)``;
