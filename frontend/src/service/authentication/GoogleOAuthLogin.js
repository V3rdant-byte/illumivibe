import axios from 'axios';

import store from '../../store';

import { SetAccessToken } from '../../store/account';

import { LoginRefresh } from '../../service/authentication/LoginRefresh';

const TOKEN_REFRESH_PERIOD = 3550;

export const GoogleOAuthLogin = () => {
	const state = store.getState();
	const idToken = state.account === undefined ? '' : state.account.googleOAuthResponse.tokenObj.id_token;

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
		console.log("[Authentication] login token acquired");
		store.dispatch(SetAccessToken.action(loginResult.data.authHeader));
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
	})
	.catch(function (error) {
		console.log(error);
	});



	return loginResult;

};