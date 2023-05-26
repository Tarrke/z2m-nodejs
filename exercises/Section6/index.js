// CSV Parser
const { parse } = require('csv-parse');
// To test the data
const assert = require('assert');
// Read the file from the HDD
const fs = require('fs');

// Can't reassign but can modify the contents...
// const result = [];
const habitablePlanets = [];

function isHabitablePlanet(planet) {
    return ( planet['koi_disposition'] === 'CONFIRMED'
        && ( planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11 )
        && ( (planet['koi_prad']  < 1.6 && planet['koi_prad']  > 0.5) )
    );
}

// Read the data in file as a stream
fs.createReadStream('kepler_data.csv')
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
        console.log(`${habitablePlanets.length} habitable planets found...`);
        console.log(habitablePlanets.map((planet) => {
            return { 
                name: planet['kepler_name'], 
                score: planet['koi_score'],
                temp: planet['koi_teq'] - 273.15,
            };
        }));
        console.log('done');
    })
    // Error treatment
    .on('error', (e) => {
        console.log(e);
    })
    ;

/*
const parser = parse({
    delimiter: ',',
    from_line: 1,
    to_line: 10,
})

let records = [];

parser.on('readable', () => {
    let record;
    while( (record = parser.read()) !== null ) {
        records.push(record);
        console.log("Read one line");
    }
});
*/