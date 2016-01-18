

import Body from './Body';
import Headers from './Headers';
import Request from './Request';
import Response from './Response';
import {
    isPrototypeOfDataType,
    readBlobAsText,
    support,
    xhrResponseURL
} from './utils';

const DEFAULT_COURIER_OPTIONS = {
    cache: 'default',
    credentials: 'omit',
    dataType: 'json',
    headers: new Headers(),
    method: 'GET',
    mode: 'no-cors',
    password: null,
    referrer: null,
    type: 'json',
    url: null,
    username: null
};

const fetch = (input, init) => {
    return new Promise((resolve, reject) => {
        const request = isPrototypeOfDataType(input, Request) && !init ? input : new Request(input, init);

        let xhr = new XMLHttpRequest();

        xhr.onload = () => {
            const status = xhr.status === 1223 ? 204 : xhr.status;

            if (status < 100 || status > 599) {
                reject(new TypeError('Network request failed'));

                return;
            }

            const options = {
                headers: headers(xhr),
                status,
                statusText: xhr.statusText,
                url: xhrResponseURL(xhr)
            };
            const body = 'response' in xhr ? xhr.response : xhr.responseText;

            resolve(new Response(body, options));
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

const headers = (xhr) => {
    const pairs = xhr.getAllResponseHeaders().trim().split('\n');

    let head = new Headers();

    pairs.forEach((header) => {
        const split = header.trim().split(':');
        const key = split.shift().trim();
        const value = split.join(':').trim();

        head.append(key, value);
    });

    return head;
};

class Courier {
    constructor(options = DEFAULT_COURIER_OPTIONS) {
        this._cache = options.cache;
        this._data = null;
        this._dataType = options.dataType;
        this._credentials = options.credentials;
        this._headers = options.headers;
        this._method = options.method;
        this._mode = options.mode;
        this._queryStrings = [];
        this._type = options.type;
        this._url = options.url;

        return this;
    }

    auth(username, password) {
        this._password = password;
        this._username = username;
    }

    cache(cacheType) {
        this._cache = cacheType;

        return this;
    }

    credentials(creds = 'include') {
        this._credentials = creds;

        return this;
    }

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

    dataFilter(fn) {
        this._dataFilter = fn;

        return this;
    }

    dataType(typeString) {
        this._dataType = typeString;
    }

    delete(url) {
        this._method = 'DELETE';
        this._url = url;

        return this;
    }

    get(url) {
        this._method = 'GET';
        this._url = url;

        return this;
    }

    head(url) {
        this._method = 'HEAD';
        this._url = url;

        return this;
    }

    headers(header, value) {
        if (typeof header === 'object' && !!header) {
            Object.getOwnPropertyNames(header).forEach((name) => {
                this._headers.append(name, header[name]);
            });
        } else {
            this._headers.append(header, value);
        }

        return this;
    }

    mode(modeString) {
        this._mode = modeString;
    }

    patch(url) {
        this._method = 'PATCH';
        this._url = url;

        return this;
    }

    post(url) {
        this._method = 'POST';
        this._url = url;

        return this;
    }

    put(url) {
        this._method = 'PUT';
        this._url = url;

        return this;
    }

    query(property, value) {
        if (typeof property === 'object' && !!property) {
            Object.getOwnPropertyNames(property).forEach((name) => {
                this._queryStrings.push(`${name}=${property[name]}`);
            });
        } else {
            this._queryStrings.push(`${property}=${value}`);
        }

        return this;
    }

    send(callback) {
        const newHeaders = new Headers(this._headers);

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

        const requestInit = {
            body: data ? new Body(data) : null,
            cache: this._cache,
            credentials: this._credentials,
            headers: newHeaders,
            method: this._method,
            mode: this._mode,
            password: this._password,
            username: this._username
        };

        const request = new Request(this._url, requestInit);

        let error = null;
        let rawResponse;

        fetch(request, requestInit)
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

    type(typeString) {
        this._type = typeString;

        return this;
    }
}

export default Courier;