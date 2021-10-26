// Sort ascendingly:

{
    const arr = [5, 4, 3, 2, 1];
    console.log(arr.sort());
}

// Adds element at the beggining of the array:

{
    const arr = [5, 4, 3, 2, 1];
    arr.unshift(0);
    console.log(arr);
}

// Removes element at the begging of the array:

{
    const arr = [5, 4, 3, 2, 1];
    arr.shift();
    console.log(arr);
}

// Adds element at the end of the array:

{
    const arr = [5, 4, 3, 2, 1];
    arr.push(0);
    console.log(arr);
}

// Removes element at the end of the array:

{
    const arr = [5, 4, 3, 2, 1];
    arr.pop();
    console.log(arr);
}

// Removes arg1 numbers of elements starting at the arg0 index,
// and optionally replaces them with the arg2 element, if specified.

{
    const arr = [5, 4, 3, 2, 1];
    arr.splice(0, 2, 'replacement');
    console.log(arr);
}

// Reverse array.

{
    const arr = [5, 4, 3, 2, 1];
    arr.reverse();
    console.log(arr);
}

// Changes elements of array into the element specified by arg0,
// from arg1 to (arg2 - 1).

{
    const arr = [5, 4, 3, 2, 1];
    arr.fill('x', 1, 3);
    console.log(arr);
}

// Calls a function specified by arg0 for each element in an array.

{
    const arr = [5, 4, 3, 2, 1];
    arr.forEach(element => console.log(element));
}