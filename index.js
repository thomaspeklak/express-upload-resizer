"use strict";

var path = require("path");
var fs = require("fs");
var util = require("util");
var validate = require("./lib/validate");
var createTargetDirectories = require("./lib/create-target-directories");
var getUniqueFilePath = require("./lib/get-unused-file-path");

var sum = function (a, b) { return a + b; };

var getFilesCount = function (files) {
    var types = Object.keys(files);

    return types.map(function (type) {
        if (util.isArray(files[type])) {
            if (util.isArray((files[type][0]))){
                return files[type][0].length;
            }
            return files[type].length;
        }
        return 1;
    }).reduce(sum);

};

var moveFile = function (oldPath, newPath, cb) {
    fs.rename(oldPath, newPath, cb);
};

var processFile = function (file, type, cb) {
    if (!this[type]) return cb();

    var suggestedFilePath = path.join(this[type].target, file.name);
    getUniqueFilePath(suggestedFilePath, function (newPath) {
        moveFile(file.path, newPath, cb);
        file.path = newPath;
    });
};

var resizeFiles = function (req, res, next) {
    if (!req.files || !Object.keys(req.files).length) return next();

    var options = this;
    var files = req.files;
    var types = Object.keys(req.files);
    var filesCount = getFilesCount(req.files);
    var processFileLocal = processFile.bind(options);
    var processed = 0;
    var done = function () {
        processed += 1;

        if (processed == filesCount) {
            next();
        }
    };

    types.map(function (type) {
        if (util.isArray(files[type])) {
            var filesOfType = files[type];
            if (util.isArray((filesOfType[0]))) {
                filesOfType = filesOfType[0];
            }
            filesOfType.forEach(function (file) {
                processFileLocal(file, type, done);
            });
        } else {
            processFileLocal(files[type], type, done);
        }
    });
};


module.exports = function (options) {
    if (!validate(options)) {
        throw new Error("UploadResizer options invalid: ");
    }

    createTargetDirectories(options);

    return resizeFiles.bind(options);
};
