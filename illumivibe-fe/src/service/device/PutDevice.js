import axios from 'axios';

import store from '../../store';
import { SetDeviceList } from '../../store/device';

export const PutDevice = (id, name) => {
	const state = store.getState();
	const bearer = state.account === undefined ? '' : state.account.accessToken;

    var data = JSON.stringify({
        "id": id,
        "name": name
    });

	var config = {
		method: 'put',
		url: 'https://illumivibe.cf/api/user/device/put',
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
		console.log("[Device] Registration successful: " + response);
        res=response;

		// clone and update store to trigger re-render
		const list = state.device.deviceList;
		let copylist = [];
		copylist.push(...list);
		const newDevice = {
			"id": id,
			"name": name
		};
		copylist.push(newDevice);
		store.dispatch(SetDeviceList.action(copylist));

		alert("Registration successful");
	})
	.catch(function (error) {
		console.log(error);
		alert("Registration failed");
	});

	return res;

};