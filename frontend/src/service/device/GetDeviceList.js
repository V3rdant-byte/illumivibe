import axios from 'axios';

import store from '../../store';

import { SetDeviceList } from '../../store/device';

export const GetDeviceList = () => {
	const state = store.getState();
	const bearer = state.account === undefined ? '' : state.account.accessToken;
    
	var config = {
		method: 'get',
		url: 'https://illumivibe.cf/api/user/device/list',
		headers: { 
			'Content-Type': 'application/json', 
			'Accept': 'application/json',
			'Authorization': bearer
		}
	};
	
    let res = '';
	axios(config)
	.then(function (response) {
        res = response;

		// clone and update store to trigger re-render
		const copylist = [...response.data.devices];
		store.dispatch(SetDeviceList.action(copylist));
	})
	.catch(function (error) {
		console.log(error);
	});
    return res;
};