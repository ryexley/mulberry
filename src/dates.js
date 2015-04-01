"use strict";

var moment = require("moment");

module.exports = {

    minutesPerYear: 525949,

    randomDate: function() {
        var date = moment();
        var minutes = this.random(-100000, 100000);
        date = date.add(minutes, "minutes");
        return date.toDate();
    },

    randomDateGreaterThan: function(greaterThan) {
        var newDate = moment(greaterThan).add(this.random(15, this.minutesPerYear, "minutes"));
        return newDate.toDate();
    },

    randomPastDateAfter: function(after) {
        after = moment(after);
        var minutesDifference = moment().diff(after, "minutes");
        var randomMinutes = this.random(15, minutesDifference);
        var newDate = after.add(randomMinutes, "minutes");
        return newDate.toDate();
    },

    randomPastDateBefore: function(before) {
        before = moment(before);
        var minutesDifference = moment().diff(before, "minutes");
        var randomMinutes = this.random(15, minutesDifference);
        var newDate = before.add(-randomMinutes, "minutes");
        return newDate.toDate();
    },

    randomDateLessThan: function(lessThan) {
        var newDate = moment(lessThan).add((this.random(15, this.minutesPerYear) * -1), "minutes");
        return newDate.toDate();
    },

    randomFutureDate: function() {
        return this.randomDateGreaterThan(new Date().toISOString());
    },

    randomPastDate: function() {
        return this.randomDateLessThan(new Date().toISOString());
    }

};
