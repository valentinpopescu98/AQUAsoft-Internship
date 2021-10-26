// Returns the first element that passes the condition.

const hex = ['0', '1', '2', '3', '4', '5', '6',
'7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

console.log(hex.find(found => found.match('[a-z]'))); // first letter encountered