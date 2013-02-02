"use strict";

var availableFileExtensions = {
    "image/jpg" : ".jpg",
    "image/jpeg" : ".jpg",
    "image/png" : ".png",
    "image/gif" : ".gif"
};

module.exports = function (name, type) {
    var extension = availableFileExtensions[type];
    var safeName =  name.toLowerCase()
        .replace(/[^a-z0-9\-\._]/g, "_")
        .replace(/\.+/g, ".");

    if (extension) safeName = safeName.replace(/\.[a-z]{3,4}/, "") + extension;

    return safeName;
};
