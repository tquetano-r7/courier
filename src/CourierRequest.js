import CourierBody from './CourierBody';
import CourierHeaders from './CourierHeaders';
import {
    isPrototypeOfDataType,
    normalizeMethod
} from './utils';

class CourierRequest extends CourierBody {
    /**
     * creates new CourierRequest object based on input passed
     * if input is a CourierRequest itself, then use the CourierRequest input, else use the options passed
     * with defaults
     *
     * @param {CourierRequest|string} input
     * @param {Object} options
     */
    constructor(input, options = {}) {
        super();

        let body = options.body;

        if (isPrototypeOfDataType(input, CourierRequest)) {
            if (input.bodyUsed) {
                throw new TypeError('Already read');
            }

            this.url = input.url;
            this.credentials = input.credentials;

            if (!options.headers) {
                this.headers = new CourierHeaders(input.headers);
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
            this.headers = new CourierHeaders(options.headers);
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

/**
 * clones existing CourierRequest into a new CourierRequest
 *
 * @returns {CourierRequest}
 */
CourierRequest.prototype.clone = function() {
    return new CourierRequest(this);
};

export default CourierRequest;