import {
    consumed,
    decode,
    isFunction,
    isPrototypeOfDataType,
    readBlobAsArrayBuffer,
    readBlobAsText,
    setNonEnumerable,
    support
} from './utils';

/**
 * creates new body, either for Request or Response
 *
 * @param {string|Blob|FormData} body
 */
const _initBody = function(body) {
    setNonEnumerable(this, '_bodyInit', body);

    if (typeof body === 'string') {
        setNonEnumerable(this, '_bodyText', body);
    } else if (support.blob && isPrototypeOfDataType(body, Blob)) {
        setNonEnumerable(this, '_bodyBlob', body);
    } else if (support.formData && isPrototypeOfDataType(body, FormData)) {
        setNonEnumerable(this, '_bodyFormData', body);
    } else if (!body) {
        setNonEnumerable(this, '_bodyText', '');
    } else if (support.arrayBuffer && isPrototypeOfDataType(body, ArrayBuffer)) {
        // Only support ArrayBuffers for POST method.
        // Receiving ArrayBuffers happens via Blobs, instead.
    } else {
        throw new TypeError('Unsupported BodyInit type');
    }
};

class Body {
    /**
     * creates new Body object, used for both requests and responses
     *
     * @returns {Body}
     */
    constructor() {
        this.bodyUsed = false;

        setNonEnumerable(this, '_initBody', _initBody);

        return this;
    }
}

if (support.blob) {
    /**
     * parses blob and returns promise containing data of parsed blob
     * if dataFilter is provided in request then returns callback of dataFilter
     *
     * @param {Function} dataFilter
     * @returns {Promise}
     */
    Body.prototype.blob = function(dataFilter) {
        const rejected = consumed(this);

        if (rejected) {
            return rejected;
        }

        if (this._bodyBlob) {
            const bodyBlobPromise = Promise.resolve(this._bodyBlob);

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

    /**
     * parses arraybuffer and returns promise containing data of parsed arraybuffer
     * if dataFilter is provided in request then returns callback of dataFilter
     *
     * @param {Function} dataFilter
     * @returns {Promise}
     */
    Body.prototype.arrayBuffer = function(dataFilter) {
        return this.blob(dataFilter).then(readBlobAsArrayBuffer);
    };

    /**
     * parses text and returns promise containing data of parsed text
     * if dataFilter is provided in request then returns callback of dataFilter
     *
     * @param {Function} dataFilter
     * @returns {Promise}
     */
    Body.prototype.text = function(dataFilter) {
        const rejected = consumed(this);

        if (rejected) {
            return rejected;
        }

        if (this._bodyBlob) {
            const blobText = readBlobAsText(this._bodyBlob);

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
    /**
     * parses text and returns promise containing data of parsed text
     * if dataFilter is provided in request then returns callback of dataFilter
     *
     * @param {Function} dataFilter
     * @returns {Promise}
     */
    Body.prototype.text = function(dataFilter) {
        const rejected = consumed(this);

        if (rejected) {
            return rejected;
        }

        if (isFunction(dataFilter)) {
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
if (support.formData) {
    Body.prototype.formData = function(dataFilter) {
        return this.text(dataFilter).then(decode);
    };
}

/**
 * parses json and returns promise containing data of parsed json
 * if dataFilter is provided in request then returns callback of dataFilter
 *
 * @param {Function} dataFilter
 * @returns {Promise}
 */
Body.prototype.json = function(dataFilter) {
    return this.text(dataFilter).then(JSON.parse);
};

export default Body;