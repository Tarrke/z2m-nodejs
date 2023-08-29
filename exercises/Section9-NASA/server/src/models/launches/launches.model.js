const { default: mongoose } = require('mongoose');
const launches = require('./launches.mongo');

const launches_by_id = new Map();

let latestFlightNumber = 0;



const launch = {
    flightNumber: 100,
    launchDate: new Date('December 27, 2022'),
    mission: "Kepler exploration X",
    rocket: "Explorer IS1",
    target: "Kepler-442 b",
    customers: ["NASA","TKC Corp"],
    upcoming: true,
    success: true,
}

const launch_2 = {
    flightNumber: 99,
    launchDate: new Date('December 27, 2022'),
    mission: "Kepler exploration X",
    rocket: "Explorer IS1",
    target: "Kepler-442 b",
    customers: ["NASA","TKC Corp"],
    upcoming: false,
    success: true,
}

const launch_3 = {
    flightNumber: 101,
    launchDate: new Date('December 27, 2030'),
    mission: "Kepler exploration X",
    rocket: "Explorer IS1",
    target: "Kepler-442 b",
    customers: ["NASA","TKC Corp"],
    upcoming: false,
    success: false,
}

// Some launch to populate some data...
addNewLaunch(launch);
addNewLaunch(launch_2);
addNewLaunch(launch_3);

async function getAllLaunches() {
    /*
    return Array.from(launches_by_id.values()).sort((a, b) => {
        return a.flightNumber - b.flightNumber;
    });
    */
    const l = await launches.find({}, {'__v': 0, '_id': 0 });
    return Array.from(l.values()).sort( (a,b) => {
        return a.flightNumber - b.flightNumber;
    });
}

async function addNewLaunch(launch) {
    const ll = (await launches.findOne({}).sort('-flightNumber').exec());
    const nfn = ll?ll.flightNumber:0;
    const newFN = launch.flightNumber?launch.flightNumber:nfn+1;
    const newUp =  launch.upcoming!=null?launch.upcoming:true;

    launch = Object.assign(launch, {
        flightNumber: newFN,
        customer: ['TKC Corp', 'NASA'],
        upcoming: newUp,
    });

    try {
        await launches.updateOne({
            flightNumber: launch.flightNumber,
        },
        launch, {
            upsert: true
        });
    } catch(err) {
        console.error(`Could not save the launch: ${err}.`);
    }
}

async function existsLaunchWithId(launchId) {
    // return launches_by_id.has(launchId);
    if( await launches.findOne({flightNumber: launchId}) ) {
        console.log(`found the launch ${launchId}`);
        return true;
    }
    console.log(`not found the launch ${launchId}`);
    return false;
}

async function abortLaunchById(id) {
    const aborted = await launches.findOne({flightNumber: id});
    console.log(aborted);
    aborted.upcoming = false;
    aborted.success = false;
    await launches.deleteOne({flightNumber: id});

    return aborted;
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    abortLaunchById,
    existsLaunchWithId,
};