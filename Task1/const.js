// 'const' keyword is is used to declare constant values.
// The following block of code returns an error because I try to change the constant.

{
    const x = 1;
    
    // ERROR:
    // x = 2;
    console.log(x);
}

// 'const' scope is like 'let' in that it is available only in the block of code it is declared in.

{
    const a = 0;
    console.log(a);
}

// ERROR:
// console.log(a);