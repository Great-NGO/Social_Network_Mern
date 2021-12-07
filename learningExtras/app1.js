const fs = require('fs');
const fileName = "target.txt";

// //Event loop - watch
// fs.watch(fileName, () => {
//     console.log(`File Changed!`)
// } )

// //ILLUSTRATION OF ASYNCHRONOUS PROGRAMMING
// fs.readFile(fileName, (err, data) => {
//     if(err) {
//         console.log(err)
//     }
//     else{
//         console.log(data.toString());
//     }
// });
// console.log("Node is Async programming ... ?");

//  //ILLUSTRATION OF SYNCHRONOURS PROGRAMMING - Blocking Code
// const data = fs.readFileSync(fileName)
// console.log(data.toString());
// console.log("\nNode is Async programming ... ?\n");


// FUNCTIONAL APPROACH
const errHandler = (err) => console.log(err);
const dataHandler = (data) => console.log(data.toString());

fs.readFile(fileName, (err, data) => {
    if (err) {
        errHandler(err);
    }
    else{
        dataHandler(data);
    }
});
console.log("\nNode is Async programming ... ?\n");


