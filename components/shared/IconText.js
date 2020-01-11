import React from 'react';
import styled from 'styled-components';
import Icon from './Icon';

const IconBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ align }) => align || 'left'};
`;

const PaddedIcon = styled(Icon)`
  padding-right: 0.8rem;
`;

const IconText = ({ align, icon, children, className, ...props }) => {
  return (
    <IconBlock align={align} className={className}>
      <PaddedIcon icon={icon} {...props} />
      {children}
    </IconBlock>
  );
};

export default IconText;
