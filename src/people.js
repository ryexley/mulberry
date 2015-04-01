"use strict";

module.exports = {

    fullName: function () {
        return this.randomValue(this.sources.firstNames) + " " + this.randomValue(this.sources.lastNames);
    }

};
