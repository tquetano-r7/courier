'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setCourierDefaults = undefined;

require('Blob-polyfill');

require('FormData-polyfill');

var _Courier = require('./Courier');

var _Courier2 = _interopRequireDefault(_Courier);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// local imports
// polyfills

var defaults = undefined;

/**
 * returns an empty object if parameter is falsy
 *
 * @param {*} obj
 * @returns {Object}
 */
var coalesceObject = function coalesceObject(obj) {
    return obj || {};
};

/**
 * creates new Courier object for request
 *
 * @returns {Courier}
 */
var createCourier = function createCourier(options) {
    var newOptions = undefined;

    if ((0, _utils.isObject)(options) || (0, _utils.isObject)(defaults)) {
        options = coalesceObject(options);
        defaults = coalesceObject(defaults);

        newOptions = (0, _utils.deepExtend)({}, defaults, options);
    }

    return new _Courier2.default(newOptions);
};

/**
 * sets the defaults that will be used in future new Couriers
 *
 * @param {Object} newDefaults
 */
var setCourierDefaults = exports.setCourierDefaults = function setCourierDefaults() {
    var newDefaults = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    defaults = Object.assign(defaults || {}, newDefaults);
};

exports.default = createCourier;