const express = require('express');
const fs = require('fs');
const dotenv = require('dotenv')

// const PORT = 5050;

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

// console.log(process.env);

const PORT = process.env["app.port"];
const apiKey = process.env['app.apiKey'];

const app = express();

const friends = [
    {
        id: 0,
        name: 'Sir Isaac Newton'
    },
    {
        id: 1,
        name: 'Albert Einstein',
    },
];

// middleware logics...
/*
app.use((req, res, next) => {
    // Do something with req...
    console.log("something happens");
    next();
    // Do something with res...
    console.log("something happens");
})

app.use((req, res, next) => {
    console.log("something happens 2");
    next();
    console.log("something happens 2");
})
*/

let reqId = 0;

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

app.post('/friends', (req, res) => {
    if( ! req.body.name ) {
        return res.status(400).json({
            error: 400,
            label: 'The friend needs to have a name',
        });
    }

    const newFriend = {
        name: req.body.name,
        id: friends.length,
    };
    friends.push(newFriend);
    res.json(newFriend);
});

app.get('/friends', (req, res) => {
    res.json(friends);
});

app.get('/friends/:friendId', (req, res) => {
    const friendId = Number(req.params.friendId);
    const friend = friends[friendId];
    if( friend ) {
        res.json(friends[friendId]);
    } else {
        res.status(404).json({
            error: 404,
            label: `Friend ${friendId} does not exists...`,
        });
    }
});

app.get('/messages', (req, res) => {
    res.send('<ul><li>Hello my friend</li></ul>');
});

app.post('/messages', (req, res) => {
    console.log('Updating messages...');
});

app.listen( PORT, () => {
    console.log(`Listenning on ${PORT}...`);
    console.log(`API Key: ${apiKey}`);
});

