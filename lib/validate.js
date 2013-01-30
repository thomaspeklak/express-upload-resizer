"use strict";

var hasNoKeys = function (object) {
    return Object.keys(object).length == 0;
};

var isNoObject = function (object) {
    return typeof object != "object";
};

var requiredProperties = [
    "width",
    "height",
    "target"
];

var hasNotAllRequiredProperties = function (object) {
    return requiredProperties.some(function (prop) {
        return ! object.hasOwnProperty(prop);
    });

};

module.exports = function (options) {
    if (isNoObject(options)) { return false; }
    if (hasNoKeys(options)) { return false; }

    var notAllRequiredProperties = Object.keys(options).some(function (key) {
        return hasNotAllRequiredProperties(options[key]);
    });

    if (notAllRequiredProperties) { return false; }

    return true;
};
