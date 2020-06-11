import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import ContentSection from '../shared/ContentSection';
import Icon from '../shared/Icon';
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

const Section = styled.div`
  text-align: center;
  width: 50%;
`;

const StyledH3 = styled.h3`
  text-align: center;
  vertical-align: top;
  display: inline-block;
  width: 40rem;
  font-size: 3.5rem;
  color: ${({ theme }) => theme.colors.fonts.light};
  padding-left: 8rem;
  padding-right: 8rem;
`;

const Countdown = ({ className, event }) => {
  console.log(event);
  return (
    <ContentSection
      className={className}
      backgroundColor="thatBlue"
      backgroundOpacity={0.82}
      backgroundImage="/images/group.jpg"
    >
      <Main>
        <Section>
          <h2>X Days</h2>
          <h2>Y Minutes</h2>
          <h2>Z Seconds</h2>
        </Section>
        <Section>
          <StyledH3>{moment(event.startDate).format('MMMM do, YYYY')}</StyledH3>
          <StyledH3>{event.venues[0].name}</StyledH3>

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
