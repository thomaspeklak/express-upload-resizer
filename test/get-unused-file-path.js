"use strict";

var gufp = require("../lib/get-unused-file-path");

describe("get unused file path", function () {
    it("should return an unused path", function (done) {
       gufp(__filename + ".test", function (path) {
           path.should.eql(__filename + ".test");
           done();
       });
    });
    it("should return an unused path that is different from the testfilename", function (done) {
       gufp(__filename, function (path) {
           path.should.eql(__filename.replace(".js", "__1.js") );
           done();
       });
    });
});
