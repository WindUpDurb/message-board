"use strict";

var express = require("express");
var router = express.Router();

var jade = require('jade');
var operations = require("../models/operations");

router.get("/", function (request, response, next) {
    operations.getThreadList(function (error, threadList) {
        if (error) {
            return response.status(400).send(error);
        }
        console.log(threadList);
        var numOfThreads = threadList.length;
        response.render("messageBoard", {
            currentPage: "Message Board",
            numOfThreads: numOfThreads,
            threads: threadList,
            //threadID:
        });

    })

});

router.post("/", function (request, response, next) {
    var newThread = request.body;
    //if the delete button is pushed
    if (newThread.hasOwnProperty("toDelete")) {
        console.log(typeof newThread.toDelete);

        operations.toDeleteData(newThread.toDelete, function (error) {
            if (error) {
                return response.status(400).send(error);
            }
            response.send();
        });

    } else {
        operations.createNewThread(newThread, function (error) {
            if (error) {
                return response.status(400).send(error);
            }
            response.send;
        });
        response.send("Response Complete");
    }
});

router.delete("/", function (request, response, next) {
   var threadToDelete = request.body;

    operations.confirmDelete(function(error, threadID) {
        if (error) {
            return response.status(400).response.send(error);
        }
        console.log(threadID);
    });

    response.send("Delete Request Received");

});





module.exports = router;