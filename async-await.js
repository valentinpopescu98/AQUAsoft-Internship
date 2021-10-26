// Promise that triggers after an interval using async-await instead of promise.then:

async function asyncFunction() {
    let promise = new Promise((resolve) => {
        setTimeout(() => {
            resolve("Success");
        }, 1000);
    });
  
    let result = await promise;
  
    console.log(result);
}

asyncFunction();