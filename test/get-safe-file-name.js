"use strict";

var gsfn = require("../lib/get-safe-file-name");

describe("getSafeFileName", function(){
    it("should replace äöü!\"'§$%&/()=/\\ with underscores", function(){
        var name = "äöü!\"'§$%&/()=/\\";
        gsfn(name).should.eql(name.replace(/./g, '_'));
    });

    it("should append extensions for known image types", function(){
        gsfn("test.png", "image/png").should.eql("test.png");
        gsfn("test.gif", "image/png").should.eql("test.png");
        gsfn("test.gif", "image/jpeg").should.eql("test.jpg");
        gsfn("test", "image/jpeg").should.eql("test.jpg");
        gsfn("test.php", "application/php").should.eql("test.php");
    });

    if("should replace .. ... .. with .", function(){
        gsfn("../.../...../..test.php").should.eql("._._._.test.php");
    });

    it("should not replace valid characters", function(){
        var name = "1234567890qwertzuiopasdfghjklyxcvbnm.-_";
        gsfn(name).should.eql(name);
    });
});
