'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _CourierBody2 = require('./CourierBody');

var _CourierBody3 = _interopRequireDefault(_CourierBody2);

var _CourierHeaders = require('./CourierHeaders');

var _CourierHeaders2 = _interopRequireDefault(_CourierHeaders);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var REDIRECT_STATUSES = [301, 302, 303, 307, 308];

var CourierResponse = function (_CourierBody) {
    _inherits(CourierResponse, _CourierBody);

    /**
     * receives _bodyInit inherited from Body and applies response aspects from it
     *
     * @param {*} bodyInit
     * @param {Object} options
     */

    function CourierResponse(bodyInit) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, CourierResponse);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CourierResponse).call(this));

        _this._initBody(bodyInit);

        _this.status = options.status;

        var isValidResponse = _this.status >= 200 && _this.status < 300;

        if (isValidResponse) {
            if (window.location.hostname !== (0, _utils.getHostname)(options.url)) {
                _this.type = options.mode === 'no-cors' ? 'opaque' : 'cors';
            } else {
                _this.type = 'basic';
            }
        } else {
            _this.type = 'error';
        }

        _this.ok = isValidResponse;
        _this.headers = options.headers instanceof _CourierHeaders2.default ? options.headers : new _CourierHeaders2.default(options.headers);
        _this.statusText = options.statusText;
        _this.url = options.url || '';
        return _this;
    }

    return CourierResponse;
}(_CourierBody3.default);

/**
 * clone existing CourierResponse into new CourierResponse
 *
 * @returns {CourierResponse}
 */

CourierResponse.prototype.clone = function () {
    return new CourierResponse(this._bodyInit, {
        headers: new _CourierHeaders2.default(this.headers),
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
CourierResponse.prototype.error = function () {
    var response = new CourierResponse(null, {
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
CourierResponse.prototype.redirect = function (url, status) {
    if (! ~REDIRECT_STATUSES.indexOf(status)) {
        throw new RangeError('Invalid status code');
    }

    return new CourierResponse(null, {
        headers: {
            location: url
        },
        status: status
    });
};

exports.default = CourierResponse;
module.exports = exports['default'];