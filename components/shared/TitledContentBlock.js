import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ContentSection from './ContentSection';
import LinkButton from './LinkButton';

const Title = styled.h1`
  color: ${({ color, theme }) =>
    color ? theme.colors[color] : theme.colors.primary};
`;

const Subtitle = styled.h3`
  font-size: 3rem;
  margin-top: 4rem;
  margin-bottom: 1rem;
  color: ${({ color, theme }) =>
    color ? theme.colors[color] : theme.colors.primary};
`;

const Text = styled.p`
  color: ${({ color, theme }) =>
    color ? theme.colors[color] : theme.colors.gray};
`;

const TitledContentBlock = ({
  title,
  titleColor,
  subtitle,
  subtitleColor,
  text,
  textColor,
  buttonText,
  buttonLinkUrl,
  buttonLinkIsLocal,
  className,
  backgroundColor,
  backgroundOpacity,
  backgroundImage,
}) => {
  return (
    <ContentSection
      className={className}
      backgroundColor={backgroundColor}
      backgroundOpacity={backgroundOpacity}
      backgroundImage={backgroundImage}
    >
      <Title color={titleColor}>{title}</Title>
      {subtitle && <Subtitle color={subtitleColor}>{subtitle}</Subtitle>}
      <Text color={textColor}>{text}</Text>
      {buttonText && buttonLinkUrl && (
        <LinkButton
          label={buttonText}
          href={buttonLinkUrl}
          isLocal={buttonLinkIsLocal}
        />
      )}
    </ContentSection>
  );
};

TitledContentBlock.propTypes = {
  title: PropTypes.string.isRequired,
  titleColor: PropTypes.string,
  subtitle: PropTypes.string,
  subtitleColor: PropTypes.string,
  text: PropTypes.string.isRequired,
  textColor: PropTypes.string,
  buttonText: PropTypes.string,
  buttonLinkUrl: PropTypes.string,
  buttonLinkIsLocal: PropTypes.bool,
  className: PropTypes.string,
  backgroundColor: PropTypes.string,
  backgroundImage: PropTypes.string,
  backgroundOpacity: PropTypes.number,
};

TitledContentBlock.defaultProps = {
  titleColor: 'primary',
  subtitle: null,
  subtitleColor: 'primary',
  textColor: 'gray',
  buttonText: null,
  buttonLinkUrl: null,
  buttonLinkIsLocal: false,
  className: '',
  backgroundColor: '',
  backgroundImage: '',
  backgroundOpacity: 1,
};
export default styled(TitledContentBlock)``;
