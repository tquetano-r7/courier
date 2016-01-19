(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("courier", [], factory);
	else if(typeof exports === 'object')
		exports["courier"] = factory();
	else
		root["courier"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.setCourierDefaults = undefined;
	
	__webpack_require__(2);
	
	__webpack_require__(3);
	
	var _Courier = __webpack_require__(4);
	
	var _Courier2 = _interopRequireDefault(_Courier);
	
	var _utils = __webpack_require__(6);
	
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
	
	        newOptions = Object.assign({}, defaults, options);
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

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Blob polyfill
	 * Original author: Eli Grey
	 * https://github.com/eligrey/Blob.js/
	 */
	
	window.URL = window.URL || window.webkitURL;
	
	try {
	    if (!window.Blob || !window.URL) {
	        throw 'Blob not supported.';
	    }
	
	    new Blob();
	} catch (e) {
	    (function () {
	        // Internally we use a BlobBuilder implementation to base Blob off of
	        // in order to support older browsers that only have BlobBuilder
	        var BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || function () {
	            // strings and regex
	            var file_ex_codes = ('NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR ' + 'NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR').split(' ');
	            var origin = /^[\w-]+:\/*\[?[\w\.:-]+\]?(?::[0-9]+)?/;
	
	            // window functions
	            var atob = window.atob;
	            var ArrayBuffer = window.ArrayBuffer;
	            var btoa = window.btoa;
	            var FileReaderSync = window.FileReaderSync;
	            var real_URL = window.URL || window.webkitURL || window;
	            var real_create_object_URL = real_URL.createObjectURL;
	            var real_revoke_object_URL = real_URL.revokeObjectURL;
	            var Uint8Array = window.Uint8Array;
	
	            // functions we'll use later
	            var get_class = function get_class(object) {
	                return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
	            };
	
	            var FakeBlobBuilder = function BlobBuilder() {
	                this.data = [];
	            };
	
	            var FakeBlob = function Blob(data, type, encoding) {
	                this.data = data;
	                this.size = data.length;
	                this.type = type;
	                this.encoding = encoding;
	            };
	
	            var FileException = function FileException(type) {
	                this.code = this[this.name = type];
	            };
	
	            var file_ex_code = file_ex_codes.length,
	                FBB_proto = FakeBlobBuilder.prototype,
	                FB_proto = FakeBlob.prototype,
	                URL = real_URL;
	
	            FakeBlob.fake = FB_proto.fake = true;
	
	            while (file_ex_code--) {
	                FileException.prototype[file_ex_codes[file_ex_code]] = file_ex_code + 1;
	            }
	
	            // Polyfill URL
	            if (!real_URL.createObjectURL) {
	                URL = window.URL = function (uri) {
	                    var uri_info = document.createElementNS('http://www.w3.org/1999/xhtml', 'a'),
	                        uri_origin = undefined;
	
	                    uri_info.href = uri;
	
	                    if (!('origin' in uri_info)) {
	                        if (uri_info.protocol.toLowerCase() === 'data:') {
	                            uri_info.origin = null;
	                        } else {
	                            uri_origin = uri.match(origin);
	                            uri_info.origin = uri_origin && uri_origin[1];
	                        }
	                    }
	
	                    return uri_info;
	                };
	            }
	
	            URL.createObjectURL = function (blob) {
	                var type = blob.type,
	                    data_URI_header = undefined;
	
	                if (type === null) {
	                    type = 'application/octet-stream';
	                }
	
	                if (blob instanceof FakeBlob) {
	                    data_URI_header = 'data:' + type;
	
	                    if (blob.encoding === 'base64') {
	                        return data_URI_header + ';base64,' + blob.data;
	                    } else if (blob.encoding === 'URI') {
	                        return data_URI_header + ',' + decodeURIComponent(blob.data);
	                    }if (btoa) {
	                        return data_URI_header + ';base64,' + btoa(blob.data);
	                    } else {
	                        return data_URI_header + ',' + encodeURIComponent(blob.data);
	                    }
	                } else if (real_create_object_URL) {
	                    return real_create_object_URL.call(real_URL, blob);
	                }
	            };
	
	            URL.revokeObjectURL = function (object_URL) {
	                if (object_URL.substring(0, 5) !== 'data:' && real_revoke_object_URL) {
	                    real_revoke_object_URL.call(real_URL, object_URL);
	                }
	            };
	
	            FBB_proto.append = function (data /*, endings*/) {
	                var bb = this.data;
	
	                // decode data to a binary string
	                if (Uint8Array && (data instanceof ArrayBuffer || data instanceof Uint8Array)) {
	                    var str = '',
	                        buf = new Uint8Array(data);
	
	                    for (var i = 0, buf_len = buf.length; i < buf_len; i++) {
	                        str += String.fromCharCode(buf[i]);
	                    }
	
	                    bb.push(str);
	                } else if (get_class(data) === 'Blob' || get_class(data) === 'File') {
	                    if (FileReaderSync) {
	                        var fr = new FileReaderSync();
	
	                        bb.push(fr.readAsBinaryString(data));
	                    } else {
	                        // async FileReader won't work as BlobBuilder is sync
	                        throw new FileException('NOT_READABLE_ERR');
	                    }
	                } else if (data instanceof FakeBlob) {
	                    if (data.encoding === 'base64' && atob) {
	                        bb.push(atob(data.data));
	                    } else if (data.encoding === 'URI') {
	                        bb.push(decodeURIComponent(data.data));
	                    } else if (data.encoding === 'raw') {
	                        bb.push(data.data);
	                    }
	                } else {
	                    if (typeof data !== 'string') {
	                        data += ''; // convert unsupported types to strings
	                    }
	
	                    // decode UTF-16 to binary string
	                    bb.push(unescape(encodeURIComponent(data)));
	                }
	            };
	
	            FBB_proto.getBlob = function (type) {
	                if (!arguments.length) {
	                    type = null;
	                }
	
	                return new FakeBlob(this.data.join(''), type, 'raw');
	            };
	
	            FBB_proto.toString = function () {
	                return '[object BlobBuilder]';
	            };
	
	            FB_proto.slice = function (start, end, type) {
	                var args = arguments.length;
	
	                if (args < 3) {
	                    type = null;
	                }
	
	                return new FakeBlob(this.data.slice(start, args > 1 ? end : this.data.length), type, this.encoding);
	            };
	
	            FB_proto.toString = function () {
	                return '[object Blob]';
	            };
	
	            FB_proto.close = function () {
	                this.size = 0;
	                delete this.data;
	            };
	
	            return FakeBlobBuilder;
	        };
	
	        window.Blob = function (blobParts, options) {
	            var type = options ? options.type || '' : '';
	
	            var builder = new BlobBuilder();
	
	            if (blobParts) {
	                for (var i = 0, len = blobParts.length; i < len; i++) {
	                    if (Uint8Array && blobParts[i] instanceof Uint8Array) {
	                        builder.append(blobParts[i].buffer);
	                    } else {
	                        builder.append(blobParts[i]);
	                    }
	                }
	            }
	
	            var blob = builder.getBlob(type);
	
	            if (!blob.slice && blob.webkitSlice) {
	                blob.slice = blob.webkitSlice;
	            }
	
	            return blob;
	        };
	
	        var getPrototypeOf = Object.getPrototypeOf || function (object) {
	            return object.__proto__;
	        };
	
	        window.Blob.prototype = getPrototypeOf(new window.Blob());
	    })();
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * FormData polyfill for XMLHttpRequest2
	 * Original author: Rob Wu
	 * https://gist.github.com/Rob--W/8b5adedd84c0d36aba64
	 */
	
	if (!window.FormData || !window.FormData.prototype.append) {
	    (function () {
	        var ___send$rw = XMLHttpRequest.prototype.send;
	
	        var FormData = function FormData() {
	            // Force a Constructor
	            if (!(this instanceof FormData)) {
	                return new FormData();
	            }
	
	            // Generate a random boundary - This must be unique with respect to the form's contents.
	            this.boundary = '------RWWorkerFormDataBoundary' + Math.random().toString(36);
	
	            var internal_data = this.data = [];
	
	            /**
	             * Internal method.
	             * @param inp String | ArrayBuffer | Uint8Array  Input
	             */
	            this.__append = function (inp) {
	                if (typeof inp === 'string') {
	                    for (var i = 0, len = inp.length; i < len; ++i) {
	                        internal_data.push(inp.charCodeAt(i) & 0xff);
	                    }
	
	                    /*If ArrayBuffer or typed array */
	                } else if (inp && inp.byteLength) {
	                        /* If ArrayBuffer, wrap in view */
	                        if (!('byteOffset' in inp)) {
	                            inp = new Uint8Array(inp);
	                        }
	
	                        for (var i = 0, len = inp.byteLength; i < len; ++i) {
	                            internal_data.push(inp[i] & 0xff);
	                        }
	                    }
	            };
	        };
	
	        XMLHttpRequest.prototype.send = function (data) {
	            if (data instanceof FormData) {
	                if (!data.__endedMultipart) {
	                    data.__append('--' + data.boundary + '--\r\n');
	                }
	
	                data.__endedMultipart = true;
	
	                this.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + data.boundary);
	
	                data = new Uint8Array(data.data);
	            }
	
	            // Invoke original XHR.send
	            return ___send$rw.call(this, data);
	        };
	
	        /**
	         * @param {string} name
	         * @param {String|Blob|File|Array|ArrayBuffer} value
	         * @param {string} filename
	         **/
	        FormData.prototype.append = function (name, value, filename) {
	            if (this.__endedMultipart) {
	                // Truncate the closing boundary
	                this.data.length -= this.boundary.length + 6;
	                this.__endedMultipart = false;
	            }
	
	            if (arguments.length < 2) {
	                throw new SyntaxError('Not enough arguments');
	            }
	
	            var part = '--' + this.boundary + '\r\nContent-Disposition: form-data; name="' + name + '"';
	
	            if (value instanceof File || value instanceof Blob) {
	                /* eslint-disable */
	                return this.append(name, new Uint8Array(new FileReaderSync().readAsArrayBuffer(value)), filename || value.name);
	                /* eslint-enable */
	            } else if (typeof value.byteLength === 'number') {
	                    // Duck-typed typed array or array buffer
	                    part += '; filename="' + (filename || 'blob').replace(/"/g, '%22') + '"\r\n';
	                    part += 'Content-Type: application/octet-stream\r\n\r\n';
	
	                    this.__append(part);
	                    this.__append(value);
	
	                    part = '\r\n';
	                } else {
	                    part += '\r\n\r\n' + value + '\r\n';
	                }
	
	            this.__append(part);
	        };
	
	        // Export variable to the global scope
	        window.FormData = FormData;
	    })();
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _CourierBody = __webpack_require__(5);
	
	var _CourierBody2 = _interopRequireDefault(_CourierBody);
	
	var _CourierHeaders = __webpack_require__(7);
	
	var _CourierHeaders2 = _interopRequireDefault(_CourierHeaders);
	
	var _CourierRequest = __webpack_require__(8);
	
	var _CourierRequest2 = _interopRequireDefault(_CourierRequest);
	
	var _CourierResponse = __webpack_require__(9);
	
	var _CourierResponse2 = _interopRequireDefault(_CourierResponse);
	
	var _utils = __webpack_require__(6);
	
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
	
	        var thisOptions = Object.assign(DEFAULT_COURIER_OPTIONS, options);
	
	        (0, _utils.setNonEnumerable)(this, '_cache', thisOptions.cache);
	        (0, _utils.setNonEnumerable)(this, '_data', thisOptions.data);
	        (0, _utils.setNonEnumerable)(this, '_dataType', thisOptions.dataType);
	        (0, _utils.setNonEnumerable)(this, '_credentials', thisOptions.credentials);
	        (0, _utils.setNonEnumerable)(this, '_headers', thisOptions.headers);
	        (0, _utils.setNonEnumerable)(this, '_method', thisOptions.method);
	        (0, _utils.setNonEnumerable)(this, '_mode', thisOptions.mode);
	        (0, _utils.setNonEnumerable)(this, '_password', thisOptions.password);
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
	                username: this._username
	            };
	
	            var request = new _CourierRequest2.default(this._url, requestInit);
	
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
	    }]);
	
	    return Courier;
	}();
	
	exports.default = Courier;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _utils = __webpack_require__(6);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * creates new body, either for Request or Response
	 *
	 * @param {string|Blob|FormData} body
	 */
	var _initBody = function _initBody(body) {
	    (0, _utils.setNonEnumerable)(this, '_bodyInit', body);
	
	    if (typeof body === 'string') {
	        (0, _utils.setNonEnumerable)(this, '_bodyText', body);
	    } else if (_utils.support.blob && (0, _utils.isPrototypeOfDataType)(body, Blob)) {
	        (0, _utils.setNonEnumerable)(this, '_bodyBlob', body);
	    } else if (_utils.support.formData && (0, _utils.isPrototypeOfDataType)(body, FormData)) {
	        (0, _utils.setNonEnumerable)(this, '_bodyFormData', body);
	    } else if (!body) {
	        (0, _utils.setNonEnumerable)(this, '_bodyText', '');
	    } else if (_utils.support.arrayBuffer && (0, _utils.isPrototypeOfDataType)(body, ArrayBuffer)) {
	        // Only support ArrayBuffers for POST method.
	        // Receiving ArrayBuffers happens via Blobs, instead.
	    } else {
	            throw new TypeError('Unsupported BodyInit type');
	        }
	};
	
	var CourierBody =
	/**
	 * creates new CourierBody object, used for both requests and responses
	 *
	 * @returns {CourierBody}
	 */
	function CourierBody() {
	    _classCallCheck(this, CourierBody);
	
	    this.bodyUsed = false;
	
	    (0, _utils.setNonEnumerable)(this, '_initBody', _initBody);
	
	    return this;
	};
	
	if (_utils.support.blob) {
	    /**
	     * parses blob and returns promise containing data of parsed blob
	     * if dataFilter is provided in request then returns callback of dataFilter
	     *
	     * @param {Function} dataFilter
	     * @returns {Promise}
	     */
	    CourierBody.prototype.blob = function (dataFilter) {
	        var rejected = (0, _utils.consumed)(this);
	
	        if (rejected) {
	            return rejected;
	        }
	
	        if (this._bodyBlob) {
	            var bodyBlobPromise = Promise.resolve(this._bodyBlob);
	
	            if ((0, _utils.isFunction)(dataFilter)) {
	                return bodyBlobPromise.then(dataFilter);
	            }
	
	            return bodyBlobPromise;
	        } else if (this._bodyFormData) {
	            throw new Error('could not read FormData body as blob');
	        } else {
	            if ((0, _utils.isFunction)(dataFilter)) {
	                this._bodyText = dataFilter(this._bodyText);
	            }
	
	            return Promise.resolve(new Blob([this._bodyText]));
	        }
	    };
	
	    /**
	     * parses arraybuffer and returns promise containing data of parsed arraybuffer
	     * if dataFilter is provided in request then returns callback of dataFilter
	     *
	     * @param {Function} dataFilter
	     * @returns {Promise}
	     */
	    CourierBody.prototype.arrayBuffer = function (dataFilter) {
	        return this.blob(dataFilter).then(_utils.readBlobAsArrayBuffer);
	    };
	
	    /**
	     * parses text and returns promise containing data of parsed text
	     * if dataFilter is provided in request then returns callback of dataFilter
	     *
	     * @param {Function} dataFilter
	     * @returns {Promise}
	     */
	    CourierBody.prototype.text = function (dataFilter) {
	        var rejected = (0, _utils.consumed)(this);
	
	        if (rejected) {
	            return rejected;
	        }
	
	        if (this._bodyBlob) {
	            var blobText = (0, _utils.readBlobAsText)(this._bodyBlob);
	
	            if ((0, _utils.isFunction)(dataFilter)) {
	                return blobText.then(dataFilter);
	            }
	
	            return blobText;
	        } else if (this._bodyFormData) {
	            throw new Error('could not read FormData body as text');
	        } else {
	            if ((0, _utils.isFunction)(dataFilter)) {
	                this._bodyText = dataFilter(this._bodyText);
	            }
	
	            return Promise.resolve(this._bodyText);
	        }
	    };
	} else {
	    /**
	     * parses text and returns promise containing data of parsed text
	     * if dataFilter is provided in request then returns callback of dataFilter
	     *
	     * @param {Function} dataFilter
	     * @returns {Promise}
	     */
	    CourierBody.prototype.text = function (dataFilter) {
	        var rejected = (0, _utils.consumed)(this);
	
	        if (rejected) {
	            return rejected;
	        }
	
	        if ((0, _utils.isFunction)(dataFilter)) {
	            this._bodyText = dataFilter(this._bodyText);
	        }
	
	        return Promise.resolve(this._bodyText);
	    };
	}
	
	/**
	 * parses formData and returns promise containing data of parsed formData
	 * if dataFilter is provided in request then returns callback of dataFilter
	 *
	 * @param {Function} dataFilter
	 * @returns {Promise}
	 */
	if (_utils.support.formData) {
	    CourierBody.prototype.formData = function (dataFilter) {
	        return this.text(dataFilter).then(_utils.decode);
	    };
	}
	
	/**
	 * parses json and returns promise containing data of parsed json
	 * if dataFilter is provided in request then returns callback of dataFilter
	 *
	 * @param {Function} dataFilter
	 * @returns {Promise}
	 */
	CourierBody.prototype.json = function (dataFilter) {
	    return this.text(dataFilter).then(JSON.parse);
	};
	
	exports.default = CourierBody;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * valid request methods
	 */
	var HTTP_METHODS = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];
	
	var toString = Object.prototype.toString;
	
	/**
	 * determines if Blob is supported and can be created
	 *
	 * @returns {boolean}
	 */
	var canCreateNewBlob = exports.canCreateNewBlob = function canCreateNewBlob() {
	    try {
	        new Blob();
	
	        return true;
	    } catch (ex) {
	        return false;
	    }
	};
	
	/**
	 * determines if body has already been read, and if so returns a rejected promise
	 *
	 * @param {*} body
	 * @returns {Promise|undefined}
	 */
	var consumed = exports.consumed = function consumed(body) {
	    if (body.bodyUsed) {
	        return Promise.reject(new TypeError('Already read'));
	    }
	
	    body.bodyUsed = true;
	};
	
	/**
	 * translates the body returned into proper FormData
	 *
	 * @param {*}body
	 * @returns {FormData}
	 */
	var decode = exports.decode = function decode(body) {
	    var form = new FormData();
	
	    body.trim().split('&').forEach(function (bytes) {
	        var split = bytes.split('=');
	        var name = split.shift().replace(/\+/g, ' ');
	        var value = split.join('=').replace(/\+/g, ' ');
	
	        form.append(decodeURIComponent(name), decodeURIComponent(value));
	    });
	
	    return form;
	};
	
	/**
	 * reads the result and returns a Promise either rejected or resolved based on results
	 *
	 * @param {FileReader} reader
	 * @returns {Promise}
	 */
	var fileReaderReady = exports.fileReaderReady = function fileReaderReady(reader) {
	    return new Promise(function (resolve, reject) {
	        reader.onload = function () {
	            resolve(reader.result);
	        };
	
	        reader.onerror = function () {
	            reject(reader.error);
	        };
	    });
	};
	
	var getHostname = exports.getHostname = function getHostname(url) {
	    if (url) {
	        url = normalizeValue(url);
	
	        var a = document.createElement('a');
	
	        a.href = url;
	
	        return a.hostname;
	    }
	
	    return null;
	};
	
	/**
	 * determines if fn passed is of type Function
	 *
	 * @param {Function} fn
	 * @returns {boolean}
	 */
	var isFunction = exports.isFunction = function isFunction(fn) {
	    return toString.call(fn) === '[object Function]' || typeof fn === 'function';
	};
	
	/**
	 * determines if obj passed is of type Object
	 *
	 * @param {*} obj
	 * @returns {boolean}
	 */
	var isObject = exports.isObject = function isObject(obj) {
	    return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && !!obj;
	};
	
	/**
	 * determines if the prototype of the DataType is the same type of prototype as the body
	 *
	 * @param {*} body
	 * @param {*} DataType
	 * @returns {boolean}
	 */
	var isPrototypeOfDataType = exports.isPrototypeOfDataType = function isPrototypeOfDataType(body, DataType) {
	    return DataType.prototype.isPrototypeOf(body);
	};
	
	/**
	 * determines if the prototype of the obj is of type String
	 *
	 * @param {*} obj
	 * @returns {boolean}
	 */
	var isString = exports.isString = function isString(obj) {
	    return toString.call(obj) === '[object String]';
	};
	
	/**
	 * returns capitalized method if it exists in HTTP_METHODS, else returns what is passed to it
	 *
	 * @param {string} method
	 * @returns {string}
	 */
	var normalizeMethod = exports.normalizeMethod = function normalizeMethod(method) {
	    var upCased = (isString(method) ? method : String(method)).toUpperCase();
	
	    return !! ~HTTP_METHODS.indexOf(upCased) ? upCased : method;
	};
	
	/**
	 * returns lowercase string version of name passed to it
	 *
	 * @param {*} name
	 * @returns {string}
	 */
	var normalizeName = exports.normalizeName = function normalizeName(name) {
	    name = normalizeValue(name);
	
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	        throw new TypeError('Invalid character in header field name');
	    }
	
	    return name;
	};
	
	/**
	 * returns string value of value passed to it
	 *
	 * @param {*}value
	 * @returns {string}
	 */
	var normalizeValue = exports.normalizeValue = function normalizeValue(value) {
	    if (!isString(value)) {
	        value = String(value);
	    }
	
	    return value;
	};
	
	/**
	 * converts blob passed to arraybuffer and returns Promise
	 *
	 * @param {Blob} blob
	 * @returns {Promise}
	 */
	var readBlobAsArrayBuffer = exports.readBlobAsArrayBuffer = function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader();
	
	    reader.readAsArrayBuffer(blob);
	
	    return fileReaderReady(reader);
	};
	
	/**
	 * converts blob passed to text and returns Promise
	 *
	 * @param {Blob} blob
	 * @returns {Promise}
	 */
	var readBlobAsText = exports.readBlobAsText = function readBlobAsText(blob) {
	    var reader = new FileReader();
	
	    reader.readAsText(blob);
	
	    return fileReaderReady(reader);
	};
	
	/**
	 * sets property of object to be non-enumerable
	 *
	 * @param {Object} object
	 * @param {string} property
	 * @param {*} value
	 */
	var setNonEnumerable = exports.setNonEnumerable = function setNonEnumerable(object, property, value) {
	    Object.defineProperty(object, property, {
	        configurable: true,
	        enumerable: false,
	        value: value,
	        writable: true
	    });
	};
	
	/**
	 * support booleans for ArrayBuffer, Blob, and FormData
	 */
	var support = exports.support = {
	    arrayBuffer: 'ArrayBuffer' in window,
	    blob: 'FileReader' in window && 'Blob' in window && canCreateNewBlob(),
	    formData: 'FormData' in window
	};
	
	/**
	 * returns responseURL of XHR
	 *
	 * @param {Object} xhr
	 * @returns {string}
	 */
	var xhrResponseURL = exports.xhrResponseURL = function xhrResponseURL(xhr) {
	    if ('responseURL' in xhr) {
	        return xhr.responseURL;
	    }
	
	    // Avoid security warnings on getResponseHeader when not allowed by CORS
	    if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	        return xhr.getResponseHeader('X-Request-URL');
	    }
	};
	
	exports.default = {
	    canCreateNewBlob: canCreateNewBlob,
	    consumed: consumed,
	    decode: decode,
	    fileReaderReady: fileReaderReady,
	    getHostname: getHostname,
	    isFunction: isFunction,
	    isObject: isObject,
	    isPrototypeOfDataType: isPrototypeOfDataType,
	    isString: isString,
	    normalizeMethod: normalizeMethod,
	    normalizeName: normalizeName,
	    normalizeValue: normalizeValue,
	    readBlobAsArrayBuffer: readBlobAsArrayBuffer,
	    readBlobAsText: readBlobAsText,
	    setNonEnumerable: setNonEnumerable,
	    support: support,
	    xhrResponseURL: xhrResponseURL
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _utils = __webpack_require__(6);
	
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

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _CourierBody2 = __webpack_require__(5);
	
	var _CourierBody3 = _interopRequireDefault(_CourierBody2);
	
	var _CourierHeaders = __webpack_require__(7);
	
	var _CourierHeaders2 = _interopRequireDefault(_CourierHeaders);
	
	var _utils = __webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var CourierRequest = function (_CourierBody) {
	    _inherits(CourierRequest, _CourierBody);
	
	    /**
	     * creates new CourierRequest object based on input passed
	     * if input is a CourierRequest itself, then use the CourierRequest input, else use the options passed
	     * with defaults
	     *
	     * @param {CourierRequest|string} input
	     * @param {Object} options
	     */
	
	    function CourierRequest(input) {
	        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	        _classCallCheck(this, CourierRequest);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CourierRequest).call(this));
	
	        var body = options.body;
	
	        if ((0, _utils.isPrototypeOfDataType)(input, CourierRequest)) {
	            if (input.bodyUsed) {
	                throw new TypeError('Already read');
	            }
	
	            _this.url = input.url;
	            _this.credentials = input.credentials;
	
	            if (!options.headers) {
	                _this.headers = new _CourierHeaders2.default(input.headers);
	            }
	
	            _this.method = input.method;
	            _this.mode = input.mode;
	
	            if (!body) {
	                body = input._bodyInit;
	                input.bodyUsed = true;
	            }
	        } else {
	            _this.url = input;
	        }
	
	        _this.cache = options.cache || _this.cache || 'default';
	        _this.credentials = options.credentials || _this.credentials || 'omit';
	        _this.password = options.password || null;
	        _this.username = options.username || null;
	
	        if (options.headers || !_this.headers) {
	            _this.headers = new _CourierHeaders2.default(options.headers);
	        }
	
	        _this.method = (0, _utils.normalizeMethod)(options.method || _this.method || 'GET');
	        _this.mode = options.mode || _this.mode || null;
	        _this.referrer = null;
	
	        if ((_this.method === 'GET' || _this.method === 'HEAD') && body) {
	            throw new TypeError('Body not allowed for GET or HEAD requests');
	        }
	
	        _this._initBody(body);
	        return _this;
	    }
	
	    return CourierRequest;
	}(_CourierBody3.default);
	
	/**
	 * clones existing CourierRequest into a new CourierRequest
	 *
	 * @returns {CourierRequest}
	 */
	
	CourierRequest.prototype.clone = function () {
	    return new CourierRequest(this);
	};
	
	exports.default = CourierRequest;
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _CourierBody2 = __webpack_require__(5);
	
	var _CourierBody3 = _interopRequireDefault(_CourierBody2);
	
	var _CourierHeaders = __webpack_require__(7);
	
	var _CourierHeaders2 = _interopRequireDefault(_CourierHeaders);
	
	var _utils = __webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var REDIRECT_STATUSES = [301, 302, 303, 307, 308];
	
	var CourierResponse = function (_CourierBody) {
	    _inherits(CourierResponse, _CourierBody);
	
	    /**
	     * receives _bodyInit inherited from Body and applies response aspects from it
	     *
	     * @param {*} bodyInit
	     * @param {Object} options
	     */
	
	    function CourierResponse(bodyInit) {
	        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	        _classCallCheck(this, CourierResponse);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CourierResponse).call(this));
	
	        _this._initBody(bodyInit);
	
	        _this.status = options.status;
	
	        var isValidResponse = _this.status >= 200 && _this.status < 300;
	
	        if (isValidResponse) {
	            if (window.location.hostname !== (0, _utils.getHostname)(options.url)) {
	                _this.type = options.mode === 'no-cors' ? 'opaque' : 'cors';
	            } else {
	                _this.type = 'basic';
	            }
	        } else {
	            _this.type = 'error';
	        }
	
	        _this.ok = isValidResponse;
	        _this.headers = options.headers instanceof _CourierHeaders2.default ? options.headers : new _CourierHeaders2.default(options.headers);
	        _this.statusText = options.statusText;
	        _this.url = options.url || '';
	        return _this;
	    }
	
	    return CourierResponse;
	}(_CourierBody3.default);
	
	/**
	 * clone existing CourierResponse into new CourierResponse
	 *
	 * @returns {CourierResponse}
	 */
	
	CourierResponse.prototype.clone = function () {
	    return new CourierResponse(this._bodyInit, {
	        headers: new _CourierHeaders2.default(this.headers),
	        status: this.status,
	        statusText: this.statusText,
	        url: this.url
	    });
	};
	
	/**
	 * create error for CourierResponse
	 *
	 * @returns {CourierResponse}
	 */
	CourierResponse.prototype.error = function () {
	    var response = new CourierResponse(null, {
	        status: 0,
	        statusText: ''
	    });
	
	    response.type = 'error';
	
	    return response;
	};
	
	/**
	 * creates new CourierResponse based on status
	 *
	 * @param {string} url
	 * @param {number} status
	 * @returns {CourierResponse}
	 */
	CourierResponse.prototype.redirect = function (url, status) {
	    if (! ~REDIRECT_STATUSES.indexOf(status)) {
	        throw new RangeError('Invalid status code');
	    }
	
	    return new CourierResponse(null, {
	        headers: {
	            location: url
	        },
	        status: status
	    });
	};
	
	exports.default = CourierResponse;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=courier.js.map