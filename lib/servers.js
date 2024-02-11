const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { WebSocketServer, WebSocket } = require("ws");
const wss = new WebSocketServer({ noServer: true });

function enableWS() {
  // Upgrade HTTP server to handle WebSocket
  server.on("upgrade", function upgrade(request, socket, head) {
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit("connection", ws, request);
    });
  });
}

module.exports = {
  app,
  wss,
  WebSocket,
  express,
  enableWS,
  server,
};
