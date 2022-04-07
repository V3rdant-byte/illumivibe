import axios from 'axios';

import store from '../../store';

import { SetAccessToken } from '../../store/account';

export const LoginRefresh = () => {
	const state = store.getState();
	const bearer = state.account === undefined ? '' : state.account.accessToken;
	var config = {
		method: 'post',
		url: 'https://illumivibe.cf/api/user/login/refresh',
		headers: { 
			'Content-Type': 'application/json', 
			'Accept': 'application/json',
			'Authorization': bearer
		}
	};
	
	var result;
	axios(config)
	.then(function (response) {
		result=response;
		console.log("[LoginRefresh] login token refreshed");
		store.dispatch(SetAccessToken.action(result.data.authHeader));
	})
	.catch(function (error) {
		console.log(error);
	});

	return result;

};