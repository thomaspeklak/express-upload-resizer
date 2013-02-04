#UploadResizer
[![Build Status](https://travis-ci.org/thomaspeklak/express-upload-resizer.png)](https://travis-ci.org/thomaspeklak/express-upload-resizer)

is an Express middleware that aims to make resizing and moving of image file uploads
easier.

If you are looking for a general purpose upload solution try [express-upload](https://github.com/saintedlama/express-upload).

##Usage

You can use this middleware globally in your app your locally in your routes like this:

```javascript
app.use(require("express-upload-resizer")({
    picture : {
        width: 100,
        height: 100,
        target: __dirname + "/public/images/pictures",
        method: "resizeAndCrop"
    },
    logo : {
        width: 100,
        height: 50,
        target: __dirname + "/public/images/logos",
        method: "resize"
    }
});

app.post("/thumbs", require("express-upload-resizer")({
    thumb : {
        width: 50,
        height: 50,
        target: __dirname + "/public/images/thumbs",
        method: "thumb"
    }
}));
```

You can specify more than one resize method per tyoe by using an array of options like this:

```javascript
app.use(require("express-upload-resizer")({
    picture : [{
        width: 600,
        height: 400,
        target: __dirname + "/public/images/pictures",
        method: "resize"
    }, {
        width: 100,
        height: 100,
        target: __dirname + "/public/images/thumbs",
        method: "thumb"
    }]
});
```

##Options

- __width__ and __height__: desired dimensions
- __target__: target directory
- __method__: can be resize (resize no cropping), resizeAndCrop (resize with cropping), thumb (more or less the same as resize and crop but faster)

##Nameing of files

The middleware tries to keep the original filename if it is unique to the location. Otherwise it will generate a unique name by appending a counter to the name. E.g. _logo.png_ will become _logo__\_\_1__.png_ if another _logo.png_ already exists.

The path of the resized and moved file can be option with the `file.path` property, the name with `file.name`.

##Missing features:

- <del>define an array of methods for each type to batch resize files</del>
- supply additional arguments to graphics magic
