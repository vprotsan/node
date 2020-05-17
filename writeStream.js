const { createWriteStream, createReadStream } = require('fs')

const readStream = createReadStream('./powder-day.mp4')
const writeStream = createWriteStream('./copy.mp4')


readStream.on('data', (chunk) => {
  writeStream.write(chunk)
})

readStream.on('end', ()=> {
  writeStream.end()
})

readStream.on('error', (error) => {
  console.log('error occured')
  console.error(error)
})

writeStream.on('close', () => {
  process.stdout.write('file copied\n')
})
