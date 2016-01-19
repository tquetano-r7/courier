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