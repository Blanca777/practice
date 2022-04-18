const express = require("express");
const app = express();
app.get("/api/getdata", (req, res) => {
  console.log('有人调用getdata')
  res.setHeader('name','blanca')
  res.json({ name: "blanca" }).end();
});
app.listen(3000, () => {
  console.log("open in 3000");
});
