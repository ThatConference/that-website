import styled from 'styled-components';
import Icon from './Icon';

const IconBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ align }) => align || 'left'};
`;

const IconText = ({ align, icon, children, className }) => {
  return (
    <IconBlock align={align} className={className}>
      <Icon icon={icon} height="24" width="24" />
      {children}
    </IconBlock>
  );
};

export default IconText;
