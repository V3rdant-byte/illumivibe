import { createAction } from '@reduxjs/toolkit';

const LoginData = {
  initialState: {},
  action: createAction('account/LoginData'),
  reducers(state, { payload }) {
    state.loggedIn = true;
    state.googleOAuthResponse = payload;
  },
};

export default LoginData;
