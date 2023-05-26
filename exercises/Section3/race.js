// Async usage

/* Synchro
let animals = ["🐰", "🐼"];
animals.map( a => {
    console.log(`${a} finishes!`)
})
*/
let animals = ["🐰", "🐼"];

animals.map( a => {
    let r = parseInt(Math.random()*1000);
    console.log(`${a} time to run : ${r}`);
    setTimeout(() => console.log(`${a} finishes!`), r);
})