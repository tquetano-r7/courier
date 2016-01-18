/**
 * valid request methods
 */
const HTTP_METHODS = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

const toString = Object.prototype.toString;

/**
 * determines if Blob is supported and can be created
 *
 * @returns {boolean}
 */
export const canCreateNewBlob = () => {
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
export const consumed = (body) => {
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
export const decode = (body) => {
    let form = new FormData();

    body.trim().split('&').forEach((bytes) => {
        const split = bytes.split('=');
        const name = split.shift().replace(/\+/g, ' ');
        const value = split.join('=').replace(/\+/g, ' ');

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
export const fileReaderReady = (reader) => {
    return new Promise((resolve, reject) => {
        reader.onload = () => {
            resolve(reader.result);
        };

        reader.onerror = () => {
            reject(reader.error);
        };
    });
};

export const getHostname = (url) => {
    if (url) {
        url = normalizeValue(url);

        let a = document.createElement('a');

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
export const isFunction = (fn) => {
    return toString.call(fn) === '[object Function]' || typeof fn === 'function';
};

/**
 * determines if obj passed is of type Object
 *
 * @param {*} obj
 * @returns {boolean}
 */
export const isObject = (obj) => {
    return typeof obj === 'object' && !!obj;
};

/**
 * determines if the prototype of the DataType is the same type of prototype as the body
 *
 * @param {*} body
 * @param {*} DataType
 * @returns {boolean}
 */
export const isPrototypeOfDataType = (body, DataType) => {
    return DataType.prototype.isPrototypeOf(body);
};

/**
 * determines if the prototype of the obj is of type String
 *
 * @param {*} obj
 * @returns {boolean}
 */
export const isString = (obj) => {
    return toString.call(obj) === '[object String]';
};

/**
 * returns capitalized method if it exists in HTTP_METHODS, else returns what is passed to it
 *
 * @param {string} method
 * @returns {string}
 */
export const normalizeMethod = (method) => {
    const upCased = (isString(method) ? method : String(method)).toUpperCase();

    return !!~HTTP_METHODS.indexOf(upCased) ? upCased : method;
};

/**
 * returns lowercase string version of name passed to it
 *
 * @param {*} name
 * @returns {string}
 */
export const normalizeName = (name) => {
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
export const normalizeValue = (value) => {
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
export const readBlobAsArrayBuffer = (blob) => {
    let reader = new FileReader();

    reader.readAsArrayBuffer(blob);

    return fileReaderReady(reader);
};

/**
 * converts blob passed to text and returns Promise
 *
 * @param {Blob} blob
 * @returns {Promise}
 */
export const readBlobAsText = (blob) => {
    let reader = new FileReader();

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
export const setNonEnumerable = (object, property, value) => {
    Object.defineProperty(object, property, {
        configurable: true,
        enumerable: false,
        value,
        writable: true
    });
};

/**
 * support booleans for ArrayBuffer, Blob, and FormData
 */
export const support = {
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
export const xhrResponseURL = (xhr) => {
    if ('responseURL' in xhr) {
        return xhr.responseURL;
    }

    // Avoid security warnings on getResponseHeader when not allowed by CORS
    if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
        return xhr.getResponseHeader('X-Request-URL');
    }
};

export default {
    canCreateNewBlob,
    consumed,
    decode,
    fileReaderReady,
    getHostname,
    isFunction,
    isObject,
    isPrototypeOfDataType,
    isString,
    normalizeMethod,
    normalizeName,
    normalizeValue,
    readBlobAsArrayBuffer,
    readBlobAsText,
    setNonEnumerable,
    support,
    xhrResponseURL
};