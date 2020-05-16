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
// const { promisify } = require('util');
// const fs = require('fs')  //file system module
//
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

// let writeFile = promisify(fs.writeFile)
// writeFile('sample.txt', 'test text')
//   .then(() => console.log('file successfully created'))
//   .catch((error) => console.log('error creating file'))




var fs = require('fs');
var beep = () => process.stdout.write("\x07");
var { promisify } = require('util')
var writeFile = promisify(fs.writeFile)
var unlink = promisify(fs.unlink)
var delay = (seconds) => new Promise((resolve) => {
  setTimeout(resolve, seconds*1000)
})

// const doStuffSequentially = () => {
//     console.log('starting');
//     setTimeout(() => {
//         console.log('waiting');
//         setTimeout(() => {
//             console.log('waiting some more');
//             fs.writeFile('file.txt', 'Sample File...', error => {
//                 if (error) {
//                     console.error(error);
//                 } else {
//                     beep();
//                     console.log('file.txt created')
//                     setTimeout(() => {
//                         beep();
//                         fs.unlink('file.txt', error => {
//                             if (error) {
//                                 console.error(error);
//                             } else {
//                                 console.log('file.txt removed');
//                                 console.log('sequential execution complete');
//                             }
//                         })
//                     }, 3000)
//                 }
//             });
//         }, 2000)
//     }, 1000)
// }
// doStuffSequentially();

// const doStuffSequentially = () => Promise.resolve()
//   .then(() => console.log('starting'))
//   .then(() => delay(1))
//   .then(() => 'waiting')
//   .then(console.log)
//   .then(() => delay(2))
//   .then(() => 'waiting some more')
//   .then(console.log)
//   .then((result) => writeFile('file.txt', 'Sample file...'))
//   .then(beep)
//   .then(() => 'file.txt created')
//   .then(console.log)
//   .then(() => delay(3))
//   .then(beep)
//   .then(() => unlink('file.txt'))
//   .then(() => 'file.txt removed')
//   .then(console.log)
//   .catch(console.error)


const doStuffSequentially = async() => {
  console.log('starting')
  await delay(1)
  console.log('waiting')
  await delay(2)
  console.log('waiting some more')
  await writeFile('file.txt', 'sample text...')
  beep()
  console.log('file.txt created')
  await delay(3)
  beep()
  await unlink('file.txt')
  console.log('file.txt was removed')
}

doStuffSequentially()
