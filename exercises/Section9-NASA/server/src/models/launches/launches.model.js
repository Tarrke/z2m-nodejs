const launches_by_id = new Map();
const launches_by_name = new Map();

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
    success: true,
}

// TODO: remove this and load the data from the fs
addPastLaunch(launch, true);
addPastLaunch(launch_2, false);
addNewLaunch(launch_3);

function getAllLaunches() {
    return Array.from(launches_by_id.values()).sort((a, b) => {
        return a.flightNumber - b.flightNumber;
    });
}

function addPastLaunch(launch, success) {
    ++latestFlightNumber;
    launches_by_id.set(latestFlightNumber, Object.assign(launch, { 
        flightNumber: latestFlightNumber,
        customer: ['TKC Corp', 'NASA'],
        upcoming: false,
        success: success,
    }));    
}

function addNewLaunch(launch) {
    ++latestFlightNumber;
    launches_by_id.set(latestFlightNumber, Object.assign(launch, { 
        flightNumber: latestFlightNumber,
        customer: ['TKC Corp', 'NASA'],
        upcoming: true,
        success: true,
    }));
    launches_by_name.set(launch.mission,    Object.assign(launch, { 
        flightNumber: latestFlightNumber,
        customer: ['TKC Corp', 'NASA'],
        upcoming: true,
        success: true,
    }));
}

function existsLaunchWithId(launchId) {
    return launches_by_id.has(launchId);
}

function abortLaunchById(id) {
    const aborted = launches_by_id.get(id);
    aborted.upcoming = false;
    aborted.success = false;

    // return launches_by_id.delete(id);
    return aborted;
}

module.exports = {
    //launches_by_id,
    //launches_by_name,
    getAllLaunches,
    addNewLaunch,
    abortLaunchById,
    existsLaunchWithId,
};