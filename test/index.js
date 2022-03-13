const fs = require("fs");
const read = fs.createReadStream("./11.txt", { encoding: "utf-8" });
const write = fs.createWriteStream("./22.txt");
read.push('123')
read.on("data", (chunk) => {
  console.log(chunk);
});
read.push('444')