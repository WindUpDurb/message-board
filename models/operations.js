/**
 * Created by david on 4/21/16.
 */

var fs = require("fs");
var uuid = require("uuid");
var path = require("path");

var threadListDataFile = path.join(__dirname, "../data/threads.json");
var directoryToThreads = path.join(__dirname, "../data/");

//sqlite database
var db = require("../config/db");

module.exports = {


    getThreadList : function (callback) {
        db.serialize(function () {
            db.all("SELECT * FROM currentThreadList", function (error, threadList) {
                callback(error, threadList);
            });

        });

    },

    createNewThread : function (newThread, callback) {
        //console.log("The new thread: ", newThread)
        db.serialize(function () {
            var statement = db.prepare("INSERT INTO currentThreadList VALUES (?, ?, ?, ?, ?)");
            statement.run(newThread.username, newThread.timeStamp, newThread.threadTitle, newThread.avatarURL, uuid());
            statement.finalize(function (error) {
                callback(error);
            });
        });
    },

    editPost : function (editData, callback) {

        db.serialize(function () {
            //just enable the ability to redo the post's body

        });


    },
    
    toDeleteData : function (threadToDelete, callback) {
        db.serialize(function () {
            db.run(`UPDATE toDelete SET threadToDelete = "${threadToDelete}"`);
        });
    },

    confirmDelete : function (callback) {
        db.serialize(function () {
            db.all("SELECT threadToDelete FROM toDelete", function (error, threadID) {
                var threadID = threadID[0].threadToDelete;
                db.run(`DELETE FROM currentThreadList WHERE postID = "${threadID}"`);
                callback(error);
            });
        })
    }




};