/**
 * Created by david on 4/20/16.
 */

"use strict";

var jade = require("jade");

module.exports = function (parameters, response) {

    //to be added to
    var postsBank = ["01", "02", "03"];
    var postNumber = parameters[0].split("=")[1];

    if(parameters[0].indexOf("?") !== -1 && postsBank.indexOf(postNumber) !== -1) {
        var postIndex = parameters.shift().split("?")[1].split("=").join("");
        var html = jade.renderFile(`./views/${postIndex}.jade`);
        response.end(html);
    }

    var html = jade.renderFile(`./views/messageBoard.jade`);
    response.end(html);
};