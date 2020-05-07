// function hideString(string){
//   return string.replace(/[a-zA-Z]/g, "X")
// }
//
// let hidden = hideString("Hello Worlds")
//
// console.log(hidden);
// console.log('end')


//Continuation passing method:
//this code is stilloperating synchronously
// function hideString(string, done){
//   done(string.replace(/[a-zA-Z]/g, "X"))
// }
// hideString("Hello Worlds", hidden => {
//   console.log(hidden);
// })
// console.log('end')


//ASYNCHRONOUSLY
// function hideString(string, done){
//   process.nextTick(() => {
//     done(string.replace(/[a-zA-Z]/g, "X"))
//   })
// }
// hideString("Hello Worlds", hidden => {
//   console.log(hidden);
// })
// console.log('end')


//Sequential execution of callbacks
//also callback hell or pyramid of doom
// function delay(seconds, callback){
//   setTimeout(callback, seconds*1000)
// }
// console.log('start delays')
// delay(2, () => {
//   console.log('two sec delay');
//   delay(1, ()=> {
//     console.log('three sec delay');
//     delay(1, () => {
//       console.log('four sec delay');
//     })
//   })
// })

//PROMISE is an object that can represent an eventual completion of asynchronous operation
// let delay = (seconds) => new Promise((results, rejects) => {
//   // throw new Error('arg')
//   if (seconds > 3) {
//     rejects(new Error(`${seconds} is too long`))
//   }
//   setTimeout(results, seconds*1000)
// })
//
// delay(2)
//   .then(()=> console.log('delay has passed'))
//   .then(() => 42)
//   .then(number => console.log(`${number}`))
//   //use CATCH to handle error
//   .catch(error => console.log(error.message))
//
// console.log('End first tick')

//Both promises and callbacks can be handles within node
// let delay = (seconds, callback) => {
//   if (seconds > 3){
//     callback(new Error(`${seconds} is too long`))
//   } else {
//     setTimeout(()=>
//       callback(null, `the ${seconds} delay is over`),
//       seconds
//     )
//   }
// }
//
// delay(4, (error, message) => {
//   if (error){
//     console.log(error.message)
//   } else {
//     console.log(message)
//   }
// })

//Convert callback functions into promises:
//promisify - is a callback function which can turn callbacks into promises
const { promisify } = require('util');
const fs = require('fs')  //file system module

let delay = (seconds, callback) => {
  if (seconds > 3){
    callback(new Error(`${seconds} is too long`))
  } else {
    setTimeout(()=>
      callback(null, `the ${seconds} delay is over`),
      seconds
    )
  }
}

// delay(4, (error, message) => {
//   if (error){
//     console.log(error.message)
//   } else {
//     console.log(message)
//   }
// })
//below we turned above function into promise
// let promisDelay = promisify(delay)
//
// promisDelay(2)
//   .then(console.log(`the delay is over`))
//   .catch((error) => {new Error(`is too long`)})

let writeFile = promisify(fs.writeFile)
writeFile('sample.txt', 'test text')
  .then(() => console.log('file successfully created'))
  .catch((error) => console.log('error creating file'))
