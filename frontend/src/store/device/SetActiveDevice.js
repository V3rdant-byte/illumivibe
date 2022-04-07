import { createAction } from '@reduxjs/toolkit';

const SetActiveDevice = {
	initialState: {},
	action: createAction('device/SetActiveDevice'),
	reducers(state, { payload }) {
		state.activeDevice = payload;
	},
};

export default SetActiveDevice;
