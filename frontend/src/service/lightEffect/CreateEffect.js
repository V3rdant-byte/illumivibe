import axios from 'axios';

import store from '../../store';

export const CreateEffect = (effect) => {
	const state = store.getState();
	const bearer = state.account === undefined ? '' : state.account.accessToken;
	console.log(effect);
    var data = JSON.stringify(effect);
	console.log("[CreateEffect] " + data);

	var config = {
		method: 'post',
		url: 'https://illumivibe.cf/api/user/light-effect/create',
		headers: { 
			'Content-Type': 'application/json', 
			'Accept': 'application/json',
			'Authorization': bearer
		},
        data: data
	};
	
    let res = '';
	axios(config)
	.then(function (response) {
		console.log("[CreateEffect]: successful res ", response);
        res=response;
	})
	.catch(function (error) {
		console.log(error);
		alert("Create effect failed");
	});

	return res;
};