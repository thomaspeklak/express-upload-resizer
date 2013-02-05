"use strict";

var validate = require("../lib/validate-content-type");

describe("validate content type", function(){
    it("should return true on a valid type", function () {
        var validContentTypes = [
            "image/png",
            "image/jpeg",
            "image/gif"
        ];

        validContentTypes.forEach(function (contentType) {
            validate({type: contentType}).should.be.ok;
        });
    });

    it("should return false on a not supported content type", function () {
        var validContentTypes = [
            "text/plain",
            "application/json",
            "image/tiff"
        ];

        validContentTypes.forEach(function (contentType) {
            validate({file: contentType}).should.not.be.ok;
        });
    });
});
