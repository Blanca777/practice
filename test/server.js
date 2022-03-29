const express = require("express");
const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4000");
  // res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(express.static(__dirname));
app.get("/getdata", (req, res) => {
  res.setHeader("Set-Cookie", "server=server777;Max-Age=10;HttpOnly");
  res.setHeader("Cache-Control", "no-store");
  console.log(req.headers.cookie)
  res.json({
    name: "blanca",
  });
});
app.listen(3000, () => {
  console.log("open in 3000");
});
