#UploadResizer

is an Express middleware that aims to make resizing and moving of image file uploads
easier.

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

##Options

- __width__ and __height__: desired dimensions
- __target__: target directory
- __method__: can be resize (resize no cropping), resizeAndCrop (resize with cropping), thumb (more or less the same as resize and crop but faster)

##Missing features:

- define an array of methods for each type to batch resize files
- supply additional arguments to graphics magic
