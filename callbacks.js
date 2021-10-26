// Callbacks are methods that are passed as arguments to another methods.

function writeLog(text) {
    console.log(text);
}

function doubleNumber(number) {
    return number * 2;
}

writeLog(doubleNumber(5));