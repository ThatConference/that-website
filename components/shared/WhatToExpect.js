import React from 'react';
import styled from 'styled-components';

const CenteredDiv = styled.div`
  text-align: center;
`;

const WhatToExpectImage = styled.img`
  width: 150px;
`;

const WhatToExpectTitle = styled.span``;

const WhatToExpect = ({ src, title }) => {
  return (
    <div>
      <CenteredDiv style={{ height: '120px' }}>
        <WhatToExpectImage src={src} />
      </CenteredDiv>
      <CenteredDiv>
        <span className="medium-copy-body">{title}</span>
      </CenteredDiv>
    </div>
  );
};

export default WhatToExpect;
