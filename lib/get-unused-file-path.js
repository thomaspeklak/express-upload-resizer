"use strict";

var fs = require("fs");
var recentlyUsedFileNames = [];
var lastLength = 0;
var fileNumbering = /__([0-9]+)(\.[a-z]{3,4})$/;
var fileEnding = /(.[a-z]{2,4})$/;

var generateNewPath = function (path) {
    var match = path.match(fileNumbering);
    if (match) {
        return path.replace(fileNumbering,
                            "__" + (parseInt(match[1], 10) + 1) + match[2]);
    }

    return path.replace(fileEnding, "__1$1");
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
