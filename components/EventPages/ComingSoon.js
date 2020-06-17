/**
 * Page to render coming soon for an event we want to tease
 */

import React from 'react';
import styled from 'styled-components';

const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const ComingSoon = () => {
  return (
    <Image
      src="/images/TX-ComingSoon.jpg"
      loading="lazy"
      alt="THAT Texas Coming Soon"
    />
  );
};

export default styled(ComingSoon)``;
