import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ContentSection from './ContentSection';
import LinkButton from './LinkButton/LinkButton';
import { SlimCenteredH2 } from './StandardStyles';
import { above, below } from '../../utilities';

const twoColBp = 'larger';

const Main = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
  justify-content: center;

  ${below[twoColBp]`
    flex-direction: column;
  `};
`;

const SideDetail = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 2;

  ${above[twoColBp]`
    margin-right: 4rem;
  `};

  ${below[twoColBp]`
    align-items: center;
  `};
`;

const VideoBlock = styled.div`
  min-width: 90rem;
  max-height: 55rem;
  padding-top: 4rem;
  padding-bottom: 1rem;

  ${below[twoColBp]`
    min-width: 80%;
    height: 50rem;
  `};
`;

const StyledH3 = styled.h3`
  color: ${({ theme }) => theme.colors.fonts.light};
  margin: 3rem 0;
`;

const Links = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;

  li {
    float: left;
    color: ${({ theme }) => theme.colors.fonts.light};

    &:first-child {
      padding-right: 4rem;

      ${below.xsmall`
        padding-right: 0;
      `};
    }
  }
`;

// Component we can reuse to display opening and closing keynote by
// passing in detail to display as props
const SessionHighlight = ({
  children,
  className,
  description,
  linkText,
  linkUrl,
  subtitle,
  title,
}) => {
  return (
    <ContentSection
      className={className}
      backgroundColor="thatBlue"
      backgroundOpacity={0.82}
      backgroundImage="/images/group.jpg"
    >
      {title && (
        <SlimCenteredH2 className="font-light" style={{ marginBottom: '1rem' }}>
          {title}
        </SlimCenteredH2>
      )}

      <Main>
        <SideDetail>
          <StyledH3 dangerouslySetInnerHTML={{ __html: subtitle }} />
          <p className="font-light">{description}</p>
          <Links>
            {linkText && (
              <li>
                <LinkButton label={linkText} href={linkUrl} />
              </li>
            )}
          </Links>
        </SideDetail>
        <VideoBlock>{children}</VideoBlock>
      </Main>
    </ContentSection>
  );
};

SessionHighlight.propTypes = {
  className: PropTypes.string,
  linkText: PropTypes.string,
  linkUrl: PropTypes.string,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
};

SessionHighlight.defaultProps = {
  className: '',
  linkText: '',
  linkUrl: '',
  subtitle: '',
};

export default styled(SessionHighlight)``;
