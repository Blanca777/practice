const path = require("path");
const express = require("express");
const app = express();
const port = 3000;
const options = {
  etag: false,
  lastModified: false,
  setHeaders(res, path, stat) {
    res.set("Cache-Control", "max-age=10");
  },
};
app.use(express.static(path.join(__dirname, "./public"), options));
app.set("etag", (body, encoding) => {
  console.log(123)
  // return generateHash(body, encoding); // consider the function is defined
});
app.get("/data", (req, res) => {
  res.json("asad");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
