"use strict";

module.exports = {
    resize: function (img, out, options, cb) {
        img.geometry(options.width, options.height, options.arguments)
            .write(out, cb);
    },
    resizeAndCrop: function(img, out, options, cb) {
        img.geometry(options.width, options.height, "^")
            .gravity(options.gravity || "center")
            .crop(options.width, options.height)
            .write(out, cb);
    },
    thumb: function(img, out, options, cb) {
        img.thumb(options.width,
            options.height,
            out,
            options.quality || 60, cb);
    }
};

