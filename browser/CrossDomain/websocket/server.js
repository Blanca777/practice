// server.js
let express = require('express');
const StringDecoder = require('string_decoder').StringDecoder;

const decoder = new StringDecoder('utf8');
let app = express();
let WebSocket = require('ws'); //记得安装ws
let wss = new WebSocket.Server({ port: 3000 });
wss.on('connection', function (ws) {
  ws.on('message', function (data) {
    console.log(JSON.parse(decoder.write(data)));
    ws.send('我不爱你');
  });
});
