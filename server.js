"use strict";

const PORT = process.env.PORT || 3000;

let http = require("http");
let jade = require("jade");
let nodeStatic = require("node-static");
let qs = require("qs");
let moment = require("moment");

let file = new nodeStatic.Server("./public");

http.createServer(function (request, response) {


    let parameters = request.url.split("/");
    parameters.shift();

    let queryStringParts = request.url.split("?");
    let path= queryStringParts[0];

    console.log("path ", path)

    switch (path) {
        case "/":
            var html = jade.renderFile("./views/index.jade", {
                currentPage: "Home"
            });
            response.end(html);
            break;
        case "/recentposts":
            var html = jade.renderFile("./views/recentPosts.jade", {
                currentPage: "Recent Posts"
            });
            response.end(html);
            break;
        case "/messageboard":
            var html = jade.renderFile("./views/messageBoard.jade", {
                currentPage: "Message Board"
            });
            response.end(html);
            break;
        case "/post":
            require("./posts")(parameters, response);
            break;
    };

    //serve static files
    file.serve(request, response);



})
    .listen(PORT, function (error) {
        if (error) return console.log(error);

        console.log(`Node server running on port ${PORT}`);
    });
