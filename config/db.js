/**
 * Created by david on 4/22/16.
 */
"use strict";

var path = require("path");

var dbCurrentThreadsPath = path.join(__dirname, "../data/currentThreadList.db");

var sqlite3 = require("sqlite3").verbose();

var dbCurrentThreads = new sqlite3.Database(dbCurrentThreadsPath);

module.exports = dbCurrentThreads;