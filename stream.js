//when running this file
// node --trace_gc buffer.js
// --trace_gc - will trace garbage collection on this

const fs = require('fs');
const http = require('http')
const file = 'powder-day.mp4';

http.createServer((req, res) => {

  res.writeHeader(200, {'Content-type' : 'video/mp4'})
  fs.createReadStream(file)
    .pipe(res)
    .on('error', console.error)
}).listen(3000, ()=> console.log('buffer - localhost:3000'))
