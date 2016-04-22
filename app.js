/**
 * Created by david on 4/21/16.
 */
"use strict";

const PORT = process.env.PORT || 3000;

//requires: loading libraries
var express = require("express");
var morgan = require("morgan");
var jade = require("jade");
var moment = require("moment");
var bodyParser = require("body-parser");
var uuid = require("uuid");
//operations
var operations = require("./models/operations");

//express declaration
var app = express();

app.use( morgan("dev") );

app.use( bodyParser.urlencoded({ extended: false }));
app.use( bodyParser.json() );

//serve out static files
app.use( express.static("public") );

//for jade
app.set("view engine", "jade");

/*app.route("/posts")
    .get(function (request, response, next) {
        
        
    })*/


app.route("/messageboard")
    .get(function (request, response, next) {

        console.log("message board params: ", request.params.postID);

        operations.getThreadList(function (error, threadList) {
            if (error) {
                return response.status(400).send(error);
            }

            var numOfThreads = threadList.length;
            //webpage render
            response.render("messageBoard", {
                currentPage: "Message Board",
                numOfThreads: numOfThreads,
                threads: threadList
            });

        });
    })
    .post(function (request, response, next) {

        var newThread = request.body;

        operations.createNewThread(newThread, function (error) {
            if (error) {
                return response.status(400).send(error);
            }
            response.send;
        });

       response.send("\n")
    });

app.get("/", function (request, response, next) {
   response.render("index", {
       currentPage: "Home"
   });
});

//for different pages for each thread
app.get("/posts/:postID", function (request, response, next) {

    if (request.params.postID.indexOf(".") !== -1) {
        next();
    }

    var postID = request.params.postID;


    //var postID = request.params.postID;

    console.log("THe post ID: " , postID);

    operations.getThread(postID, function (error, thread){
        if (error) {
            return response.status(400).next(error);
        }
        console.log("The end thread: ", thread)
        console.log("before render \n");
        response.render("posts", {
            currentPage: "Post"
        });
    });


});


//debugging attempts
//and for debugging purposes

app.get("/posts/", function (request, response, next) {

    /*    if (request.params.postID.indexOf(".") !== -1) {
     console.log(" got it");
     response.sendFile(request.params.postID ,{root: "./public"})
 /*    }*!/

    var postID = request.params.postID;


    //var postID = request.params.postID;

    console.log("THe post ID: " , postID);

    operations.getThread(postID, function (error, thread){
        if (error) {
            return response.status(400).send(error);
        }
        console.log("The end thread: ", thread)
        console.log("before render \n");*/
        response.render("posts", {
            currentPage: "Post"
        });


});


app.use(function(request, response, next) {
    response.status(404).send("Not  Found.")
});

app.listen(PORT, function (error) {
    console.log(error || `Server listening on port ${PORT}`);
});


