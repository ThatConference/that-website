import React, { useState, useEffect } from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import pluralize from 'pluralize';
import { below } from '../../utilities';

const CountdownTimer = ({ endDate, className }) => {
  const calculateTimeTillStart = () => {
    const milliseconds = moment(endDate) - moment();
    return {
      days: Math.floor(milliseconds / (1000 * 60 * 60 * 24)),
      hours: Math.floor((milliseconds / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((milliseconds / 1000 / 60) % 60),
      seconds: Math.floor((milliseconds / 1000) % 60),
    };
  };

  const [timeTillStart, setTimeTillStart] = useState(calculateTimeTillStart());

  useEffect(() => {
    setTimeout(() => {
      setTimeTillStart(calculateTimeTillStart());
    }, 1000);
  });

  return (
    <div className={className}>
      <div className="numbers">
        <h2>{timeTillStart.days}</h2>
        <h2>{timeTillStart.hours}</h2>
        <h2>{timeTillStart.minutes}</h2>
        <h2>{timeTillStart.seconds}</h2>
      </div>
      <div className="text">
        <h2>{pluralize('Day', timeTillStart.days)}</h2>
        <h2>{pluralize('Hour', timeTillStart.hours)}</h2>
        <h2>{pluralize('Minute', timeTillStart.minutes)}</h2>
        <h2>{pluralize('Second', timeTillStart.seconds)}</h2>
      </div>
    </div>
  );
};

CountdownTimer.propTypes = {
  className: PropTypes.string,
  // endDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.oneOfType([(instanceOf(Date), PropTypes.string)])
    .isRequired,
};

CountdownTimer.defaultProps = {
  className: '',
};

export default styled(CountdownTimer)`
  display: flex;
  justify-content: center;

  h2 {
    ${below.med`
      font-size: 7rem;
    `};
  }

  .numbers {
    h2 {
      text-align: right;
      padding-right: 2rem;
    }
  }

  .text {
    min-width: 32.5rem;

    h2 {
      text-align: left;
    }

    ${below.med`
      min-width: 22.5rem;
    `};
  }
`;
