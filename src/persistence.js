"use strict";

// var fs = require("fs");
var path = require("path");
var extend = require("lodash/object/assign");
var moment = require("moment");

var defaultFilename = "mulberry-data.json";
var defaultFilePath = path.join(__dirname, "./data", defaultFilename);

var defaults = {
    data: { error: "No data provided" },
    expires: moment(new Date()).add(1, "hours").toDate(),
    target: {
        store: "fs",
        filename: defaultFilename,
        path: defaultFilePath
    }
};

module.exports = {

    save: function (options) {
        console.log(path.dirname(path.resolve("./index.js")));
        options = extend({}, defaults, options);
        this._fs.initFile(options, function () { return; });
    },

    _fs: {
        initFile: function (options, next) {
            options = options || {};

            console.log("Initializing target file with options", options);
            next();
        }
    },

    _browser: {

    }

};
