const http = require("http");
const fs = require("fs");
const WebSocket = require('ws');
const { pipeline } = require("stream");

const server = http.createServer((request, response) => {
    if (request.url === "/") {
        const file = fs.readFile("./public/index.html", (error, file) => {
            response.writeHead(200);
            response.end(file);
        });
    }
});

const wsServer = new WebSocket.Server({
    server
});

module.exports = {
    server,
    wsServer
};



