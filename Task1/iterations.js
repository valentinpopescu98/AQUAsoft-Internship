// Iterate using for/of:

{
    const hex = ['0', '1', '2', '3', '4', '5'];

    console.log('Iterate using for/of:');
    for (const element of hex) {
        console.log(element);
    }
}

// Ierate using for:

{
    const hex = ['0', '1', '2', '3', '4', '5'];

    console.log('Iterate using for loop:');
    for (let i = 0; i < hex.length; i++) {
        console.log(hex[i]);
    }
}

// Iterate using for each:

{
    const hex = ['0', '1', '2', '3', '4', '5'];

    console.log('Iterate using for each:');
    hex.forEach(element => console.log(element));
}