const express = require('express');
const fs = require('fs');
const dotenv = require('dotenv')

const friendsRouter = require('./routes/friends.route');
const messagesRouter = require('./routes/messages.route');

// Loading config
const configFile = fs.readFileSync('app.conf', 'utf8');
const config = {};
const lines = configFile.split('\n');
for( const line of lines ) {
    const parts = line.trim().split('=');
    if( parts.length === 2 ) {
        const key = parts[0].trim();
        const value = parts[1].trim();
        config[key] = value;
        // console.log(key);
    }
}
dotenv.config({
    path: 'app.conf',
    debug: true,
    encoding: 'utf8',
    override: true,
    values: config,
});

// Getting our configuration values from process.env
const PORT = process.env["app.port"];
const apiKey = process.env['app.apiKey'];
// Global variables
let reqId = 0;

// Our Express server
const app = express();

// Logging Middlware
app.use((req, res, next) => {
    const requestId = ++reqId;
    const start = Date.now();
    console.log(`${requestId}: ${req.method} ${req.url}`);
    next();
    console.log(`${requestId}: done in ${Date.now() - start} ms.`);
});

// JSON parsing middleware
app.use(
    express.json()
);

// Routes
// Handy work
// app.get('/friends/:friendId', friendsController.getFriend);
// app.get('/friends', friendsController.getFriends);
// app.post('/friends', friendsController.addFriend);

// app.get('/messages',  messagesController.getMessages);
// app.post('/messages', messagesController.postMessage);

// With Router, work done in /routes/x.route.js
app.use('/friends', friendsRouter);
app.use('/messages', messagesRouter);

app.listen( PORT, () => {
    console.log(`Listenning on ${PORT}...`);
    console.log(`API Key: ${apiKey}`);
});

