// Closures are used to make global variables local.
// We can access the 'counter' variable here by returning and updating
// the variable at the same time. This way, every call will make a change
// based on the last change of the variable. 

const add = (() => {
    let counter = 0;
    return () => {
        counter += 1;
        return counter;
    }
})();
  

// Incremment 9 times.
for(let i = 0; i < 9; i++) {
    add();
}

// Increment 10th time and write log.
console.log(add());