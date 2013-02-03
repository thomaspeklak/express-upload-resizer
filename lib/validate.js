"use strict";

var hasNoKeys = function (object) {
    return Object.keys(object).length == 0;
};

var isNoObject = function (object) {
    return typeof object != "object";
};

var hasNotAllRequiredProperties = function (object) {
    return !(object.hasOwnProperty("target") &&
        (object.hasOwnProperty("width") || object.hasOwnProperty("height"))
    );

};

module.exports = function (options) {
    if (isNoObject(options)) { return false; }
    if (hasNoKeys(options)) { return false; }

    var notAllRequiredProperties = Object.keys(options).some(function (key) {
        return options[key].some(function(option) {return hasNotAllRequiredProperties(option)});
    });

    if (notAllRequiredProperties) { return false; }

    return true;
};
