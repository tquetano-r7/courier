import CourierBody from './CourierBody';
import CourierHeaders from './CourierHeaders';
import {
    getHostname
} from './utils';

const REDIRECT_STATUSES = [301, 302, 303, 307, 308];

class CourierResponse extends CourierBody {
    /**
     * receives _bodyInit inherited from Body and applies response aspects from it
     *
     * @param {*} bodyInit
     * @param {Object} options
     */
    constructor(bodyInit, options = {}) {
        super();

        this._initBody(bodyInit);

        this.status = options.status;

        const isValidResponse = this.status >= 200 && this.status < 300;

        if (isValidResponse) {
            if (window.location.hostname !== getHostname(options.url)) {
                this.type = options.mode === 'no-cors' ? 'opaque' : 'cors';
            } else {
                this.type = 'basic';
            }
        } else {
            this.type = 'error';
        }

        this.ok = isValidResponse;
        this.headers = options.headers instanceof CourierHeaders ? options.headers : new CourierHeaders(options.headers);
        this.statusText = options.statusText;
        this.url = options.url || '';
    }
}

/**
 * clone existing CourierResponse into new CourierResponse
 *
 * @returns {CourierResponse}
 */
CourierResponse.prototype.clone = function() {
    return new CourierResponse(this._bodyInit, {
        headers: new CourierHeaders(this.headers),
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
CourierResponse.prototype.error = function() {
    let response = new CourierResponse(null, {
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
CourierResponse.prototype.redirect = function(url, status) {
    if (!~REDIRECT_STATUSES.indexOf(status)) {
        throw new RangeError('Invalid status code');
    }

    return new CourierResponse(null, {
        headers: {
            location: url
        },
        status
    });
};

export default CourierResponse;