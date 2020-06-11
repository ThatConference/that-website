import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import ContentSection from '../shared/ContentSection';
import Icon from '../shared/Icon';
import CountdownTimer from '../shared/CountdownTimer';
import { below } from '../../utilities';

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
      margin-bottom: 8rem;
    `};
  }
`;

const StyledH3 = styled.h3`
  text-align: center;
  vertical-align: top;
  display: inline-block;
  width: 30rem;
  font-size: 3.5rem;
  margin-top: 0;
  color: ${({ theme }) => theme.colors.fonts.light};

  ${below[twoColBp]`
    width: auto;
    display: block;
    margin-bottom: 1rem;
  `};
`;

const When = styled(StyledH3)`
  float: left;
  ${below[twoColBp]`
    float: unset;
  `};
`;

const Where = styled(StyledH3)`
  float: right;
  ${below[twoColBp]`
    float: unset;
  `};
`;

const TreeIcon = styled(Icon)`
  fill: ${({ theme }) => theme.colors.white};

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
  console.log(event.startDate);

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
          <When>{moment(event.startDate).format('MMMM do, YYYY')}</When>
          <Where>{event.venues[0].name}</Where>
          <TreeIcon
            icon="thatTrees"
            width="600"
            height="250"
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
