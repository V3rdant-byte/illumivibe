import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper';
import SetPattern from './SetPattern';
import SetEffect from './SetEffect';
import SetEffectList from './SetEffectList';
import SetCurrentId from './SetCurrentId';

// Patterns: static, shifting, flashing
// Effect {
//     name: string,
//     pattern: string,
//     tags: string[],
//     data: string[]
// }

export default buildSlice('canvas', [SetPattern, SetEffect, SetEffectList, SetCurrentId], {
    currentPattern: 'static',
    currentEffect: {
        name:'default'
    },
    currentEffectList: [],
    currentId: ''
}).reducer;

export { default as SetPattern } from './SetPattern';
export { default as SetEffect } from './SetEffect';
export { default as SetEffectList } from './SetEffectList';
export { default as SetCurrentId } from './SetCurrentId';