import { createAction } from '@reduxjs/toolkit';

const SetEffect = {
	initialState: {},
	action: createAction('canvas/SetEffect'),
	reducers(state, { payload }) {
    	state.currentEffect = payload;
  	},
};

export default SetEffect;
