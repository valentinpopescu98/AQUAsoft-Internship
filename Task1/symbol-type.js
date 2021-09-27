// Symbol is a data type used to add a property to an object without
// modifying the original class.
// It is accessed as map, so class[property], not class.property .

const individual = {
    name: 'Valentin',
    age: 23
};

const kg = Symbol('kg');
individual[kg] = 90;
console.log(individual[kg]);