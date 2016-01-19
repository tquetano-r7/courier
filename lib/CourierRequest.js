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

var CourierRequest = function (_CourierBody) {
    _inherits(CourierRequest, _CourierBody);

    /**
     * creates new CourierRequest object based on input passed
     * if input is a CourierRequest itself, then use the CourierRequest input, else use the options passed
     * with defaults
     *
     * @param {CourierRequest|string} input
     * @param {Object} options
     */

    function CourierRequest(input) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, CourierRequest);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CourierRequest).call(this));

        var body = options.body;

        if ((0, _utils.isPrototypeOfDataType)(input, CourierRequest)) {
            if (input.bodyUsed) {
                throw new TypeError('Already read');
            }

            _this.url = input.url;
            _this.credentials = input.credentials;

            if (!options.headers) {
                _this.headers = new _CourierHeaders2.default(input.headers);
            }

            _this.method = input.method;
            _this.mode = input.mode;

            if (!body) {
                body = input._bodyInit;
                input.bodyUsed = true;
            }
        } else {
            _this.url = input;
        }

        _this.cache = options.cache || _this.cache || 'default';
        _this.credentials = options.credentials || _this.credentials || 'omit';
        _this.password = options.password || null;
        _this.username = options.username || null;

        if (options.headers || !_this.headers) {
            _this.headers = new _CourierHeaders2.default(options.headers);
        }

        _this.method = (0, _utils.normalizeMethod)(options.method || _this.method || 'GET');
        _this.mode = options.mode || _this.mode || null;
        _this.referrer = null;

        if ((_this.method === 'GET' || _this.method === 'HEAD') && body) {
            throw new TypeError('Body not allowed for GET or HEAD requests');
        }

        _this._initBody(body);
        return _this;
    }

    return CourierRequest;
}(_CourierBody3.default);

/**
 * clones existing CourierRequest into a new CourierRequest
 *
 * @returns {CourierRequest}
 */

CourierRequest.prototype.clone = function () {
    return new CourierRequest(this);
};

exports.default = CourierRequest;
module.exports = exports['default'];