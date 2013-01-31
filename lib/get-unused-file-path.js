"use strict";

var fs = require("fs");
var uuid = require("node-uuid");

var generateNewPath = function (path) {
    return path.replace(/[^\/]*(\.[a-z]{3,4})$/, uuid.v4() + "$1");
};

module.exports = function getUniqueFilePath(path, cb) {
    fs.exists(path, function (exists) {
        if (exists) {
            var newPath = generateNewPath(path);
            return getUniqueFilePath(newPath, cb);
        }

        cb(path);
    });
};
