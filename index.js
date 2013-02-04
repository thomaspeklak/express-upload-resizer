"use strict";

var path = require("path");
var fs = require("fs");
var util = require("util");
var gm = require("gm");
var validate = require("./lib/validate");
var createTargetDirectories = require("./lib/create-target-directories");
var getSafeFileName = require("./lib/get-safe-file-name");
var getUniqueFilePath = require("./lib/get-unused-file-path");
var normalizeFiles = require("./lib/normalize-files");
var getFilesCount = require("./lib/get-files-count");
var resizeMehtods = require("./lib/resize-methods");
var validateContentType = require("./lib/validate-content-type");

var moveFile = function (file, newPath, options, cb) {
    var oldPath = file.path;

    if (options.method && resizeMehtods[options.method] && validateContentType(file)) {
        var image = gm(oldPath);
        return resizeMehtods[options.method](
            image,
            newPath,
            options,
            cb
        );
    }

    fs.rename(oldPath, newPath, cb);
};

var processFile = function (file, type, cb) {
    var options = this;
    if (!options[type]) return cb();

    file.processedPath = [];
    file.processedName = [];
    options[type].forEach(function (options) {
        var suggestedFilePath = path.join(options.target,
                                          getSafeFileName(file.name, file.type)
                                         );
        getUniqueFilePath(suggestedFilePath, function (newPath) {
            moveFile(file, newPath, options, cb);
            file.processedPath.push(newPath);
            file.processedName.push(newPath.replace(/.*\//, ""));
        });
    });
};

var resizeFiles = function (req, res, next) {
    if (!req.files || !Object.keys(req.files).length) return next();

    var options = this;
    var files = req.files;
    var types = Object.keys(req.files);
    var filesCount = getFilesCount(req.files, options);
    var processFileLocal = processFile.bind(options);
    var processed = 0;
    var done = function () {
        processed += 1;

        if (processed == filesCount) {
            normalizeFiles(req.files);
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


var wrapOptions = function (options) {
    Object.keys(options).forEach(function (key) {
        if (!util.isArray(options[key])) options[key] = [options[key]];
    });
};

module.exports = function (options) {
    wrapOptions(options);
    if (!validate(options)) {
        throw new Error("UploadResizer options invalid: ");
    }

    createTargetDirectories(options);

    return resizeFiles.bind(options);
};
