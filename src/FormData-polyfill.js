/**
 * FormData polyfill for XMLHttpRequest2
 * Original author: Rob Wu
 * https://gist.github.com/Rob--W/8b5adedd84c0d36aba64
 */

if (!window.FormData || !window.FormData.prototype.append) {
    const ___send$rw = XMLHttpRequest.prototype.send;

    let FormData = function() {
        // Force a Constructor
        if (!(this instanceof FormData)) {
            return new FormData();
        }

        // Generate a random boundary - This must be unique with respect to the form's contents.
        this.boundary = '------RWWorkerFormDataBoundary' + Math.random().toString(36);

        let internal_data = this.data = [];

        /**
         * Internal method.
         * @param inp String | ArrayBuffer | Uint8Array  Input
         */
        this.__append = function(inp) {
            if (typeof inp === 'string') {
                for (let i = 0, len = inp.length; i < len; ++i) {
                    internal_data.push(inp.charCodeAt(i) & 0xff);
                }

                /*If ArrayBuffer or typed array */
            } else if (inp && inp.byteLength) {
                /* If ArrayBuffer, wrap in view */
                if (!('byteOffset' in inp)) {
                    inp = new Uint8Array(inp);
                }

                for (let i = 0, len = inp.byteLength; i < len; ++i) {
                    internal_data.push(inp[i] & 0xff);
                }
            }
        };
    };

    XMLHttpRequest.prototype.send = function(data) {
        if (data instanceof FormData) {
            if (!data.__endedMultipart) {
                data.__append('--' + data.boundary + '--\r\n');
            }

            data.__endedMultipart = true;

            this.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + data.boundary);

            data = new Uint8Array(data.data);
        }

        // Invoke original XHR.send
        return ___send$rw.call(this, data);
    };

    /**
     * @param {string} name
     * @param {String|Blob|File|Array|ArrayBuffer} value
     * @param {string} filename
     **/
    FormData.prototype.append = function(name, value, filename) {
        if (this.__endedMultipart) {
            // Truncate the closing boundary
            this.data.length -= this.boundary.length + 6;
            this.__endedMultipart = false;
        }

        if (arguments.length < 2) {
            throw new SyntaxError('Not enough arguments');
        }

        let part = '--' + this.boundary + '\r\nContent-Disposition: form-data; name="' + name + '"';

        if (value instanceof File || value instanceof Blob) {
            /* eslint-disable */
            return this.append(name, new Uint8Array(new FileReaderSync().readAsArrayBuffer(value)), filename || value.name);
            /* eslint-enable */
        } else if (typeof value.byteLength === 'number') {
            // Duck-typed typed array or array buffer
            part += '; filename="'+ (filename || 'blob').replace(/"/g,'%22') +'"\r\n';
            part += 'Content-Type: application/octet-stream\r\n\r\n';

            this.__append(part);
            this.__append(value);

            part = '\r\n';
        } else {
            part += '\r\n\r\n' + value + '\r\n';
        }

        this.__append(part);
    };

    // Export variable to the global scope
    window.FormData = FormData;
}

