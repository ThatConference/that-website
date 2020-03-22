import moment from 'moment';

export const wiDates = {
  SESSION_VOTING_ENDS: '3/31/2020',
};

export const getRawDate = key => {
  return wiDates[key];
};

export const getMomentDate = key => {
  return moment(wiDates[key]);
};

export default wiDates;
