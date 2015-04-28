"use strict";

var mulberry = require("../dist/mulberry");
var each = require("lodash/collection/each");
// var extend = require("lodash/object/assign");
var repl = require("repl");

var envName = process.env.NODE_ENV || "dev";

var replServer = repl.start({
    prompt: "mulberry (" + envName + ") > ",
    ignoreUndefined: true
});

var setContext = function (target, context) {
    each(context, function (value, key) {
        target.context[key] = value;
    });
};

setContext(replServer, {

    lib: mulberry,

    print: function () {
        console.log(JSON.stringify(arguments, null, 2));
    }

});
