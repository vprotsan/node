//when running this file
// node --trace_gc buffer.js
// --trace_gc - will trace garbage collection on this

const fs = require('fs');
const http = require('http')
const file = 'powder-day.mp4';

http.createServer((req, res) => {
  fs.readFile(file,(error,data) => {
    if (error){
      console.log('mmm', error)
    }
    res.writeHeader(200, {'Content-Type': 'video/mp4'})
    res.end(data)
  })
}).listen(3000, ()=> console.log('buffer - localhost:3000'))
