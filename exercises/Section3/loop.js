// Try to understand variables and callbacks

/*
function printAnimals( animals ) {
    animals.map( a => {
        console.log(a);
    })
}

let animals = ["🐰", "🐼"];

setTimeout(() => {printAnimals(animals);
    }
    , 100);

printAnimals(animals);

animals.push("🐬");
*/

let events = [];

function processEvents(events) {
    events.map(e => console.log(e));
}

let shouldExit = false;

/*
setTimeout(() => {
    shouldExit = true;
    console.log("We should exit the loop");
}, 3000);
*/

function sleep(ms) {
    return new Promise((resolve) => {
        console.log(`start sleeping for ${ms} ms`);
        setTimeout(resolve, ms);
    });
}

async function init() {
    /*
    setTimeout(() => {
        while(!shouldExit) {
            processEvents(events);
            // console.log("loop ended");
        }
    }, 1);
    */
    console.log("here");
    await sleep(2000).then(() => console.log("done waiting..."));
    await sleep(1000).then(() => console.log("done waiting..."));
    console.log("there");
}

init();