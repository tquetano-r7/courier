

import Body from './Body';
import Headers from './Headers';
import {
    isPrototypeOfDataType,
    normalizeMethod
} from './utils';

class Request extends Body {
    constructor(input, options = {}) {
        super();

        let body = options.body;

        if (isPrototypeOfDataType(input, Request)) {
            if (input.bodyUsed) {
                throw new TypeError('Already read');
            }

            this.url = input.url;
            this.credentials = input.credentials;

            if (!options.headers) {
                this.headers = new Headers(input.headers);
            }

            this.method = input.method;
            this.mode = input.mode;

            if (!body) {
                body = input._bodyInit;
                input.bodyUsed = true;
            }
        } else {
            this.url = input;
        }

        this.cache = options.cache || this.cache || 'default';
        this.credentials = options.credentials || this.credentials || 'omit';
        this.password = options.password || null;
        this.username = options.username || null;

        if (options.headers || !this.headers) {
            this.headers = new Headers(options.headers);
        }

        this.method = normalizeMethod(options.method || this.method || 'GET');
        this.mode = options.mode || this.mode || null;
        this.referrer = null;

        if ((this.method === 'GET' || this.method === 'HEAD') && body) {
            throw new TypeError('Body not allowed for GET or HEAD requests');
        }

        this._initBody(body);
    }
}

Request.prototype.clone = function() {
    return new Request(this);
};

export default Request;