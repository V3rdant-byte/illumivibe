import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper';
import LoginData from './LoginData';
import Login from './Login';
import Logout from './Logout';
import SetAccessToken from './SetAccessToken';

export default buildSlice('account', [LoginData, Login, Logout, SetAccessToken], {
    loggedIn: false,
    googleOAuthResponse: [],
    accessToken: ""
}).reducer;

export { default as LoginData } from './LoginData';
export { default as Logout } from './Logout';
export { default as SetAccessToken } from './SetAccessToken';
export { default as Login } from './Login';