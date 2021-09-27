// Maps are used to store data in a JSON form or dictionary-like structure.
// They can be declared with data, like in the next block of code:

{
    const arr = [
        ['x', 1],
        ['y', 2],
        ['z', 3]];
    
    const map = new Map(arr);
}

// They can also be declared empty and filled afterwards:

{
    const map = new Map();
    map.set('x', 0);
    map.set('y', 1);
    map.set('z', 2);

    const xKey = Array.from(map.keys())[0];
    const yKey = Array.from(map.keys())[1];
    const zKey = Array.from(map.keys())[2];
    
    console.log(xKey);
    console.log(map.get(xKey));

    console.log(yKey);
    console.log(map.get(yKey));

    console.log(zKey);
    console.log(map.get(zKey));
}