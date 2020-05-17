const fs = require('fs');

const readStream = fs.createReadStream('./powder-day.mp4')

readStream.on('data', (chunk) => {
  // console.log('reading chunk\n', chunk)
  console.log('size: ', chunk.length)
})

//readStream flowing mode
readStream.on('end', ()=> {
  console.log('read stream finished')
})

readStream.on('error', (error) => {
  console.log('error occured')
  console.error(error)
})

readStream.pause()

process.stdin.on('data', (chunk)=>{
  // var text = chunk.toString().trim()
  // console.log('echo :', text)
  if(chunk.toString().trim() === 'finish'){
    readStream.resume()
  }
  readStream.read()
})
