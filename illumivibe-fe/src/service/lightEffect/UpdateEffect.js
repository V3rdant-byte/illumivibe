import axios from 'axios';

import store from '../../store';

export const UpdateEffect = (effect) => {
	const state = store.getState();
	const bearer = state.account === undefined ? '' : state.account.accessToken;

    var data = JSON.stringify(effect);

	var config = {
		method: 'put',
		url: 'https://illumivibe.cf/api/user/light-effect/' + effect.id + "/update",
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
		console.log("[UpdateEffect]: successful res ", response);
        res=response;
	})
	.catch(function (error) {
		console.log(error);
		alert("Update effect failed");
	});

	return res;
};