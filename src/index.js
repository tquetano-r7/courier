import Courier from './Courier';
import {
    isObject
} from './utils';
/**
 * creates new Courier object for request
 *
 * @returns {Courier}
 */

let defaults;

const coalesceObject = (obj) => {
    return obj || {};
};

const createCourier = (options) => {
    let newOptions;

    if (isObject(options) || isObject(defaults)) {
        options = coalesceObject(options);
        defaults = coalesceObject(defaults);

        newOptions = Object.assign(options, defaults);
    }

    return new Courier(newOptions);
};

export const setCourierDefaults = (newDefaults = {}) => {
    defaults = Object.assign(defaults || {}, newDefaults);
};

export default createCourier;