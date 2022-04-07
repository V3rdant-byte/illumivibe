import { createAction } from '@reduxjs/toolkit';

const SetAccessToken = {
  initialState: {},
  action: createAction('account/SetAccessToken'),
  reducers(state, { payload }) {
    state.loggedIn = true;
    state.accessToken = payload;
  },
};

export default SetAccessToken;
