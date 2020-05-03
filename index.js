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
