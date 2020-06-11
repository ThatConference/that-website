import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import pluralize from 'pluralize';

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
      <h2>{`${timeTillStart.days} ${pluralize('Day', timeTillStart.days)}`}</h2>
      <h2>{`${timeTillStart.hours} ${pluralize(
        'Hour',
        timeTillStart.hours,
      )}`}</h2>
      <h2>{`${timeTillStart.minutes} ${pluralize(
        'Minute',
        timeTillStart.minutes,
      )}`}</h2>
      <h2>{`${timeTillStart.seconds} ${pluralize(
        'Second',
        timeTillStart.seconds,
      )}`}</h2>
    </div>
  );
};

CountdownTimer.propTypes = {
  className: PropTypes.string,
  endDate: PropTypes.instanceOf(Date).isRequired,
};

CountdownTimer.defaultProps = {
  className: '',
};

export default styled(CountdownTimer)``;
