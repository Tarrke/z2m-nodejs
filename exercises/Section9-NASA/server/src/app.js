const express = require('express');
const cors = require('cors');

const planetsRouter = require('./routes/planets/planets.router');

const app = express();

/*
// dummy middleware for copy
app.use( (req, res, next) => {
    console.log('Request in');
    next();
    console.log('Request out');
});
*/

// Logging middleware for copy
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

// Setting up CORS middleware
app.use(cors({
    origin: 'http://localhost:3001'
}));

// We just deal with json
app.use(express.json());

// Loading our Routes
app.use(planetsRouter);

module.exports = app;