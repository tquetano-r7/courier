'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('./utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CourierHeaders = function () {
    /**
     * sets headers map based on headers passed
     *
     * @param {CourierHeaders|Object} headers
     */

    function CourierHeaders(headers) {
        var _this = this;

        _classCallCheck(this, CourierHeaders);

        this.map = {};

        if (headers instanceof CourierHeaders) {
            headers.forEach(function (value, name) {
                _this.append(name, value);
            });
        } else if (headers) {
            Object.getOwnPropertyNames(headers).forEach(function (name) {
                _this.append(name, headers[name]);
            });
        }
    }

    /**
     *
     *
     * @param {string} name
     * @param {*} value
     */

    _createClass(CourierHeaders, [{
        key: 'append',
        value: function append(name, value) {
            name = (0, _utils.normalizeName)(name);
            value = (0, _utils.normalizeValue)(value);

            var list = this.map[name];

            if (!list) {
                list = [];

                this.map[name] = list;
            }

            list.push(value);
        }

        /**
         * removes header from map
         *
         * @param {string} name
         */

    }, {
        key: 'delete',
        value: function _delete(name) {
            name = (0, _utils.normalizeName)(name);

            delete this.map[name];
        }

        /**
         * loops over map and executes callback function
         *
         * @param {Function} callback
         */

    }, {
        key: 'forEach',
        value: function forEach(callback) {
            var _this2 = this;

            Object.getOwnPropertyNames(this.map).forEach(function (name) {
                var map = _this2.map[name];

                map.forEach(function (value) {
                    callback.call(_this2, value, name, map);
                });
            });
        }

        /**
         * gets specific header value in map
         *
         * @param {string} name
         * @returns {*}
         */

    }, {
        key: 'get',
        value: function get(name) {
            name = (0, _utils.normalizeName)(name);

            var values = this.map[name];

            return values ? values[0] : null;
        }

        /**
         * gets specific header array in map
         *
         * @param {string} name
         * @returns {Array}
         */

    }, {
        key: 'getAll',
        value: function getAll(name) {
            name = (0, _utils.normalizeName)(name);

            return this.map[name] || [];
        }

        /**
         * determines if the header exists in the map
         *
         * @param {string} name
         * @returns {boolean}
         */

    }, {
        key: 'has',
        value: function has(name) {
            name = (0, _utils.normalizeName)(name);

            return this.map.hasOwnProperty(name);
        }

        /**
         * sets specific header in map
         *
         * @param {string} name
         * @param {*} value
         */

    }, {
        key: 'set',
        value: function set(name, value) {
            name = (0, _utils.normalizeName)(name);
            value = (0, _utils.normalizeName)(value);

            this.map[name] = [value];
        }
    }]);

    return CourierHeaders;
}();

exports.default = CourierHeaders;
module.exports = exports['default'];