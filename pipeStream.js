// const { createWriteStream, createReadStream } = require('fs')
//
// const readStream = createReadStream('./powder-day.mp4')
// //here we can decide our water pressure, out watermark
// //setting high water pressure lets you use more computer memory
// const writeStream = createWriteStream('./copy.mp4')
//
// //pipe method automatically handles pressure for us
// readStream.pipe(writeStream).on('error', console.error)




// const { createWriteStream } = require('fs')
// const writeStream = createWriteStream('./file.txt')
//
// process.stdin.pipe(writeStream)




const { Duplex, PassThrough } = require('stream')
const { createWriteStream, createReadStream } = require('fs')

const readStream = createReadStream('./powder-day.mp4')
const writeStream = createWriteStream('./copy2.mp4')

class Throttle extends Duplex {
  constructor(ms){
    super()
    this.delay = ms
  }

  _read(){}

  _write(chunk, encoding, callback){
    this.push(chunk)
    setTimeout(callback, this.delay)
  }

  _final(){
    this.push(null)
  }
}

const report = new PassThrough();
const throttle = new Throttle(100)

var total = 0
report.on('data', (chunk) => {
  total += chunk.length
  console.log('bytes: ', total)
})

readStream
  .pipe(throttle)
  .pipe(report)
  .pipe(writeStream)
