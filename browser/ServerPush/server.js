const express = require("express");
const stream = require("stream");
const SseStream = require("ssestream");
const multer = require("multer"); //Multer 不会处理任何非 multipart/form-data 类型的表单数据
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname));
let sse;
let contentId = 0;
function dataString(data) {
  if (typeof data === "object") return dataString(JSON.stringify(data));
  return data
    .split(/\r\n|\r|\n/)
    .map((line) => `data: ${line}\n`)
    .join("");
}
app.get("/sse", (req, res) => {
  // sse = new SseStream.default(req);
  // sse.pipe(res);
  sse = new stream.Transform({ objectMode: true });
  // req.readableObjectMode = true; //对象模式: 流的实现可以使用其他类型的 JavaScript 值（除了 null，它在流中具有特殊用途）
  // req.socket.setKeepAlive(true);
  // req.socket.setNoDelay(true); //创建 TCP 连接时，它将启用 Nagle 算法, Nagle 的算法在数据通过网络发送之前延迟数据。 它试图以延迟为代价来优化吞吐量
  // req.socket.setTimeout(0); //当空闲超时被触发时，套接字将收到 'timeout' 事件，但连接不会被切断。 用户必须手动调用 socket.end() 或 socket.destroy() 才能结束连接。如果 timeout 为 0，则禁用现有空闲超时。
  res.writeHead(200, {
    "Content-Type": "text/event-stream; charset=utf-8",
    // "Transfer-Encoding": "identity", // 用于指代自身（例如：未经过压缩和修改）。除非特别指明，这个标记始终可以被接受。
    // "Cache-Control": "no-cache",
    // Connection: "keep-alive",
  });
  // res.flushHeaders();
  sse.pipe(res);
  sse._transform = (message, encoding, callback) => {
    if (message.comment) sse.push(`: ${message.comment}\n`);
    if (message.event) sse.push(`event: ${message.event}\n`);
    if (message.id) sse.push(`id: ${message.id}\n`);
    if (message.retry) sse.push(`retry: ${message.retry}\n`);
    if (message.data) sse.push(dataString(message.data));
    sse.push("\n");
    callback();
  };
});
app.post("/releaseDynamics", (req, res) => {
  const { content } = req.body;
  const message = {
    data: { name: "blanca", content },
    event: "dynamicUpdate", // 事件类型，需要客户端添加对应的事件监听
    id: ++contentId,
    retry: 10000, // 告诉客户端,如果断开连接后,10秒后再重试连接
  };
  console.log(message)
  sse?.write(message);
  res.send("发布成功");
});
app.listen(3000, () => {
  console.log("server open in 3000");
});
