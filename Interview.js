// If you have questions about the Promise API, you can reference MDN
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

/**
 * promiseSettle
 *
 * returns a `Promise` that is fulfilled when all promises in `input`
 * are settled (meaning, either resolved or rejected).
 *
 * The fulfillment value will be an array of objects,
 * each having the following signature:
 *
 * @typedef {Object} Settlement
 * @property {boolean} isFulfilled - whether the promise resolved
 * @property {boolean} isRejected - whether the promise rejected
 * @property {*=} value - the value (if any) with which the promise
 *     was resolved
 * @property {*=} reason - the reason (if any) with which the promise
 *     was rejected
 *
 * @param {Array.<Promise.<*>>} input - an array of Promises
 * @return {Promise.<Array.<Settlement>>}
 */

//below i used async await to make sure all the promises are resolved 
async function promiseSettle (input) {
  // ...
  let result =[]
  await input.map((item)=>{
    let isFulfilled = false;
    let isRejected = false;
    item.then((value)=>{
         result.push({
            isFulfilled : true,
            isRejected,
            value
        })     
    }).catch((reason)=>{
        result.push({
            isFulfilled,
            isRejected: true,
            reason
        })
    })  
  })
  return Promise.resolve(result)
  
}



let myFirstPromise = async() => {
  await Promise((resolve, reject) => {
  // We call resolve(...) when what we were doing asynchronously was successful, and reject(...) when it failed.
  // In this example, we use setTimeout(...) to simulate async code. 
  // In reality, you will probably be using something like XHR or an HTML5 API.
    setTimeout( function(){
    reject("Success!"); // Yay! Everything went well!
  }, 250);
})};
var promise1 = new Promise(function(resolve, reject) {
    reject('foo');
});
let testArray = [Promise.resolve("one"), Promise.reject("error 500"), Promise.resolve("three"), promise1, myFirstPromise()];

// below i wait for the promislse to resolve then loop through the value which should be an array of objects then i am finaly 
// just logging it to confirm the values 
promiseSettle(testArray).then(value => console.log(JSON.stringify(value)))

// 
/*
=> Promise<[{
  isFulfilled: true,
  isRejected: false,
  value: 42
},
{
  isFulfilled: false,
  isRejected: true,
  reason: "error 500"
}]
*/