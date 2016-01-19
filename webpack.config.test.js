var assign = require('object.assign/polyfill')(),
    path = require("path"),
    defaultConfig = require("./webpack.config"),
    testConfig = assign({}, defaultConfig, {
        entry:[
            path.resolve(__dirname, "test/testCourier")
        ]
    });

module.exports = testConfig;