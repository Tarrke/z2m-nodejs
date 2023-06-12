// CSV Parser
const { parse } = require('csv-parse');
// To test the data
const assert = require('assert');
// Read the file from the HDD
const fs = require('fs');
const path = require('path');

// Can't reassign but can modify the contents...
// const result = [];
const habitablePlanets = [];

function isHabitablePlanet(planet) {
    return ( planet['koi_disposition'] === 'CONFIRMED'
        && ( planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11 )
        && ( (planet['koi_prad']  < 1.6) )
    );
}

/*
const promise = new Promise( (resolve, reject) => {

});
promise.then( () => {

});
const result = await promise;
console.log(result);
*/

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
        .on('data', (data) => {
            if( isHabitablePlanet(data) ) {
                habitablePlanets.push(data);
            }
        })
        // What to do at the end
        .on('end', () => {
            // console.log(result[0]);
            console.log(`planets.model: ${habitablePlanets.length} habitable planets found...`);
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

module.exports = {
    loadPlanetsData,
    planets: habitablePlanets 
};