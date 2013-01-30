"use strict";

var validate = require("./lib/validate");
var createTargetDirectories = require("./lib/create-target-directories");

module.exports = function (options) {
    if (!validate(options)) {
        throw new Error("UploadResizer options invalid: ");
    }

    createTargetDirectories(options);

    return function (req, res, next) {

        next();
    };
};
