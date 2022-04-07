import axios from 'axios';

import store from '../../store';

export const ShareEffect = (id) => {
	const state = store.getState();
	const bearer = state.account === undefined ? '' : state.account.accessToken;

	var config = {
		method: 'post',
		url: 'https://illumivibe.cf/api/user/sharecode/create?lightEffectId=' + id,
		headers: { 
			'Content-Type': 'application/json', 
			'Accept': 'application/json',
			'Authorization': bearer
		}
	};
	
    let res = '';
	axios(config)
	.then(function (response) {
		console.log("[ShareEffect]: successful res ", response.data.code);
        res=response;

		navigator.clipboard.writeText(response.data.code).then(
			alert("Copied share code to clipboard!")
		);
	})
	.catch(function (error) {
		console.log(error);
	});

	return res;
};