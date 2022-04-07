import { createAction } from '@reduxjs/toolkit';

const SetView = {
	initialState: {},
	action: createAction('navigation/SetView'),
	reducers(state, { payload }) {
		state.currentView = payload;
	},
};

export default SetView;
