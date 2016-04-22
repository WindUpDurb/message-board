/**
 * Created by david on 4/21/16.
 */

var fs = require("fs");
var uuid = require("uuid");
var path = require("path");

var threadListDataFile = path.join(__dirname, "../data/threads.json");

module.exports = {

    getThreadList : function (callback) {
        fs.readFile(threadListDataFile, function (error, data) {
            if (error) {
                callback(error);
                return;
            }

            try {
                var threadList = JSON.parse(data);
            } catch (error) {
                return callback(error);
            }
            //make sure to return null as well as the parsed data
            callback(null, threadList);
        })
    },

    createNewThread : function (newThread, callback) {

        this.getThreadList(function (error, threadList) {
            
            if(error) {
                return callback(error);
            }

            var threadToAdd = {
                username : newThread.username,
                timestamp : newThread.timestamp,
                threadTitle : newThread.threadTitle,
                avatarURL : newThread.avatarURL,
                postID : uuid()
            };

            threadList.push(threadToAdd);

            fs.writeFile(threadListDataFile, JSON.stringify(threadList), function (error) {
                callback(error);
            });
        });

    }




};