import axios from 'axios';

import store from '../../store';

export const UploadToDevice = (effectId) => {
	const state = store.getState();
	const bearer = state.account === undefined ? '' : state.account.accessToken;
	const currentActiveDevice = state.device.activeDevice.name;

	var config = {
		method: 'put',
		url: 'https://illumivibe.cf/api/user/device/current-active/light-effect?lightEffectId=' + effectId,
		headers: { 
			'Content-Type': 'application/json', 
			'Accept': 'application/json',
			'Authorization': bearer
		}
	};
	
    let res = '';
	axios(config)
	.then(function (response) {
		console.log("[UploadEffect]: successful res ", response);
        res=response;
		alert("Successfully uploaded effect to " + currentActiveDevice);
	})
	.catch(function (error) {
		console.log(error);
	});

	return res;
};