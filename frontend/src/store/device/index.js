import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper';
import SetActiveDevice from './SetActiveDevice';
import SetDeviceList from './SetDeviceList';

export default buildSlice('navigation', [SetActiveDevice, SetDeviceList], {
    activeDevice: {
        name: 'No device active',
        id: ''
    },
    deviceList: []
}).reducer;

export { default as SetActiveDevice } from './SetActiveDevice';
export { default as SetDeviceList } from './SetDeviceList';