import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper';
import SetView from './SetView';

// views: main, home, canvas, device, effect-edit, music

export default buildSlice('navigation', [SetView], {
    currentView: 'main'
}).reducer;

export { default as SetView } from './SetView';