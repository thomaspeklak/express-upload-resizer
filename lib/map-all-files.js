"use strict";

var util = require("util");

module.exports = function (files, options, fn, reduceFn) {
    var types = Object.keys(files);

    var mappedFiles =  types.map(function (type) {
        if (util.isArray(files[type])) {
            if (util.isArray((files[type][0]))) {
                return fn(files[type][0], options[type]);
            }
            return fn(files[type], options[type]);
        }
        return fn([files[type]], options[type]);
    });

    if (reduceFn) return mappedFiles.reduce(reduceFn);

    return mappedFiles;
};
