// Creates an array with the keys of a map or any iterable object.

const hex = ['0', '1', '2', '3', '4', '5', '6',
'7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

// for (let x of hex.keys()) {
//     console.log(x);
// }

console.log(Array.from(hex.keys()));