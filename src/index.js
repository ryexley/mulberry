"use strict";

var extend = require("lodash/object/assign");
var sources = require("./sources");
var randomization = require("./randomization");
var dates = require("./dates");
var people = require("./people");
var util = require("./util");
var persistence = require("./persistence");

module.exports = extend({},
    sources,
    util,
    randomization,
    dates,
    people,
    persistence
);
