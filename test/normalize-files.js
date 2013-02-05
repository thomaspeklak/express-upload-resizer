"use strict";

var normalize = require("../lib/normalize-files");

describe("normalize files", function() {
    it("should update path and name property", function () {
        var files = {logo: [{
            path: 1,
            name: 2,
            processedPath: [3],
            processedName: [4]
        }]};
        var result = {logo: [{
            path: 3,
            name: 4,
        }]};

        normalize(files);
        files.should.eql(result);
    });
    it("should update path and name property of multiple files", function () {
        var files = {logo: [{
            path: 1, name: 2, processedPath: [3], processedName: [4]
        }],
        pictures: [
            {path: 5, name: 6, processedPath: 7, processedName: 8},
            {path: 9, name: 10, processedPath: 11, processedName: 12},
            {path: 13, name: 14, processedPath: 15, processedName: 16},
            {path: 17, name: 18, processedPath: 19, processedName: 20},
            {path: 21, name: 22, processedPath: 23, processedName: 24},
            {path: 25, name: 26, processedPath: 27, processedName: 28},
        ]};
        var result = {logo: [{
            path: 3, name: 4
        }],
        pictures: [
            { path: 7,  name: 8},
            { path: 11, name: 12},
            { path: 15, name: 16},
            { path: 19, name: 20},
            { path: 23, name: 24},
            { path: 27, name: 28},
        ]};

        normalize(files);
        files.should.eql(result);
    });
});
