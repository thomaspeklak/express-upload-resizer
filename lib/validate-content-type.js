"use strict";

var validContentTypes = [
    "image/png",
    "image/jpeg",
    "image/gif"
];

module.exports = function (file) {
    return validContentTypes.indexOf(file.type) != -1;
};