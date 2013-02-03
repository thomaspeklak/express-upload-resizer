"use strict";

var mkdirp = require("mkdirp").sync;
var fs = require("fs");

var dirExists = function (path, cb) {
    fs.stat(path, function (err, stats) {
        cb(!err && stats.isDirectory(), stats);
    });
};

var createNonExistentDirectory = function (option) {
    var path = option.target;
    dirExists(path, function (exists, stats) {
        if (stats && stats.isFile()) {
            throw new Error("UploadResizer: target directory is a file");
        }

        if (!exists) {
            mkdirp(path);
        }
    });
};

module.exports = function (options) {
    Object.keys(options).forEach(function (o) {
        var option = options[o];
        option.forEach(createNonExistentDirectory);
    });
};


