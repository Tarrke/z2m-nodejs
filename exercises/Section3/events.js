const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter;

const normalEvent = 'event';

myEmitter.on(normalEvent, (result) => {
    if( !result ) {
        console.log(`Observer1: ${normalEvent} has no data with it...`);
    } else {
        console.log(`Observer1: I see ${normalEvent} from Emitter! => ${result}`);
    }
});

myEmitter.on(normalEvent, (result) => {
    if( !result ) {
        console.log(`Observer2: ${normalEvent} has no data with it...`);
    } else {
        console.log(`Observer2: I see ${normalEvent} from Emitter! => ${result}`);
    }
});

myEmitter.emit(normalEvent, "addentum");
myEmitter.emit(normalEvent);

process.on('beforeExit', (code) => {
    console.log(`Process exiting with code ${code}`);
});

process.on('exit', (code) => {
    console.log("Process exited.");
});