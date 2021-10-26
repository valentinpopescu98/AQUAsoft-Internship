// Sets are used to store unique data.
// They can be declared with data, like in the next block of code:

{
    const arr = [1, 2, 2, 3, 1, 0, 4, 5, 4, 7];
    const set = new Set(arr);

    console.log(set);
}

// They can also be declared empty and filled afterwards:

{
    const set = new Set();
    set.add(1);
    set.add(2);
    set.add(2);
    set.add(3);
    set.add(1);
    set.add(0);
    set.add(4);
    set.add(5);
    set.add(4);
    set.add(7);

    console.log(set);
}