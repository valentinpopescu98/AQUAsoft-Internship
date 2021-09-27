// Concatenate 2 iterable objects.

{
    let letters = ['a', 'b', 'c'];
    let numbers = [1, 2, 3];

    let concatenated = letters.concat(numbers);
    console.log(concatenated);
}

// Join an iterable object into a string with the specified character. Default is ',' .

{
    let letters = ['a', 'b', 'c'];
    let joined = letters.join('-');

    console.log(joined);
}

// Slice the iterable object into a smaller iterable object by index.
// This method includes the first argument and goes until before the second
// argument.

{
    let numbers = [0, 1, 2, 3, 4];
    let cut = numbers.slice(1, 3);

    console.log(cut);
}

// Returns the first index of the value found.

{
    let letters = ['a', 'b', 'c', 'b'];
    let firstIndex = letters.indexOf('b');

    console.log(firstIndex);
}

// Returns the last index of the value found.

{
    let letters = ['a', 'b', 'c', 'b'];
    let lastIndex = letters.lastIndexOf('b');

    console.log(lastIndex);
}