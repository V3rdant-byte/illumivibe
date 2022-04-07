import { createAction } from '@reduxjs/toolkit';

const SetDeviceList = {
	initialState: {},
	action: createAction('device/SetDeviceList'),
	reducers(state, { payload }) {
		state.deviceList = payload;
	},
};

export default SetDeviceList;
