// CSV Parser
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

const planets = require("./planets.mongo");

function isHabitablePlanet(planet) {
    return ( planet['koi_disposition'] === 'CONFIRMED'
        && ( planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11 )
        && ( (planet['koi_prad']  < 1.6) )
    );
}

// Read the data in file as a stream
function loadPlanetsData() {
    console.log('planets.model: loading data from csv file');
    return new Promise( (resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', '..', 'data', 'kepler_data.csv'))
        // Pipe to get the output of the file reader to the input
        // of the csv parser
        .pipe(parse({
            delimiter: ',',
            comment: '#',
            columns: true,
            //to_line: 157,
        }))
        // What to do on data
        .on('data', async (data) => {
            if( isHabitablePlanet(data) ) {
                // habitablePlanets.push(data);
                // update + insert = upsert
                // console.log(`Found habitable planet: %s`, data.kepler_name);
                savePlanet(data);
            }
        })
        // What to do at the end
        .on('end', async () => {
            // console.log(result[0]);
            const countPlanetsFound = (await getAllPlanets()).length
            console.log(`planets.model: ${countPlanetsFound} habitable planets found...`);
            console.log('planets.model: done loading planets');
            resolve();
        })
        // Error treatment
        .on('error', (err) => {
            console.log(err);
            reject(err);
        });
    });
}

async function getAllPlanets() {
    // return habitablePlanets;
    return await planets.find({}, {
        '__v': 0,
        '_id': 0,
    });
}

async function savePlanet(planet) {
    try {
        await planets.updateOne({
            keplerName: planet.kepler_name,
        }, {
            keplerName: planet.kepler_name,
        }, {
            upsert: true,
        });
    } catch(err) {
        console.error(`Could not save planet ${err}.`);
    }

}

module.exports = {
    loadPlanetsData,
    getAllPlanets,
};