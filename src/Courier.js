import deepExtend from 'deep-extend';

import CourierBody from './CourierBody';
import CourierHeaders from './CourierHeaders';
import CourierRequest from './CourierRequest';
import CourierResponse from './CourierResponse';
import {
    getHostname,
    isPrototypeOfDataType,
    normalizeValue,
    readBlobAsText,
    setNonEnumerable,
    support,
    xhrResponseURL
} from './utils';

/**
 * default options for Courier
 */
const DEFAULT_COURIER_OPTIONS = {
    cache: 'default',
    credentials: 'omit',
    data: null,
    dataType: 'json',
    headers: new CourierHeaders(),
    method: 'GET',
    password: null,
    queryStrings: [],
    plugins: [],
    referrer: null,
    type: 'json',
    url: null,
    username: null
};

/**
 * performs the XHR request
 *
 * @param {CourierRequest|string} input
 * @param {Object} init
 * @returns {Promise}
 */
const performRequest = (input, init) => {
    return new Promise((resolve, reject) => {
        const request = isPrototypeOfDataType(input, CourierRequest) && !init ? input : new CourierRequest(input, init);

        let xhr = new XMLHttpRequest();

        xhr.onload = () => {
            const status = xhr.status === 1223 ? 204 : xhr.status;

            if (status < 100 || status > 599) {
                reject(new TypeError('Network request failed'));

                return;
            }

            const options = {
                cache: init.cache,
                headers: headers(xhr),
                mode: init.mode,
                status,
                statusText: xhr.statusText,
                url: xhrResponseURL(xhr)
            };
            const body = 'response' in xhr ? xhr.response : xhr.responseText;

            resolve(new CourierResponse(body, options));
        };

        xhr.onerror = () => {
            reject(new TypeError('Network request failed'));
        };

        if (request.cache === 'no-cache') {
            const curTime = (new Date()).getTime();

            request.url += `${(/\?/.test(request.url) ? '&' : '?')}preventCache=${curTime}`;
        }

        xhr.open(request.method, request.url, true, request.username, request.password);

        if (request.credentials === 'include') {
            xhr.withCredentials = true;
        }

        if ('responseType' in xhr && support.blob) {
            xhr.responseType = 'blob';
        }

        request.headers.forEach((value, name) => {
            xhr.setRequestHeader(name, value);
        });

        xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    });
};

/**
 * gets headers from XHR and converts them into CourierHeaders
 *
 * @param {Object} xhr
 * @returns {CourierHeaders}
 */
const headers = (xhr) => {
    const pairs = xhr.getAllResponseHeaders().trim().split('\n');

    let head = new CourierHeaders();

    pairs.forEach((header) => {
        const split = header.trim().split(':');
        const key = split.shift().trim();
        const value = split.join(':').trim();

        head.append(key, value);
    });

    return head;
};

class Courier {
    /**
     * sets up parameters for Courier request
     *
     * @param {Object} options
     * @returns {Courier}
     */
    constructor(options = {}) {
        let thisOptions = deepExtend({}, DEFAULT_COURIER_OPTIONS, options);

        setNonEnumerable(this, '_cache', thisOptions.cache);
        setNonEnumerable(this, '_data', thisOptions.data);
        setNonEnumerable(this, '_dataType', thisOptions.dataType);
        setNonEnumerable(this, '_credentials', thisOptions.credentials);
        setNonEnumerable(this, '_headers', thisOptions.headers);
        setNonEnumerable(this, '_method', thisOptions.method);
        setNonEnumerable(this, '_mode', thisOptions.mode);
        setNonEnumerable(this, '_password', thisOptions.password);
        setNonEnumerable(this, '_plugins', thisOptions.plugins);
        setNonEnumerable(this, '_queryStrings', thisOptions.queryStrings);
        setNonEnumerable(this, '_type', thisOptions.type);
        setNonEnumerable(this, '_url', thisOptions.url);
        setNonEnumerable(this, '_username', thisOptions.username);

        return this;
    }

    /**
     * sets basic authentication credentials for request
     *
     * @param {string} username
     * @param {string} password
     * @returns {Courier}
     */
    auth(username, password) {
        this._password = password;
        this._username = username;

        return this;
    }

    /**
     * sets cache type for request
     * valid types: default, no-store, reload, no-cache, force-cache, only-if-cached
     *
     * @param {string} cacheType
     * @returns {Courier}
     */
    cache(cacheType = 'default') {
        this._cache = cacheType;

        return this;
    }

    /**
     * sets credentials type for request
     * valid types: omit, same-origin, include
     *
     * @param {string} creds
     * @returns {Courier}
     */
    credentials(creds = 'include') {
        this._credentials = creds;

        return this;
    }

    /**
     * sets data to be passed in request body
     * if property is an object, treats all key: value pairs as data to be added
     *
     * @param {string|Object} property
     * @param {*} value
     * @returns {Courier}
     */
    data(property, value) {
        let dataToAdd = {};

        if (value === void 0) {
            if (isPrototypeOfDataType(property, FormData) || isPrototypeOfDataType(property, Blob)) {
                dataToAdd = property;
            } else {
                Object.getOwnPropertyNames(property).forEach((name) => {
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

    /**
     * sets dataFilter function to be executed prior to parsing
     * fn will accept one parameter, the unparsed data returned in response
     *
     * @param {Function} fn
     * @returns {Courier}
     */
    dataFilter(fn) {
        this._dataFilter = fn;

        return this;
    }

    /**
     * sets data type of body in request
     *
     * @param {string} typeString
     * @returns {Courier}
     */
    dataType(typeString) {
        this._dataType = typeString;

        return this;
    }

    /**
     * sets method of request to DELETE for url
     *
     * @param {string} url
     * @returns {Courier}
     */
    delete(url) {
        this._method = 'DELETE';
        this._url = url;

        return this;
    }

    /**
     * sets method of request to GET for url
     *
     * @param {string} url
     * @returns {Courier}
     */
    get(url) {
        this._method = 'GET';
        this._url = url;

        return this;
    }

    /**
     * sets method of request to HEAD for url
     *
     * @param {string} url
     * @returns {Courier}
     */
    head(url) {
        this._method = 'HEAD';
        this._url = url;

        return this;
    }

    /**
     * Sets header for request
     * if header is Object, treats each key: value pair as header to be added
     *
     * @param {string|Object} header
     * @param {string} value
     * @returns {Courier}
     */
    headers(header, value) {
        if (typeof header === 'object' && !!header) {
            Object.getOwnPropertyNames(header).forEach((name) => {
                const value = normalizeValue(header[name]);

                name = normalizeValue(name);

                this._headers.append(name, value);
            });
        } else {
            header = normalizeValue(header);
            value = normalizeValue(value);
            
            this._headers.append(header, value);
        }

        return this;
    }

    /**
     * sets mode of request
     * valid values: same-origin, no-cors, cors
     *
     * @param {string}modeString
     * @returns {Courier}
     */
    mode(modeString = 'same-origin') {
        this._mode = modeString;

        return this;
    }

    /**
     * sets method of request to OPTIONS for url
     *
     * @param {string} url
     * @returns {Courier}
     */
    options(url) {
        this._method = 'OPTIONS';
        this._url = url;

        return this;
    }

    /**
     * sets method of request to PATCH for url
     *
     * @param {string} url
     * @returns {Courier}
     */
    patch(url) {
        this._method = 'PATCH';
        this._url = url;

        return this;
    }

    /**
     * sets method of request to POST for url
     *
     * @param {string} url
     * @returns {Courier}
     */
    post(url) {
        this._method = 'POST';
        this._url = url;

        return this;
    }

    /**
     * sets method of request to PUT for url
     *
     * @param {string} url
     * @returns {Courier}
     */
    put(url) {
        this._method = 'PUT';
        this._url = url;

        return this;
    }

    /**
     * sets querystrings to be appended to URL on request
     * if property is an object, treats each key: value pair as a querystring to be added
     * 
     * @param {string|Object} property
     * @param {string|number} value
     * @returns {Courier}
     */
    query(property, value) {
        if (typeof property === 'object' && !!property) {
            Object.getOwnPropertyNames(property).forEach((name) => {
                const value = normalizeValue(property[name]);

                name = normalizeValue(name);
                
                this._queryStrings.push(`${name}=${value}`);
            });
        } else {
            property = normalizeValue(property);
            value = normalizeValue(value);
            
            this._queryStrings.push(`${property}=${value}`);
        }

        return this;
    }

    /**
     * performs the request, executing callback passed to it upon completion
     * callback receives three parameters: data, error, and the full response
     * 
     * @param {Function} callback
     */
    send(callback) {
        const newHeaders = new CourierHeaders(this._headers);

        let data;

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

                    for (let key in this._data) {
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

            this._queryStrings.forEach((queryString) => {
                this._url += `${queryString}&`;
            });

            this._url = this._url.slice(0, -1);
        }

        let requestInit = {
            body: data ? new CourierBody(data) : null,
            cache: this._cache,
            credentials: this._credentials,
            headers: newHeaders,
            method: this._method,
            mode: this._mode || (window.location.hostname === getHostname(this._url) ? 'same-origin' : 'cors'),
            password: this._password,
            url: this._url,
            username: this._username
        };

        this._plugins.forEach((plugin) => {
            requestInit = plugin(requestInit) || requestInit;
        });

        const finalURL = requestInit.url;

        const request = new CourierRequest(finalURL, requestInit);

        let error = null;
        let rawResponse;

        performRequest(request, requestInit)
            .then((response) => {
                rawResponse = response;

                if (!response.ok) {
                    error = {
                        status: response.status,
                        statusText: response.statusText
                    };

                    return null;
                }

                (response._bodyBlob ? readBlobAsText(response._bodyBlob) : Promise.resolve(response._bodyText))
                    .then((text) => {
                        rawResponse.responseText = text;

                        switch (this._type) {
                            case 'arrayBuffer':
                                return response.arrayBuffer(this._dataFilter);
                            case 'blob':
                                return response.blob(this._dataFilter);
                            case 'json':
                                return response.json(this._dataFilter);
                            default:
                                return response.text(this._dataFilter);
                        }
                    })
                    .then((data) => {
                        callback(data, error, rawResponse);
                    });
            });
    }

    /**
     * sets the type of response expected
     * valid values: arraybuffer, blob, json
     * if other values are passed, response is parsed as text
     *
     * @param {string} typeString
     * @returns {Courier}
     */
    type(typeString = 'json') {
        this._type = typeString;

        return this;
    }

    /**
     * adds function plugins to use as part of the request
     *
     * @param {Function} fn
     * @returns {Courier}
     */
    use(fn) {
        this._plugins.push(fn);

        return this;
    }
}

export default Courier;