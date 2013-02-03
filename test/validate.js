"use strict";

var v = require("../lib/validate");

describe("validate", function () {
    it("should return true on valid options", function () {
        v({l: [{width: 10, height: 10, target: "test"}]}).should.be.ok
        v({l: [{height: 10, target: "test"}]}).should.be.ok
        v({l: [{width: 10, target: "test"}]}).should.be.ok
    });

    it("should return false on invalid options", function () {
        v({l: [{target: "test"}]}).should.not.be.ok
        v({l: [{width: 10, height: 10}]}).should.not.be.ok
    });
});
