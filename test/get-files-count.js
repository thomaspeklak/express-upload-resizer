"use strict";

var getFilesCount = require("../lib/get-files-count");

describe("getFilesCount", function () {
    it("should return 1 on a single file", function () {
        var options = { logo: [1]};

        var files = { logo : { "a files object": 1}};
        getFilesCount(files, options).should.eql(1);

        var files = { logo : [{ "a files object": 1}]};
        getFilesCount(files, options).should.eql(1);

        var files = { logo : [[{ "a files object": 1}]]};
        getFilesCount(files, options).should.eql(1);
    });

    it("should return 2 on multiple files", function() {
        var options = { logo: [1], test: [1]};

        var files = { logo : { "a files object": 1}, test : { t: 1 }};
        getFilesCount(files, options).should.eql(2);

        var files = { logo : [{ "a files object": 1}, { t: 1 }]};
        getFilesCount(files, options).should.eql(2);

        var files = { logo : [[{ "a files object": 1}, { t: 1 }]]};
        getFilesCount(files, options).should.eql(2);
    });

    it("should return 3 on multiple files", function() {
        var options = { logo: [1], test: [1], picture: [1]};

        var files = { logo : { "a files object": 1}, test : [{ t: 1 }, {s:1}]};
        getFilesCount(files, options).should.eql(3);

        var files = { logo : [{ "a files object": 1}, { t: 1 } , {s: 1}]};
        getFilesCount(files, options).should.eql(3);

        var files = { logo : [[]], test: [[{ "a files object": 1}, { t: 1 }, {s: 1}]]};
        getFilesCount(files, options).should.eql(3);
    });
});
