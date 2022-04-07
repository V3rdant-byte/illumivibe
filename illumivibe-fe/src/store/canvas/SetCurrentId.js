import { createAction } from '@reduxjs/toolkit';

const SetCurrentId = {
	initialState: {},
	action: createAction('canvas/SetCurrentId'),
	reducers(state, { payload }) {
    	state.currentId = payload;
  	},
};

export default SetCurrentId;
