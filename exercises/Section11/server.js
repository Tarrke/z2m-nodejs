const express = require('express')

const app = express();

function delay(duration) {
    const startTime = Date.now();
    while( Date.now() - startTime < duration ) {
        // Do nothing
    }
}

app.use( (req, res, next) => {
    console.log(`Got request ${req.url}`);
    next();
    console.log(`${req.url} done`);
})

app.get('/', (req, res) => {
    res.send('Performance example');
});

app.get( '/timer', (req, res) => {
    delay(9000);
    res.send('Ding Ding Ding !!')
})

app.listen(5000, () => {
    console.log('Serveur listening on port 5000');
})