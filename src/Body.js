

import {
    consumed,
    decode,
    isPrototypeOfDataType,
    readBlobAsArrayBuffer,
    readBlobAsText,
    support
} from './utils';

const isFunction = (fn) => {
    return Object.prototype.toString.call(fn) === '[object Function]' || typeof fn === 'function';
};

const setHidden = (object, property, value) => {
    Object.defineProperty(object, property, {
        configurable: true,
        enumerable: false,
        value,
        writable: true
    });
};

class Body {
    constructor() {
        this.bodyUsed = false;

        setHidden(this, '_initBody', function(body) {
            setHidden(this, '_bodyInit', body);

            if (typeof body === 'string') {
                setHidden(this, '_bodyText', body);
            } else if (support.blob && isPrototypeOfDataType(body, Blob)) {
                setHidden(this, '_bodyBlob', body);
            } else if (support.formData && isPrototypeOfDataType(body, FormData)) {
                setHidden(this, '_bodyFormData', body);
            } else if (!body) {
                setHidden(this, '_bodyText', '');
            } else if (support.arrayBuffer && isPrototypeOfDataType(body, ArrayBuffer)) {
                // Only support ArrayBuffers for POST method.
                // Receiving ArrayBuffers happens via Blobs, instead.
            } else {
                throw new TypeError('Unsupported BodyInit type');
            }
        });

        return this;
    }
}

if (support.blob) {
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

    Body.prototype.arrayBuffer = function(dataFilter) {
        return this.blob(dataFilter).then(readBlobAsArrayBuffer);
    };

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

if (support.formData) {
    Body.prototype.formData = function(dataFilter) {
        return this.text(dataFilter).then(decode);
    };
}

Body.prototype.json = function(dataFilter) {
    return this.text(dataFilter).then(JSON.parse);
};

export default Body;