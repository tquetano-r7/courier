

const HTTP_METHODS = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

export const canCreateNewBlob = () => {
    try {
        new Blob();

        return true;
    } catch (ex) {
        return false;
    }
};

export const consumed = (body) => {
    if (body.bodyUsed) {
        return Promise.reject(new TypeError('Already read'));
    }

    body.bodyUsed = true;
};

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

export const isPrototypeOfDataType = (body, DataType) => {
    return DataType.prototype.isPrototypeOf(body);
};

export const normalizeMethod = (method) => {
    const upCased = method.toUpperCase();

    return !!~HTTP_METHODS.indexOf(upCased) ? upCased : method;
};

export const normalizeName = (name) => {
    if (typeof name !== 'string') {
        name = String(name);
    }

    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
        throw new TypeError('Invalid character in header field name');
    }


    return name.toLowerCase();
};

export const normalizeValue = (value) => {
    if (typeof value !== 'string') {
        value = String(value);
    }

    return value;
};

export const readBlobAsArrayBuffer = (blob) => {
    let reader = new FileReader();

    reader.readAsArrayBuffer(blob);

    return fileReaderReady(reader);
};

export const readBlobAsText = (blob) => {
    let reader = new FileReader();

    reader.readAsText(blob);

    return fileReaderReady(reader);
};

export const support = {
    arrayBuffer: 'ArrayBuffer' in window,
    blob: 'FileReader' in window && 'Blob' in window && canCreateNewBlob(),
    formData: 'FormData' in window
};

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
    isPrototypeOfDataType,
    normalizeMethod,
    normalizeName,
    normalizeValue,
    readBlobAsArrayBuffer,
    readBlobAsText,
    support,
    xhrResponseURL
};