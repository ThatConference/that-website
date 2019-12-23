// import styled from 'styled-components';
import React from 'react';
import { connect } from 'react-redux';
import { useFetchUser } from '../../../../lib/user';

const home = ({ user: reduxUser, dispatch }) => {
  console.log('reduxUser', reduxUser);

  let user = reduxUser;

  if (!user) {
    console.log('loading user, no redux');
    const { cookieUser, loading } = useFetchUser();
    if (!loading) {
      dispatch({ type: 'USER', payload: cookieUser });
      user = cookieUser;
    }
  }

  if (!user) {
    return <a href="/api/login">Sign In</a>;
  }

  return <div>{`Hi ${user.given_name}!`}</div>;
};

const mapStateToProps = function(state) {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(home);
