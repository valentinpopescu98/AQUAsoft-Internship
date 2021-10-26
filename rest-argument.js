// Rest argument is an argument of a method that has ambiguous length.
// You can have none or how many arguments you need.
// The actual number is determined when you call the method.

function product(...args) {
    let product = 1;
    for(const arg of args) {
        product *= arg;
    }

    return product;
}

console.log(product(1, 2, 3, 4, 5));