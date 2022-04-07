import axios from 'axios';

import store from '../../store';
import { EffectQuery } from './EffectQuery';

export const DeleteEffect = (id) => {
	const state = store.getState();
	const bearer = state.account === undefined ? '' : state.account.accessToken;

	var config = {
		method: 'delete',
		url: 'https://illumivibe.cf/api/user/light-effect/' + id + "/delete",
		headers: { 
			'Content-Type': 'application/json', 
			'Accept': 'application/json',
			'Authorization': bearer
		}
	};
	
    let res = '';
	axios(config)
	.then(function (response) {
		console.log("[DeleteEffect]: successful res ", response);
        res=response;
		EffectQuery();
	})
	.catch(function (error) {
		console.log(error);
	});

	return res;
};