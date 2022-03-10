//server1.js
let express = require("express");
let app = express();
app.use(express.static(__dirname));
// fetch("http://localhost:4000/getData", (res) => {
//   console.log(res);
// });
app.listen(3000);
