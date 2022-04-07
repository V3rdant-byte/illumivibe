import axios from 'axios';

import store from '../../store';
import { SetEffectList } from '../../store/canvas';

export const EffectQuery = (tags) => {
	const state = store.getState();
	const bearer = state.account === undefined ? '' : state.account.accessToken;

    var data = JSON.stringify(tags);

	var config = {
		method: 'post',
		url: 'https://illumivibe.cf/api/user/light-effect/query',
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
        res=response;
		
		// clone and update store to trigger re-render
		const copyeffectlist = [...response.data.lighteffects];
		store.dispatch(SetEffectList.action(copyeffectlist));
	})
	.catch(function (error) {
		console.log(error);
	});

	return res;
};