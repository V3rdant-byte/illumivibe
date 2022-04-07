import { createAction } from '@reduxjs/toolkit';

const SetPattern = {
	initialState: {},
	action: createAction('canvas/SetPattern'),
	reducers(state, { payload }) {
    	state.currentPattern = payload;
  	},
};

export default SetPattern;
