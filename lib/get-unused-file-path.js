"use strict";

var fs = require("fs");
var uuid = require("node-uuid");
var recentlyUsedFileNames = [];
var lastLength = 0;

var generateNewPath = function (path) {
    return path.replace(/[^\/]*(\.[a-z]{3,4})$/, uuid.v4() + "$1");
};

module.exports = function getUniqueFilePath(path, cb) {
    fs.exists(path, function (exists) {
        if (exists || recentlyUsedFileNames.indexOf(path) != -1) {
            var newPath = generateNewPath(path);
            return getUniqueFilePath(newPath, cb);
        }

        recentlyUsedFileNames.push(path);
        cb(path);
    });
};

setInterval(function () {
    if (!lastLength) {
        lastLength = recentlyUsedFileNames.length;
        return;
    }

    recentlyUsedFileNames = recentlyUsedFileNames.slice(lastLength);
    lastLength = recentlyUsedFileNames.length;
}, 60000);
