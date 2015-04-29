"use strict";

var fs = require("fs");
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
        options = extend({}, defaults, options);

        this._fs.initFile(options, function () { return; });
    },

    _isExpired: function (expiration) {
        if (expiration) {
            return moment(new Date()).isAfter(moment(expiration));
        } else {
            return true;
        }
    },

    _fs: {
        initFile: function (options, next) {
            options = options || {};

            var targetFile;

            fs.exists(path.dirname(path.resolve(options.target.path)), function (exists) {
                if (!exists) {
                    fs.mkdir(options.target.path, function () {
                        targetFile = path.join(options.target.path, options.target.filename);

                        fs.exists(targetFile, function (targetFileExists) {
                            if (!targetFileExists) {
                                this.saveFile(options, { created: new Date() }, function (err) {
                                    if (err) {
                                        throw err;
                                    }

                                    return next();
                                });
                            }

                            return next();
                        });
                    });
                } else {
                    targetFile = path.join(options.target.path, options.target.filename);

                    fs.exists(targetFile, function (targetFileExists) {
                        if (!targetFileExists) {
                            this.saveFile(options, { created: new Date() }, function (err) {
                                if (err) {
                                    throw err;
                                }

                                return next();
                            });
                        }

                        return next();
                    });
                }
            });
        },

        saveFile: function (options, contents, next) {
            options = options || {};

            var targetFile;

            if (typeof contents === "object") {
                contents = JSON.stringify(contents);
            }

            if (options && options.target && options.target.path && options.target.filename) {
                targetFile = path.join(options.target.path, options.target.filename);
            } else {
                throw new Error("File options not defined");
            }

            fs.writeFile(targetFile, contents, { encoding: "utf-8" }, function (err) {
                if (err) {
                    throw err;
                }

                next();
            });
        }
    },

    _browser: {

    }

};
