//reference: https://dev.to/sivaneshs/add-google-login-to-your-react-apps-in-10-mins-4del
import React from 'react';
import axios from 'axios';
import store from '../../store';

import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';

import { Login, LoginData, Logout } from '../../store/account';
import { SetView } from '../../store/navigation';

import { useNavigate } from 'react-router-dom';

import { LoginRefresh } from '../../service/authentication/LoginRefresh';
import { SetAccessToken } from '../../store/account';

import {TOKEN_REFRESH_PERIOD} from '../../config/constants';

const clientId = '94833549478-6h6jples3m5hfhunmqtbv82il1cphn2n.apps.googleusercontent.com';

function LoginButton() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSuccess = (res) => {
        console.log('[Login Success] currentUseer: ', res.profileObj);
        dispatch(LoginData.action(res));
        //GoogleOAuthLogin();
        /////
        const idToken = res.tokenObj === undefined ? '' : res.tokenObj.id_token;

        var data = JSON.stringify({
        "idToken": idToken
        });
        
        var config = {
            method: 'post',
            url: 'https://illumivibe.cf/api/public/login/oauth/google',
            headers: { 
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            },
            data: data
        };

        var loginResult;
        axios(config)
        .then(function (response) {
            loginResult=response;
            dispatch(SetAccessToken.action(loginResult.data.authHeader));
            var refresh = window.setInterval(()=>{
                let token = store.getState().account.accessToken;

                if (token && token !== '') {
                    LoginRefresh();
                }
                else {
                    console.log("[Authentication] token expired");
                    clearInterval(refresh);
                }
            }, TOKEN_REFRESH_PERIOD*1000);

            dispatch(Login.action());
            dispatch(SetView.action('dashboard'));
            navigate('/dashboard');
        })
        .catch(function (error) {
            console.log(error);
        });
        /////
    };

    const onFailure = (res) => {
        console.log('[Login failed] res: ', res);
        dispatch(Logout.action());
        navigate('/');
    };

    return (
        <div>
            <GoogleLogin 
                clientId = {clientId}
                buttonText = 'Sign in with Google'
                onSuccess = {onSuccess}
                onFailure = {onFailure}
                cookiePolicy= {'single_host_origin'}
                style={{marginTop:'3vh'}}
                isSignedIn={true}
            ></GoogleLogin>
        </div>
    );
}

export default LoginButton;