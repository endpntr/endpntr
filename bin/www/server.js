const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { WebSocketServer } = require("ws");
const wss = new WebSocketServer({ noServer: true }); // use own server
const config = require("../../lib/config");

wss.on("connection", (ws, req) => {
  ws.endpoint = req.url.slice(req.url.lastIndexOf("/") + 1, req.url.length);
});

// when client sends upgrade request, fulfill it
server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});

server.listen(config.PORT, () => console.log(`Listening on ${config.PORT}`));

module.exports = {
  app,
  wss,
};
