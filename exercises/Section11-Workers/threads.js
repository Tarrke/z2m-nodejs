const { Worker, workerData, isMainThread } = require('worker_threads');

if ( isMainThread ) {
    console.log(`Main thread reporting for duty on ${process.pid}.`)
    new Worker(__filename, {
        workerData: [7, 6, 2, 3, 15, 12, 29, 54, 34, 77, 88]
    });
    new Worker(__filename, {
        workerData: [1, 3, 4, 3]
    });
} else {
    console.log(`Worker reporting for duty on ${process.pid}.`);
    const sorted = workerData.sort((a, b) => a - b)
    console.log(sorted);
}