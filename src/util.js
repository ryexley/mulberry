"use strict";

module.exports = {

    uuid: function () {
        // http://stackoverflow.com/a/2117523/18831
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === "x" ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },

    sentence: function (options) {
        options = options || {};

        var self = this;
        var index;
        var words = this.sources.loremIpsum;
        var length = options.words || this.random(5, 15);
        var result = [];

        for (index = 0; index < length; index++) {
            result.push(words[this.random(0, words.length)]);
        }

        if (options.include && options.include.length) {
            options.include.forEach(function (item) {
                result.splice(self.random(0, result.length), 0, item);
            });
        }

        result = result.join(" ");
        result = result.charAt(0).toUpperCase() + result.slice(1) + ".";

        return result;
    }

};
