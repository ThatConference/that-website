import React from 'react';
import styled from 'styled-components';

import { below } from '../../utilities';

const PartnerDetailSubHeading = styled.h4`
  font-size: 2.5rem;
  margin-bottom: 2rem;

  ${below.med`
    font-size: 2rem;
    
  `};
`;

export default PartnerDetailSubHeading;
