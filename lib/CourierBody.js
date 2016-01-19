'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('./utils');

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