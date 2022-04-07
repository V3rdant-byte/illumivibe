import { createAction } from '@reduxjs/toolkit';

const Logout = {
  initialState: {},
  action: createAction('account/Logout'),
  reducers(state, { payload }) {
    state.loggedIn = false;
    state.googleOAuthResponse = [];
    state.accessToken = "";
  },
};

export default Logout;
