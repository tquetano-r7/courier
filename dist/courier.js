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
	
	var _Courier = __webpack_require__(2);
	
	var _Courier2 = _interopRequireDefault(_Courier);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var createCourier = function createCourier() {
	    return new _Courier2.default();
	};
	
	exports.default = createCourier;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Body = __webpack_require__(3);
	
	var _Body2 = _interopRequireDefault(_Body);
	
	var _Headers = __webpack_require__(5);
	
	var _Headers2 = _interopRequireDefault(_Headers);
	
	var _Request = __webpack_require__(6);
	
	var _Request2 = _interopRequireDefault(_Request);
	
	var _Response = __webpack_require__(7);
	
	var _Response2 = _interopRequireDefault(_Response);
	
	var _utils = __webpack_require__(4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DEFAULT_COURIER_OPTIONS = {
	    cache: 'default',
	    credentials: 'omit',
	    dataType: 'json',
	    headers: new _Headers2.default(),
	    method: 'GET',
	    mode: 'no-cors',
	    password: null,
	    referrer: null,
	    type: 'json',
	    url: null,
	    username: null
	};
	
	var fetch = function fetch(input, init) {
	    return new Promise(function (resolve, reject) {
	        var request = (0, _utils.isPrototypeOfDataType)(input, _Request2.default) && !init ? input : new _Request2.default(input, init);
	
	        var xhr = new XMLHttpRequest();
	
	        xhr.onload = function () {
	            var status = xhr.status === 1223 ? 204 : xhr.status;
	
	            if (status < 100 || status > 599) {
	                reject(new TypeError('Network request failed'));
	
	                return;
	            }
	
	            var options = {
	                headers: headers(xhr),
	                status: status,
	                statusText: xhr.statusText,
	                url: (0, _utils.xhrResponseURL)(xhr)
	            };
	            var body = 'response' in xhr ? xhr.response : xhr.responseText;
	
	            resolve(new _Response2.default(body, options));
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
	
	var headers = function headers(xhr) {
	    var pairs = xhr.getAllResponseHeaders().trim().split('\n');
	
	    var head = new _Headers2.default();
	
	    pairs.forEach(function (header) {
	        var split = header.trim().split(':');
	        var key = split.shift().trim();
	        var value = split.join(':').trim();
	
	        head.append(key, value);
	    });
	
	    return head;
	};
	
	var Courier = function () {
	    function Courier() {
	        var options = arguments.length <= 0 || arguments[0] === undefined ? DEFAULT_COURIER_OPTIONS : arguments[0];
	
	        _classCallCheck(this, Courier);
	
	        this._cache = options.cache;
	        this._data = null;
	        this._dataType = options.dataType;
	        this._credentials = options.credentials;
	        this._headers = options.headers;
	        this._method = options.method;
	        this._mode = options.mode;
	        this._queryStrings = [];
	        this._type = options.type;
	        this._url = options.url;
	
	        return this;
	    }
	
	    _createClass(Courier, [{
	        key: 'auth',
	        value: function auth(username, password) {
	            this._password = password;
	            this._username = username;
	        }
	    }, {
	        key: 'cache',
	        value: function cache(cacheType) {
	            this._cache = cacheType;
	
	            return this;
	        }
	    }, {
	        key: 'credentials',
	        value: function credentials() {
	            var creds = arguments.length <= 0 || arguments[0] === undefined ? 'include' : arguments[0];
	
	            this._credentials = creds;
	
	            return this;
	        }
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
	    }, {
	        key: 'dataFilter',
	        value: function dataFilter(fn) {
	            this._dataFilter = fn;
	
	            return this;
	        }
	    }, {
	        key: 'dataType',
	        value: function dataType(typeString) {
	            this._dataType = typeString;
	        }
	    }, {
	        key: 'delete',
	        value: function _delete(url) {
	            this._method = 'DELETE';
	            this._url = url;
	
	            return this;
	        }
	    }, {
	        key: 'get',
	        value: function get(url) {
	            this._method = 'GET';
	            this._url = url;
	
	            return this;
	        }
	    }, {
	        key: 'head',
	        value: function head(url) {
	            this._method = 'HEAD';
	            this._url = url;
	
	            return this;
	        }
	    }, {
	        key: 'headers',
	        value: function headers(header, value) {
	            var _this = this;
	
	            if ((typeof header === 'undefined' ? 'undefined' : _typeof(header)) === 'object' && !!header) {
	                Object.getOwnPropertyNames(header).forEach(function (name) {
	                    _this._headers.append(name, header[name]);
	                });
	            } else {
	                this._headers.append(header, value);
	            }
	
	            return this;
	        }
	    }, {
	        key: 'mode',
	        value: function mode(modeString) {
	            this._mode = modeString;
	        }
	    }, {
	        key: 'patch',
	        value: function patch(url) {
	            this._method = 'PATCH';
	            this._url = url;
	
	            return this;
	        }
	    }, {
	        key: 'post',
	        value: function post(url) {
	            this._method = 'POST';
	            this._url = url;
	
	            return this;
	        }
	    }, {
	        key: 'put',
	        value: function put(url) {
	            this._method = 'PUT';
	            this._url = url;
	
	            return this;
	        }
	    }, {
	        key: 'query',
	        value: function query(property, value) {
	            var _this2 = this;
	
	            if ((typeof property === 'undefined' ? 'undefined' : _typeof(property)) === 'object' && !!property) {
	                Object.getOwnPropertyNames(property).forEach(function (name) {
	                    _this2._queryStrings.push(name + '=' + property[name]);
	                });
	            } else {
	                this._queryStrings.push(property + '=' + value);
	            }
	
	            return this;
	        }
	    }, {
	        key: 'send',
	        value: function send(callback) {
	            var _this3 = this;
	
	            var newHeaders = new _Headers2.default(this._headers);
	
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
	                body: data ? new _Body2.default(data) : null,
	                cache: this._cache,
	                credentials: this._credentials,
	                headers: newHeaders,
	                method: this._method,
	                mode: this._mode,
	                password: this._password,
	                username: this._username
	            };
	
	            var request = new _Request2.default(this._url, requestInit);
	
	            var error = null;
	            var rawResponse = undefined;
	
	            fetch(request, requestInit).then(function (response) {
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
	    }, {
	        key: 'type',
	        value: function type(typeString) {
	            this._type = typeString;
	
	            return this;
	        }
	    }]);
	
	    return Courier;
	}();
	
	exports.default = Courier;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _utils = __webpack_require__(4);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var isFunction = function isFunction(fn) {
	    return Object.prototype.toString.call(fn) === '[object Function]' || typeof fn === 'function';
	};
	
	var setHidden = function setHidden(object, property, value) {
	    Object.defineProperty(object, property, {
	        configurable: true,
	        enumerable: false,
	        value: value,
	        writable: true
	    });
	};
	
	var Body = function Body() {
	    _classCallCheck(this, Body);
	
	    this.bodyUsed = false;
	
	    setHidden(this, '_initBody', function (body) {
	        setHidden(this, '_bodyInit', body);
	
	        if (typeof body === 'string') {
	            setHidden(this, '_bodyText', body);
	        } else if (_utils.support.blob && (0, _utils.isPrototypeOfDataType)(body, Blob)) {
	            setHidden(this, '_bodyBlob', body);
	        } else if (_utils.support.formData && (0, _utils.isPrototypeOfDataType)(body, FormData)) {
	            setHidden(this, '_bodyFormData', body);
	        } else if (!body) {
	            setHidden(this, '_bodyText', '');
	        } else if (_utils.support.arrayBuffer && (0, _utils.isPrototypeOfDataType)(body, ArrayBuffer)) {
	            // Only support ArrayBuffers for POST method.
	            // Receiving ArrayBuffers happens via Blobs, instead.
	        } else {
	                throw new TypeError('Unsupported BodyInit type');
	            }
	    });
	
	    return this;
	};
	
	if (_utils.support.blob) {
	    Body.prototype.blob = function (dataFilter) {
	        var rejected = (0, _utils.consumed)(this);
	
	        if (rejected) {
	            return rejected;
	        }
	
	        if (this._bodyBlob) {
	            var bodyBlobPromise = Promise.resolve(this._bodyBlob);
	
	            if (isFunction(dataFilter)) {
	                return bodyBlobPromise.then(dataFilter);
	            }
	
	            return bodyBlobPromise;
	        } else if (this._bodyFormData) {
	            throw new Error('could not read FormData body as blob');
	        } else {
	            if (isFunction(dataFilter)) {
	                this._bodyText = dataFilter(this._bodyText);
	            }
	
	            return Promise.resolve(new Blob([this._bodyText]));
	        }
	    };
	
	    Body.prototype.arrayBuffer = function (dataFilter) {
	        return this.blob(dataFilter).then(_utils.readBlobAsArrayBuffer);
	    };
	
	    Body.prototype.text = function (dataFilter) {
	        var rejected = (0, _utils.consumed)(this);
	
	        if (rejected) {
	            return rejected;
	        }
	
	        if (this._bodyBlob) {
	            var blobText = (0, _utils.readBlobAsText)(this._bodyBlob);
	
	            if (isFunction(dataFilter)) {
	                return blobText.then(dataFilter);
	            }
	
	            return blobText;
	        } else if (this._bodyFormData) {
	            throw new Error('could not read FormData body as text');
	        } else {
	            if (isFunction(dataFilter)) {
	                this._bodyText = dataFilter(this._bodyText);
	            }
	
	            return Promise.resolve(this._bodyText);
	        }
	    };
	} else {
	    Body.prototype.text = function (dataFilter) {
	        var rejected = (0, _utils.consumed)(this);
	
	        if (rejected) {
	            return rejected;
	        }
	
	        if (isFunction(dataFilter)) {
	            this._bodyText = dataFilter(this._bodyText);
	        }
	
	        return Promise.resolve(this._bodyText);
	    };
	}
	
	if (_utils.support.formData) {
	    Body.prototype.formData = function (dataFilter) {
	        return this.text(dataFilter).then(_utils.decode);
	    };
	}
	
	Body.prototype.json = function (dataFilter) {
	    return this.text(dataFilter).then(JSON.parse);
	};
	
	exports.default = Body;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var HTTP_METHODS = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];
	
	var canCreateNewBlob = exports.canCreateNewBlob = function canCreateNewBlob() {
	    try {
	        new Blob();
	
	        return true;
	    } catch (ex) {
	        return false;
	    }
	};
	
	var consumed = exports.consumed = function consumed(body) {
	    if (body.bodyUsed) {
	        return Promise.reject(new TypeError('Already read'));
	    }
	
	    body.bodyUsed = true;
	};
	
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
	
	var isPrototypeOfDataType = exports.isPrototypeOfDataType = function isPrototypeOfDataType(body, DataType) {
	    return DataType.prototype.isPrototypeOf(body);
	};
	
	var normalizeMethod = exports.normalizeMethod = function normalizeMethod(method) {
	    var upCased = method.toUpperCase();
	
	    return !! ~HTTP_METHODS.indexOf(upCased) ? upCased : method;
	};
	
	var normalizeName = exports.normalizeName = function normalizeName(name) {
	    if (typeof name !== 'string') {
	        name = String(name);
	    }
	
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	        throw new TypeError('Invalid character in header field name');
	    }
	
	    return name.toLowerCase();
	};
	
	var normalizeValue = exports.normalizeValue = function normalizeValue(value) {
	    if (typeof value !== 'string') {
	        value = String(value);
	    }
	
	    return value;
	};
	
	var readBlobAsArrayBuffer = exports.readBlobAsArrayBuffer = function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader();
	
	    reader.readAsArrayBuffer(blob);
	
	    return fileReaderReady(reader);
	};
	
	var readBlobAsText = exports.readBlobAsText = function readBlobAsText(blob) {
	    var reader = new FileReader();
	
	    reader.readAsText(blob);
	
	    return fileReaderReady(reader);
	};
	
	var support = exports.support = {
	    arrayBuffer: 'ArrayBuffer' in window,
	    blob: 'FileReader' in window && 'Blob' in window && canCreateNewBlob(),
	    formData: 'FormData' in window
	};
	
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
	    isPrototypeOfDataType: isPrototypeOfDataType,
	    normalizeMethod: normalizeMethod,
	    normalizeName: normalizeName,
	    normalizeValue: normalizeValue,
	    readBlobAsArrayBuffer: readBlobAsArrayBuffer,
	    readBlobAsText: readBlobAsText,
	    support: support,
	    xhrResponseURL: xhrResponseURL
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _utils = __webpack_require__(4);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Headers = function () {
	    function Headers(headers) {
	        var _this = this;
	
	        _classCallCheck(this, Headers);
	
	        this.map = {};
	
	        if (headers instanceof Headers) {
	            headers.forEach(function (value, name) {
	                _this.append(name, value);
	            });
	        } else if (headers) {
	            Object.getOwnPropertyNames(headers).forEach(function (name) {
	                _this.append(name, headers[name]);
	            });
	        }
	    }
	
	    _createClass(Headers, [{
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
	    }, {
	        key: 'delete',
	        value: function _delete(name) {
	            name = (0, _utils.normalizeName)(name);
	
	            delete this.map[name];
	        }
	    }, {
	        key: 'forEach',
	        value: function forEach(callback /*, thisArg*/) {
	            var _this2 = this;
	
	            Object.getOwnPropertyNames(this.map).forEach(function (name) {
	                var map = _this2.map[name];
	
	                map.forEach(function (value) {
	                    callback.call(_this2, value, name, map);
	                    //callback.call(thisArg, value, name, this);
	                } /*, this*/);
	            } /*, this*/);
	        }
	    }, {
	        key: 'get',
	        value: function get(name) {
	            name = (0, _utils.normalizeName)(name);
	
	            var values = this.map[name];
	
	            return values ? values[0] : null;
	        }
	    }, {
	        key: 'getAll',
	        value: function getAll(name) {
	            name = (0, _utils.normalizeName)(name);
	
	            return this.map[name] || [];
	        }
	    }, {
	        key: 'has',
	        value: function has(name) {
	            name = (0, _utils.normalizeName)(name);
	
	            return this.map.hasOwnProperty(name);
	        }
	    }, {
	        key: 'set',
	        value: function set(name, value) {
	            name = (0, _utils.normalizeName)(name);
	            value = (0, _utils.normalizeName)(value);
	
	            this.map[name] = [value];
	        }
	    }]);
	
	    return Headers;
	}();
	
	exports.default = Headers;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Body2 = __webpack_require__(3);
	
	var _Body3 = _interopRequireDefault(_Body2);
	
	var _Headers = __webpack_require__(5);
	
	var _Headers2 = _interopRequireDefault(_Headers);
	
	var _utils = __webpack_require__(4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Request = function (_Body) {
	    _inherits(Request, _Body);
	
	    function Request(input) {
	        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	        _classCallCheck(this, Request);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Request).call(this));
	
	        var body = options.body;
	
	        if ((0, _utils.isPrototypeOfDataType)(input, Request)) {
	            if (input.bodyUsed) {
	                throw new TypeError('Already read');
	            }
	
	            _this.url = input.url;
	            _this.credentials = input.credentials;
	
	            if (!options.headers) {
	                _this.headers = new _Headers2.default(input.headers);
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
	            _this.headers = new _Headers2.default(options.headers);
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
	
	    return Request;
	}(_Body3.default);
	
	Request.prototype.clone = function () {
	    return new Request(this);
	};
	
	exports.default = Request;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Body2 = __webpack_require__(3);
	
	var _Body3 = _interopRequireDefault(_Body2);
	
	var _Headers = __webpack_require__(5);
	
	var _Headers2 = _interopRequireDefault(_Headers);
	
	__webpack_require__(4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var REDIRECT_STATUSES = [301, 302, 303, 307, 308];
	
	var Response = function (_Body) {
	    _inherits(Response, _Body);
	
	    function Response(bodyInit) {
	        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	        _classCallCheck(this, Response);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Response).call(this));
	
	        _this._initBody(bodyInit);
	
	        _this.status = options.status;
	
	        var isValidResponse = _this.status >= 200 && _this.status < 300;
	
	        _this.ok = isValidResponse;
	        _this.headers = options.headers instanceof _Headers2.default ? options.headers : new _Headers2.default(options.headers);
	        _this.statusText = options.statusText;
	        _this.type = isValidResponse ? 'default' : 'error';
	        _this.url = options.url || '';
	        return _this;
	    }
	
	    return Response;
	}(_Body3.default);
	
	Response.prototype.clone = function () {
	    return new Response(this._bodyInit, {
	        headers: new _Headers2.default(this.headers),
	        status: this.status,
	        statusText: this.statusText,
	        url: this.url
	    });
	};
	
	Response.prototype.error = function () {
	    var response = new Response(null, {
	        status: 0,
	        statusText: ''
	    });
	
	    response.type = 'error';
	
	    return response;
	};
	
	Response.prototype.redirect = function (url, status) {
	    if (! ~REDIRECT_STATUSES.indexOf(status)) {
	        throw new RangeError('Invalid status code');
	    }
	
	    return new Response(null, {
	        headers: {
	            location: url
	        },
	        status: status
	    });
	};
	
	exports.default = Response;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=courier.js.map