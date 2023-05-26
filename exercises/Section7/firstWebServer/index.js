const http = require('http');
const { isNumberObject } = require('util/types');

const PORT = 5050;

const friends = [
    {
        id: 0,
        name: 'Nikola Tesla',
    },
    {
        id: 1,
        name: 'Sir Isaac Newton',
    },
    {
        id: 2,
        name: 'Albert Einstein',
    },
]

const server = http.createServer();
server.on('request', (req, res) => {
    console.log(req.url);
    const items = req.url.split('/');

    if( items[1] === 'friends' ) {
        console.log(items.length);
        if( items.length === 3 && !isNaN(items[2]) ) {
            if( friends.length > items[2] ) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(friends[items[2]]));
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ 'error': 'Friend not found', 'errorCode': 404 }));
            }
        } else if ( items.length === 2 ) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(friends));
        }
        else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('No friends found...');
        }
    } else if ( items[1] === 'messages' ) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
        });
        res.write('<html>');
        res.write('<body>');
        res.write('<ul>');
        res.write('<li>Hello Isaac!</li>');
        res.write('<li>What are your thoughts on astronomy</li>');
        res.write('</ul>');
        res.write('</body>');
        res.write('</html>');
        res.end();
    } else { 
        res.writeHead(404, {
            'Content-Type': 'text/plain',
        });
        res.end("PAGE NOT FOUND");
    }
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
