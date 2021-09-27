// Returns 'true' if the values is a safe integer.

console.log(Number.isSafeInteger(10));
console.log(Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1));
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1));