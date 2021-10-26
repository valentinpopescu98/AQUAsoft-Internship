// Use JSON to make the object a string and then parse it into a deep copy.

const individual = {
    name: 'Valentin',
    age: 23
};

const valentin = JSON.parse(JSON.stringify(individual));

console.log(individual);
console.log(valentin);