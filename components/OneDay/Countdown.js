import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import ContentSection from '../shared/ContentSection';
import Icon from '../shared/Icon';
import CountdownTimer from '../shared/CountdownTimer';
import { below } from '../../utilities';
import { FlexColumn } from '../shared/StandardStyles';

const twoColBp = 'larger';

const Main = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  ${below[twoColBp]`
    flex-direction: column;
  `};
`;

const StyledCountdownTimer = styled(CountdownTimer)`
  h2 {
    color: ${({ theme }) => theme.colors.fonts.light};
    margin-top: 0;
    margin-bottom: 0;
  }
`;

const Section = styled.div`
  text-align: center;
  width: 50%;

  ${below[twoColBp]`
    width: 100%;
  `};

  &:first-child {
    ${below[twoColBp]`
      margin-bottom: 4rem;
    `};
  }
`;

const StyledH3 = styled.h3`
  text-align: center;
  font-size: 3.5rem;
  margin-top: 0;
  color: ${({ theme }) => theme.colors.fonts.light};
  margin-bottom: 1rem;

  ${below[twoColBp]`
    margin-top: 2rem;
  `};
`;

const WhenWhereBlock = styled.div`
  display: flex;

  ${below[twoColBp]`
    flex-direction: column;
  `};
`;

const WhenWhereText = styled.p`
  color: ${({ theme }) => theme.colors.fonts.light};
  margin-top: 0;
  line-height: 1.2;
  font-size: 2.4rem;
`;

const TreeIcon = styled(Icon)`
  fill: ${({ theme }) => theme.colors.white};
  margin-top: 3rem;

  ${below[twoColBp]`
    margin-bottom: 5rem;
    width: 50rem;
    order: 1;
  `};

  ${below.small`
    width: 30rem;
    margin-bottom: 1rem;
  `};

  ${below.xsmall`
    width: 25rem;
  `};
`;

const Countdown = ({ className, event }) => {
  return (
    <ContentSection
      className={className}
      backgroundColor="thatBlue"
      backgroundOpacity={0.82}
      backgroundImage="/images/group.jpg"
    >
      <Main>
        <Section>
          <StyledCountdownTimer endDate={event.startDate} />
        </Section>
        <Section>
          <WhenWhereBlock>
            <FlexColumn style={{ flex: '1 0 50%' }}>
              <StyledH3>When</StyledH3>
              <WhenWhereText>
                {moment(event.startDate).format('MMMM Do, YYYY')}
              </WhenWhereText>
            </FlexColumn>
            <FlexColumn style={{ flex: '1 0 50%' }}>
              <StyledH3>Where</StyledH3>
              <WhenWhereText>{event.venues[0].name}</WhenWhereText>
            </FlexColumn>
          </WhenWhereBlock>
          <TreeIcon
            icon="thatTrees"
            width="600"
            height="175"
            viewBoxHeight="87"
            viewBoxWidth="200"
          />
        </Section>
      </Main>
    </ContentSection>
  );
};

Countdown.propTypes = {
  className: PropTypes.string,
  event: PropTypes.shape({}).isRequired,
};

Countdown.defaultProps = {
  className: '',
};

export default styled(Countdown)``;
