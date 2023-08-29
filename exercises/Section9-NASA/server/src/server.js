const http = require('http');
const mongoose = require("mongoose");

const app = require('./app');

const { loadPlanetsData } = require('./models/planets/planets.model');

const PORT = process.env.PORT || 8000;

const MONGO_URL = 'mongodb://localhost:27017/nasa';

const server = http.createServer(app);

mongoose.connection.on('open', () => {
    console.log(`Connected to database on %s`, MONGO_URL);
})

async function startServer() {
    await mongoose.connect(MONGO_URL);
    
    await loadPlanetsData();



    server.listen(PORT, () => {
        console.log(`Server started, listening on port ${PORT}...`);
    });
}

startServer();