import { createAction } from '@reduxjs/toolkit';

const Login = {
  initialState: {},
  action: createAction('account/Login'),
  reducers(state, { payload }) {
    state.loggedIn = true;
  },
};

export default Login;
