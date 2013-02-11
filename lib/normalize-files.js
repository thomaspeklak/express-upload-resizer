"use strict";

var mapAllFiles = require("./map-all-files");

var normalize = function (file) {
    if (!file.processedPath) return;

    file.path = file.processedPath.length == 1 ? file.processedPath[0] : file.processedPath;
    file.name = file.processedName.length == 1 ? file.processedName[0] : file.processedName;

    delete file.processedPath;
    delete file.processedName;
};

var normalizeAll = function (files) {
    return files.forEach(normalize);
};

module.exports = function (files) {
    return mapAllFiles(files, {}, normalizeAll);
};
