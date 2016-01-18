import Body from './Body';
import Headers from './Headers';

const REDIRECT_STATUSES = [301, 302, 303, 307, 308];

class Response extends Body {
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

        this.ok = isValidResponse;
        this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers);
        this.statusText = options.statusText;
        this.type = isValidResponse ? 'default' : 'error';
        this.url = options.url || '';
    }
}

/**
 * clone existing Response into new Response
 *
 * @returns {Response}
 */
Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
        headers: new Headers(this.headers),
        status: this.status,
        statusText: this.statusText,
        url: this.url
    });
};

/**
 * create error for Response
 *
 * @returns {Response}
 */
Response.prototype.error = function() {
    let response = new Response(null, {
        status: 0,
        statusText: ''
    });

    response.type = 'error';

    return response;
};

/**
 * creates new Response based on status
 *
 * @param {string} url
 * @param {number} status
 * @returns {Response}
 */
Response.prototype.redirect = function(url, status) {
    if (!~REDIRECT_STATUSES.indexOf(status)) {
        throw new RangeError('Invalid status code');
    }

    return new Response(null, {
        headers: {
            location: url
        },
        status
    });
};

export default Response;