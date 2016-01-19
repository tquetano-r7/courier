// polyfills
import 'Blob-polyfill';
import 'FormData-polyfill';

// local imports
import Courier from './Courier';
import {
    isObject
} from './utils';

let defaults;

/**
 * returns an empty object if parameter is falsy
 *
 * @param {*} obj
 * @returns {Object}
 */
const coalesceObject = (obj) => {
    return obj || {};
};

/**
 * creates new Courier object for request
 *
 * @returns {Courier}
 */
const createCourier = (options) => {
    let newOptions;

    if (isObject(options) || isObject(defaults)) {
        options = coalesceObject(options);
        defaults = coalesceObject(defaults);

        newOptions = Object.assign({}, defaults, options);
    }

    return new Courier(newOptions);
};

/**
 * sets the defaults that will be used in future new Couriers
 *
 * @param {Object} newDefaults
 */
export const setCourierDefaults = (newDefaults = {}) => {
    defaults = Object.assign(defaults || {}, newDefaults);
};

export default createCourier;