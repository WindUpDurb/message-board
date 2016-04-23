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

//routers
app.use("/messageboard", require("./routes/messageboard"));
app.use("/posts", require("./routes/posts"));

app.get("/", function (request, response, next) {
   response.render("index", {
       currentPage: "Home"
   });
});


app.use(function(request, response, next) {
    response.status(404).send("Not  Found.")
});

app.listen(PORT, function (error) {
    console.log(error || `Server listening on port ${PORT}`);
});


