// server2.js(http://localhost:4000)
const http = require('http');
const data = { title: 'fontend', password: '123456' };
const server = http.createServer((request, response) => {
  if (request.url === '/') {
    let body = [];
    request.on('data', function (chunk) {
      body.push(chunk);
    });
    request.on('end', function () {
      let result = Buffer.concat(body);
      let data = {};
      let temp = result.toString();
      console.log(typeof temp);
      temp.split('&').map((item) => {
        let arr = item.split('=')
        data[arr[0]] = arr[1]
      });
      console.log(data);
    });
    response.end(JSON.stringify(data));
  }
});
server.listen(4000, () => {
  console.log('The server is running at http://localhost:4000');
});
