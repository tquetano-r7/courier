import {
    normalizeName,
    normalizeValue
} from './utils';

class Headers {
    /**
     * sets headers map based on headers passed
     *
     * @param {Headers|Object} headers
     */
    constructor(headers) {
        this.map = {};

        if (headers instanceof Headers) {
            headers.forEach((value, name) => {
                this.append(name, value);
            });
        } else if (headers) {
            Object.getOwnPropertyNames(headers).forEach((name) => {
                this.append(name, headers[name]);
            });
        }
    }

    /**
     *
     *
     * @param {string} name
     * @param {*} value
     */
    append(name, value) {
        name = normalizeName(name);
        value = normalizeValue(value);

        let list = this.map[name];

        if (!list) {
            list = [];

            this.map[name] = list;
        }

        list.push(value);
    }

    /**
     * removes header from map
     *
     * @param {string} name
     */
    delete(name) {
        name = normalizeName(name);

        delete this.map[name];
    }

    /**
     * loops over map and executes callback function
     *
     * @param {Function} callback
     */
    forEach(callback) {
        Object.getOwnPropertyNames(this.map).forEach((name) => {
            const map = this.map[name];

            map.forEach((value) => {
                callback.call(this, value, name, map);
            });
        });
    }

    /**
     * gets specific header value in map
     *
     * @param {string} name
     * @returns {*}
     */
    get(name) {
        name = normalizeName(name);

        const values = this.map[name];

        return values ? values[0] : null;
    }

    /**
     * gets specific header array in map
     *
     * @param {string} name
     * @returns {Array}
     */
    getAll(name) {
        name = normalizeName(name);

        return this.map[name] || [];
    }

    /**
     * determines if the header exists in the map
     *
     * @param {string} name
     * @returns {boolean}
     */
    has(name) {
        name = normalizeName(name);

        return this.map.hasOwnProperty(name);
    }

    /**
     * sets specific header in map
     *
     * @param {string} name
     * @param {*} value
     */
    set(name, value) {
        name = normalizeName(name);
        value = normalizeName(value);

        this.map[name] = [value];
    }
}

export default Headers;