// 'var' keyword is used to declare variables globally.
// 'let' keyword is used to declare variables only in the scope they are declared in.
// This is useful because you don't want to have variables colliding in different scopes, you don't
// want to overwrite variables and you want to follow the encapsullation and abstraction OOP concepts.

// The next example uses 'let'.
// Running the script returns an error because I try to log the variable out of its scope.

{
    {
        let x = 2;
        console.log(x);
    }
    
    // ERROR:
    // console.log(x);
}

// The next example uses 'var'.
// The code is identical, the only difference being that the variable is declare as 'var'.

{
    {
        var x = 2;
    }
    
    console.log(x);
}

// You can't also redeclare it as a new object in memory with the same name.
// You have to use the same variable and change its value. This way you avoid memory leaks.

{
    let a = 0;
    a = 1;

    // ERROR:
    // let a = 0;
    // let a = 1;
}

{
    var a = 0;
    var a = 1;
}