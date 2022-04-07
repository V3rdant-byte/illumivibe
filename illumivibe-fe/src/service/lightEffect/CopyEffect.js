import axios from 'axios';

import store from '../../store';
import { EffectQuery } from './EffectQuery';

export const CopyEffect = (code) => {
	const state = store.getState();
	const bearer = state.account === undefined ? '' : state.account.accessToken;

	var config = {
		method: 'post',
		url: 'https://illumivibe.cf/api/user/sharecode/copy?code=' + code,
		headers: { 
			'Content-Type': 'application/json', 
			'Accept': 'application/json',
			'Authorization': bearer
		}
	};
	
    let res = '';
	axios(config)
	.then(function (response) {
		console.log("[CopyEffect]: successful res ", response);
        res=response;
        EffectQuery();
	})
	.catch(function (error) {
		console.log(error);
        alert("Cannot copy effect or share code invalid");
	});

	return res;
};