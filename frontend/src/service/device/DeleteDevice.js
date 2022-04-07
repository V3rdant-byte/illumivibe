import axios from 'axios';

import store from '../../store';

import { GetDeviceList } from './GetDeviceList';

export const DeleteDevice = (id) => {
	const state = store.getState();
	const bearer = state.account === undefined ? '' : state.account.accessToken;

	var config = {
		method: 'delete',
		url: 'https://illumivibe.cf/api/user/device/' + id + "/remove",
		headers: { 
			'Content-Type': 'application/json', 
			'Accept': 'application/json',
			'Authorization': bearer
		}
	};
	
    let res = '';
	axios(config)
	.then(function (response) {
        res=response;
		GetDeviceList();
	})
	.catch(function (error) {
		console.log(error);
	});

	return res;
};