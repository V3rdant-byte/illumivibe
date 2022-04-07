import { createAction } from '@reduxjs/toolkit';

const SetEffectList = {
	initialState: {},
	action: createAction('canvas/SetEffectList'),
	reducers(state, { payload }) {
    	state.currentEffectList = payload;
  	},
};

export default SetEffectList;
