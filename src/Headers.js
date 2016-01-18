

import {
    normalizeName,
    normalizeValue
} from './utils';

class Headers {
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

    delete(name) {
        name = normalizeName(name);

        delete this.map[name];
    }

    forEach(callback/*, thisArg*/) {
        Object.getOwnPropertyNames(this.map).forEach((name) => {
            const map = this.map[name];

            map.forEach((value) => {
                callback.call(this, value, name, map);
                //callback.call(thisArg, value, name, this);
            }/*, this*/);
        }/*, this*/);
    }

    get(name) {
        name = normalizeName(name);

        const values = this.map[name];

        return values ? values[0] : null;
    }

    getAll(name) {
        name = normalizeName(name);

        return this.map[name] || [];
    }

    has(name) {
        name = normalizeName(name);

        return this.map.hasOwnProperty(name);
    }

    set(name, value) {
        name = normalizeName(name);
        value = normalizeName(value);

        this.map[name] = [value];
    }
}

export default Headers;