var path = require("path"),
    defaultConfig = require("./webpack.config"),
    testConfig = Object.assign({}, defaultConfig, {
        entry:[
            path.resolve(__dirname, "test/testCourier")
        ]
    });

module.exports = testConfig;