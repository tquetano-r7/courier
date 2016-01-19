'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _CourierBody = require('./CourierBody');

var _CourierBody2 = _interopRequireDefault(_CourierBody);

var _CourierHeaders = require('./CourierHeaders');

var _CourierHeaders2 = _interopRequireDefault(_CourierHeaders);

var _CourierRequest = require('./CourierRequest');

var _CourierRequest2 = _interopRequireDefault(_CourierRequest);

var _CourierResponse = require('./CourierResponse');

var _CourierResponse2 = _interopRequireDefault(_CourierResponse);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * default options for Courier
 */
var DEFAULT_COURIER_OPTIONS = {
    cache: 'default',
    credentials: 'omit',
    data: null,
    dataType: 'json',
    headers: new _CourierHeaders2.default(),
    method: 'GET',
    password: null,
    queryStrings: [],
    plugins: [],
    referrer: null,
    type: 'json',
    url: null,
    username: null
};

/**
 * performs the XHR request
 *
 * @param {CourierRequest|string} input
 * @param {Object} init
 * @returns {Promise}
 */
var performRequest = function performRequest(input, init) {
    return new Promise(function (resolve, reject) {
        var request = (0, _utils.isPrototypeOfDataType)(input, _CourierRequest2.default) && !init ? input : new _CourierRequest2.default(input, init);

        var xhr = new XMLHttpRequest();

        xhr.onload = function () {
            var status = xhr.status === 1223 ? 204 : xhr.status;

            if (status < 100 || status > 599) {
                reject(new TypeError('Network request failed'));

                return;
            }

            var options = {
                cache: init.cache,
                headers: headers(xhr),
                mode: init.mode,
                status: status,
                statusText: xhr.statusText,
                url: (0, _utils.xhrResponseURL)(xhr)
            };
            var body = 'response' in xhr ? xhr.response : xhr.responseText;

            resolve(new _CourierResponse2.default(body, options));
        };

        xhr.onerror = function () {
            reject(new TypeError('Network request failed'));
        };

        if (request.cache === 'no-cache') {
            var curTime = new Date().getTime();

            request.url += (/\?/.test(request.url) ? '&' : '?') + 'preventCache=' + curTime;
        }

        xhr.open(request.method, request.url, true, request.username, request.password);

        if (request.credentials === 'include') {
            xhr.withCredentials = true;
        }

        if ('responseType' in xhr && _utils.support.blob) {
            xhr.responseType = 'blob';
        }

        request.headers.forEach(function (value, name) {
            xhr.setRequestHeader(name, value);
        });

        xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    });
};

/**
 * gets headers from XHR and converts them into CourierHeaders
 *
 * @param {Object} xhr
 * @returns {CourierHeaders}
 */
var headers = function headers(xhr) {
    var pairs = xhr.getAllResponseHeaders().trim().split('\n');

    var head = new _CourierHeaders2.default();

    pairs.forEach(function (header) {
        var split = header.trim().split(':');
        var key = split.shift().trim();
        var value = split.join(':').trim();

        head.append(key, value);
    });

    return head;
};

var Courier = function () {
    /**
     * sets up parameters for Courier request
     *
     * @param {Object} options
     * @returns {Courier}
     */

    function Courier() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Courier);

        var thisOptions = (0, _utils.deepExtend)({}, DEFAULT_COURIER_OPTIONS, options);

        (0, _utils.setNonEnumerable)(this, '_cache', thisOptions.cache);
        (0, _utils.setNonEnumerable)(this, '_data', thisOptions.data);
        (0, _utils.setNonEnumerable)(this, '_dataType', thisOptions.dataType);
        (0, _utils.setNonEnumerable)(this, '_credentials', thisOptions.credentials);
        (0, _utils.setNonEnumerable)(this, '_headers', thisOptions.headers);
        (0, _utils.setNonEnumerable)(this, '_method', thisOptions.method);
        (0, _utils.setNonEnumerable)(this, '_mode', thisOptions.mode);
        (0, _utils.setNonEnumerable)(this, '_password', thisOptions.password);
        (0, _utils.setNonEnumerable)(this, '_plugins', thisOptions.plugins);
        (0, _utils.setNonEnumerable)(this, '_queryStrings', thisOptions.queryStrings);
        (0, _utils.setNonEnumerable)(this, '_type', thisOptions.type);
        (0, _utils.setNonEnumerable)(this, '_url', thisOptions.url);
        (0, _utils.setNonEnumerable)(this, '_username', thisOptions.username);

        return this;
    }

    /**
     * sets basic authentication credentials for request
     *
     * @param {string} username
     * @param {string} password
     * @returns {Courier}
     */

    _createClass(Courier, [{
        key: 'auth',
        value: function auth(username, password) {
            this._password = password;
            this._username = username;

            return this;
        }

        /**
         * sets cache type for request
         * valid types: default, no-store, reload, no-cache, force-cache, only-if-cached
         *
         * @param {string} cacheType
         * @returns {Courier}
         */

    }, {
        key: 'cache',
        value: function cache() {
            var cacheType = arguments.length <= 0 || arguments[0] === undefined ? 'default' : arguments[0];

            this._cache = cacheType;

            return this;
        }

        /**
         * sets credentials type for request
         * valid types: omit, same-origin, include
         *
         * @param {string} creds
         * @returns {Courier}
         */

    }, {
        key: 'credentials',
        value: function credentials() {
            var creds = arguments.length <= 0 || arguments[0] === undefined ? 'include' : arguments[0];

            this._credentials = creds;

            return this;
        }

        /**
         * sets data to be passed in request body
         * if property is an object, treats all key: value pairs as data to be added
         *
         * @param {string|Object} property
         * @param {*} value
         * @returns {Courier}
         */

    }, {
        key: 'data',
        value: function data(property, value) {
            var dataToAdd = {};

            if (value === void 0) {
                if ((0, _utils.isPrototypeOfDataType)(property, FormData) || (0, _utils.isPrototypeOfDataType)(property, Blob)) {
                    dataToAdd = property;
                } else {
                    Object.getOwnPropertyNames(property).forEach(function (name) {
                        dataToAdd[name] = property[name];
                    });
                }
            } else {
                dataToAdd[property] = value;
            }

            if (Object.getOwnPropertyNames(dataToAdd).length) {
                this._data = Object.assign(this._data || {}, dataToAdd);
            }

            return this;
        }

        /**
         * sets dataFilter function to be executed prior to parsing
         * fn will accept one parameter, the unparsed data returned in response
         *
         * @param {Function} fn
         * @returns {Courier}
         */

    }, {
        key: 'dataFilter',
        value: function dataFilter(fn) {
            this._dataFilter = fn;

            return this;
        }

        /**
         * sets data type of body in request
         *
         * @param {string} typeString
         * @returns {Courier}
         */

    }, {
        key: 'dataType',
        value: function dataType(typeString) {
            this._dataType = typeString;

            return this;
        }

        /**
         * sets method of request to DELETE for url
         *
         * @param {string} url
         * @returns {Courier}
         */

    }, {
        key: 'delete',
        value: function _delete(url) {
            this._method = 'DELETE';
            this._url = url;

            return this;
        }

        /**
         * sets method of request to GET for url
         *
         * @param {string} url
         * @returns {Courier}
         */

    }, {
        key: 'get',
        value: function get(url) {
            this._method = 'GET';
            this._url = url;

            return this;
        }

        /**
         * sets method of request to HEAD for url
         *
         * @param {string} url
         * @returns {Courier}
         */

    }, {
        key: 'head',
        value: function head(url) {
            this._method = 'HEAD';
            this._url = url;

            return this;
        }

        /**
         * Sets header for request
         * if header is Object, treats each key: value pair as header to be added
         *
         * @param {string|Object} header
         * @param {string} value
         * @returns {Courier}
         */

    }, {
        key: 'headers',
        value: function headers(header, value) {
            var _this = this;

            if ((typeof header === 'undefined' ? 'undefined' : _typeof(header)) === 'object' && !!header) {
                Object.getOwnPropertyNames(header).forEach(function (name) {
                    var value = (0, _utils.normalizeValue)(header[name]);

                    name = (0, _utils.normalizeValue)(name);

                    _this._headers.append(name, value);
                });
            } else {
                header = (0, _utils.normalizeValue)(header);
                value = (0, _utils.normalizeValue)(value);

                this._headers.append(header, value);
            }

            return this;
        }

        /**
         * sets mode of request
         * valid values: same-origin, no-cors, cors
         *
         * @param {string}modeString
         * @returns {Courier}
         */

    }, {
        key: 'mode',
        value: function mode() {
            var modeString = arguments.length <= 0 || arguments[0] === undefined ? 'same-origin' : arguments[0];

            this._mode = modeString;

            return this;
        }

        /**
         * sets method of request to OPTIONS for url
         *
         * @param {string} url
         * @returns {Courier}
         */

    }, {
        key: 'options',
        value: function options(url) {
            this._method = 'OPTIONS';
            this._url = url;

            return this;
        }

        /**
         * sets method of request to PATCH for url
         *
         * @param {string} url
         * @returns {Courier}
         */

    }, {
        key: 'patch',
        value: function patch(url) {
            this._method = 'PATCH';
            this._url = url;

            return this;
        }

        /**
         * sets method of request to POST for url
         *
         * @param {string} url
         * @returns {Courier}
         */

    }, {
        key: 'post',
        value: function post(url) {
            this._method = 'POST';
            this._url = url;

            return this;
        }

        /**
         * sets method of request to PUT for url
         *
         * @param {string} url
         * @returns {Courier}
         */

    }, {
        key: 'put',
        value: function put(url) {
            this._method = 'PUT';
            this._url = url;

            return this;
        }

        /**
         * sets querystrings to be appended to URL on request
         * if property is an object, treats each key: value pair as a querystring to be added
         * 
         * @param {string|Object} property
         * @param {string|number} value
         * @returns {Courier}
         */

    }, {
        key: 'query',
        value: function query(property, value) {
            var _this2 = this;

            if ((typeof property === 'undefined' ? 'undefined' : _typeof(property)) === 'object' && !!property) {
                Object.getOwnPropertyNames(property).forEach(function (name) {
                    var value = (0, _utils.normalizeValue)(property[name]);

                    name = (0, _utils.normalizeValue)(name);

                    _this2._queryStrings.push(name + '=' + value);
                });
            } else {
                property = (0, _utils.normalizeValue)(property);
                value = (0, _utils.normalizeValue)(value);

                this._queryStrings.push(property + '=' + value);
            }

            return this;
        }

        /**
         * performs the request, executing callback passed to it upon completion
         * callback receives three parameters: data, error, and the full response
         * 
         * @param {Function} callback
         */

    }, {
        key: 'send',
        value: function send(callback) {
            var _this3 = this;

            var newHeaders = new _CourierHeaders2.default(this._headers);

            var data = undefined;

            if (this._data) {
                switch (this._dataType) {
                    case 'blob':
                        data = new Blob([JSON.stringify(this._data)], {
                            type: 'application/json'
                        });

                        break;

                    case 'json':
                        data = JSON.stringify(this._data);
                        break;

                    case 'form':
                        data = new FormData();

                        for (var key in this._data) {
                            data.append(key, this._data[key]);
                        }

                        break;

                    case 'string':
                        data = String(this._data);
                        break;

                    default:
                        data = this._data;
                        break;
                }
            }

            if (this._queryStrings.length) {
                this._url += '?';

                this._queryStrings.forEach(function (queryString) {
                    _this3._url += queryString + '&';
                });

                this._url = this._url.slice(0, -1);
            }

            var requestInit = {
                body: data ? new _CourierBody2.default(data) : null,
                cache: this._cache,
                credentials: this._credentials,
                headers: newHeaders,
                method: this._method,
                mode: this._mode || (window.location.hostname === (0, _utils.getHostname)(this._url) ? 'same-origin' : 'cors'),
                password: this._password,
                url: this._url,
                username: this._username
            };

            this._plugins.forEach(function (plugin) {
                requestInit = plugin(requestInit) || requestInit;
            });

            var finalURL = requestInit.url;

            var request = new _CourierRequest2.default(finalURL, requestInit);

            var error = null;
            var rawResponse = undefined;

            performRequest(request, requestInit).then(function (response) {
                rawResponse = response;

                if (!response.ok) {
                    error = {
                        status: response.status,
                        statusText: response.statusText
                    };

                    return null;
                }

                (response._bodyBlob ? (0, _utils.readBlobAsText)(response._bodyBlob) : Promise.resolve(response._bodyText)).then(function (text) {
                    rawResponse.responseText = text;

                    switch (_this3._type) {
                        case 'arrayBuffer':
                            return response.arrayBuffer(_this3._dataFilter);
                        case 'blob':
                            return response.blob(_this3._dataFilter);
                        case 'json':
                            return response.json(_this3._dataFilter);
                        default:
                            return response.text(_this3._dataFilter);
                    }
                }).then(function (data) {
                    callback(data, error, rawResponse);
                });
            });
        }

        /**
         * sets the type of response expected
         * valid values: arraybuffer, blob, json
         * if other values are passed, response is parsed as text
         *
         * @param {string} typeString
         * @returns {Courier}
         */

    }, {
        key: 'type',
        value: function type() {
            var typeString = arguments.length <= 0 || arguments[0] === undefined ? 'json' : arguments[0];

            this._type = typeString;

            return this;
        }

        /**
         * adds function plugins to use as part of the request
         *
         * @param {Function} fn
         * @returns {Courier}
         */

    }, {
        key: 'use',
        value: function use(fn) {
            this._plugins.push(fn);

            return this;
        }
    }]);

    return Courier;
}();

exports.default = Courier;
module.exports = exports['default'];