import axios from 'axios';

import store from '../../store';

import { SetActiveDevice } from '../../store/device';

export const ActivateDevice = (device) => {
	const state = store.getState();
	const bearer = state.account === undefined ? '' : state.account.accessToken;

	var config = {
		method: 'put',
		url: 'https://illumivibe.cf/api/user/device/' + device.id + "/set-active",
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
		
		// clone and update store to trigger re-render
		const copy = {
			name: device.name,
			id: device.id
		};
		store.dispatch(SetActiveDevice.action(copy));
	})
	.catch(function (error) {
		console.log(error);
	});

	return res;
};