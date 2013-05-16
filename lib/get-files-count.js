var mapAllFiles  = require("./map-all-files");

var sum = function (a, b) { return a + b; };

var countFiles = function (files, options) {
    if (!options) return 0;
    return options.length * files.length;
};

module.exports = function (files, options) {
    return mapAllFiles(files, options, countFiles, sum);
};
