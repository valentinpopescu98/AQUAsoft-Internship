// Promises are objects in ES6 that are either accomplished or not.
// To check for accomplishment you have 2 arguments - one for accomplishment, one for failure.
// When the promise is accomplished it triggers the accomplishment's method,
// and when it fails, it triggers the failure's method.
// The failure is in other words a maximum interval of time that the application waits
// in order to run the accomplishment.
//
// Promises are a kind of conditional logic, in that they are used for this purpose
// in asynchronous operations. You can't use 'if' statements in asynchronous logic
// because of the simple fact that asynchronous operations may or may not ever happen
// and waiting for a condition to accomplish halts the entire program.

// Regular promise based on a boolean:

{
    const inputVar = true;

    const promise = new Promise((resolve, reject) => {
        if (inputVar) {
            resolve('Success');
        }
        else {
            reject('Error');
        }
    });

    promise.then(msg => {
        console.log(msg);
    }).catch(err => {
        console.log(err);
    });
}

// Promise that triggers after an interval:

{
    const promise = new Promise(resolve => {
        setTimeout(() => {
            resolve('Success');
        }, 1000);
    });

    promise.then(msg => {
        console.log("Message: " + msg);
    }).catch(() => {
        console.log("Error");
    });
}