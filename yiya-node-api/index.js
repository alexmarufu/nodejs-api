const http = require('http');

http.get('http://www.omdbapi.com/?i=tt3896198&apikey=f4b5a74f', (res) => {

  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log(JSON.parse(data));
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});