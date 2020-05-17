const { createWriteStream, createReadStream } = require('fs')

const readStream = createReadStream('./powder-day.mp4')
//here we can decide our water pressure, out watermark
//setting high water pressure lets you use more computer memory
const writeStream = createWriteStream('./copy.mp4', {
  // highWaterMark: 1628920
})


readStream.on('data', (chunk) => {
  const result = writeStream.write(chunk)
  if (!result){
    console.log('backpressure')
    readStream.pause()
  }
})

readStream.on('end', ()=> {
  writeStream.end()
})

readStream.on('error', (error) => {
  console.log('error occured')
  console.error(error)
})

writeStream.on('drain', ()=>{
  console.log('drained')
  readStream.resume()
})

writeStream.on('close', () => {
  process.stdout.write('file copied\n')
})
