/**
 * Created by david on 4/22/16.
 */
"use strict";

var express = require("express");
var router = express.Router();

var jade = require("jade");
var operations = require("../models/operations");


router.get("/", function (request, response, next) {
   response.render("messageBoard");
});

router.get("/:postID", function (request, response, next) {

    var postID = request.params.postID;

    console.log("The post ID: ", postID);

    response.render("posts", {
        initialPostID: postID
    });

});

router.post("/:postID", function (request, response, next) {
   var postID = request.params.postID;

    response.send("Yup")
});

module.exports = router;