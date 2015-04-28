"use strict";

var take = require("lodash/array/take");
var shuffle = require("lodash/collection/shuffle");

module.exports = {

    random: function(min, max) {
        min = min || 1;
        max = max || 100;
        return Math.floor(Math.random() * (max - min + 1)) + parseInt(min, 10);
    },

    randomNumber: function(min, max) {
        return this.random(min, max);
    },

    randomFloat: function(min, max, digits) {
        min = min || 1;
        max = max || 100;
        digits = digits || this.random(1, 10);

        var target = this.random(min, max);

        return this.toFloat(target, digits);
    },

    toFloat: function(target, digits) {
        var randomMin = "",
            randomMax = "",
            index = 0;

        digits = digits || this.random(1, 10);

        while (index < digits) {
            randomMin += "1";
            randomMax += "9";
            index = index + 1;
        }

        return parseFloat(target + "." + this.random(randomMin, randomMax));
    },

    randomValue: function(source) {
        return source[this.random(0, (source.length - 1))];
    },

    randomSubset: function(source, count) {
        return take(shuffle(source), count);
    },

    randomNumbersToSum: function(options) {
        options = options || {};

        var current, min, max,
            sum = 0,
            index = 0,
            numbers = [];

        if (options.count && options.total) {
            max = options.max ? options.max : options.total;

            while (index < (options.count - 1)) {
                if (options.min && (options.min < (options.total - sum))) {
                    min = options.min;
                } else {
                    min = 1;
                }

                if (options.max && ((options.max - sum) > 0)) {
                    max = ((options.max - sum) - (options.count - index));
                } else {
                    max = ((options.total - sum) - (options.count - index));
                }

                current = this.random(min, max);
                sum = sum + current;
                numbers.push(current);
                index = index + 1;
            }

            numbers.push(options.total - sum);
        }

        return numbers;
    },

    randomFloatsToSum: function(options) {
        options = options || {};

        var current, min, max,
            sum = 0.00,
            index = 0,
            floats = [];

        if (options.count && options.total) {
            max = options.max ? options.max : options.total;

            while (index < options.count - 1) {
                if (options.min && (options.min < (options.total - sum))) {
                    min = options.min;
                } else {
                    min = 1.00;
                }

                if (options.max && ((options.max - sum) > 0)) {
                    max = ((options.max - sum) - (options.count - index));
                } else {
                    max = ((options.total - sum) - (options.count - index));
                }

                current = this.randomFloat(min, max);
                sum = sum + current;
                floats.push(current);
                index = index + 1;
            }

            floats.push(options.total - sum);
        }

        return floats;
    },

    randomString: function (options) {
        options = options || {};

        var index = 0,
            length = options.length || this.random(5, 10),
            letters = this.sources.letters,
            result = "";

        while (index < length) {
            result += this.randomValue(letters);
            index = index + 1;
        }

        return result.toLowerCase();
    }

};
