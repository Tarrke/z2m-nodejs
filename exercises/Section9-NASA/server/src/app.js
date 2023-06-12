const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const planetsRouter = require('./routes/planets/planets.router');
const launchesRouter = require('./routes/launches/launches.router');

const app = express();

/*
// dummy middleware for copy
app.use( (req, res, next) => {
    console.log('Request in');
    next();
    console.log('Request out');
});
*/

/*
// Logging middleware
let reqId = 0;
app.use( (req, res, next) => {
    const thisReq = ++reqId;
    const initTime = Date.now();
    console.log(`${thisReq}: ${req.method} ${req.url}`);
    next();
    const solveTime = Date.now()
    const solvedTime = solveTime - initTime;

    console.log(`${thisReq} - ${new Date().toLocaleString().replace(', ', ' ')} - ${req.ip} - ${req.method} ${req.url} - ${res.statusCode} - ${solvedTime} ms`);
});
*/


// Setting up CORS middleware
app.use(cors({
    origin: 'http://localhost:3001'
}));

app.use(morgan('combined'));

// We just deal with json
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// Loading our Routes
app.use(planetsRouter);
app.use(launchesRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;