import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import accountReducer from './account/index';
import navigationReducer from './navigation/index';
import canvasReducer from './canvas/index';
import deviceReducer from './device/index';

const rootReducer = combineReducers({
    account: accountReducer,
    navigation: navigationReducer,
    canvas: canvasReducer,
    device: deviceReducer
});

const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f
    )
  );

export default store;


// reference: https://github.com/codyseibert/youtube/blob/master/react-redux-thunk-example/src/store.js