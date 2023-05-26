const { request, get } = require('https');

const req = request('https://www.google.com', (response) => {
    response.on('data', (chunk) => {
        console.log(`Got data chunk`);
        // console.log(`Data chunk: ${chunk}`);
    });
    response.on('end', () => {
        console.log('No more data...');
    });
});

req.end();

get('https://www.google.com', (res) => {
    res.on('data', (chunk) => {
        console.log('Got data...');
    });
    res.on('end', () => {
        console.log('No more data');
    })
});