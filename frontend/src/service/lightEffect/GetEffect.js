import axios from 'axios';

import store from '../../store';

import {SetEffect} from '../../store/canvas';

export const GetEffect = (id) => {
	const state = store.getState();
	const bearer = state.account === undefined ? '' : state.account.accessToken;

	var config = {
		method: 'get',
		url: 'https://illumivibe.cf/api/user/light-effect/' + id + "/detail",
		headers: { 
			'Content-Type': 'application/json', 
			'Accept': 'application/json',
			'Authorization': bearer
		}
	};
	
    let res = '';
	axios(config)
	.then(function (response) {
		console.log("[GetEffect]: successful res ", response);
        res=response;

		const copy = res.data;

		store.dispatch(SetEffect.action(copy));
	})
	.catch(function (error) {
		console.log(error);
	});

	return res;
};