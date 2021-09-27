// You can run a method, return its result and manipulate it, all at the same time
// using arrow functions.

{
    const method = (arg) => {
        let res = arg*arg
        return res
    };

    console.log(method(5));
}

// You can also do this and skip the parantheses for the argument if you have only an argument,
// and also skip the braces if you have only a single line of code.
// You also don't have to write semicolons in the code block.

{
    const method = arg => arg*arg;
    
    console.log(method(4));
}