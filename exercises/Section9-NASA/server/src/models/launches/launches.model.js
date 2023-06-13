const launches_by_id = new Map();
const launches_by_name = new Map();

const launch = {
    flightNumber: 100,
    launchDate: new Date('December 27, 2030'),
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
    launchDate: new Date('December 27, 2022'),
    mission: "Kepler exploration X",
    rocket: "Explorer IS1",
    target: "Kepler-442 b",
    customers: ["NASA","TKC Corp"],
    upcoming: false,
    success: true,
}

launches_by_id.set(launch_3.flightNumber, launch_3);
launches_by_name.set(launch_3.mission_name, launch_3);

launches_by_id.set(launch_2.flightNumber, launch_2);
launches_by_name.set(launch_2.mission_name, launch_2);

launches_by_id.set(launch.flightNumber, launch);
launches_by_name.set(launch.mission_name, launch);



module.exports = {
    launches_by_id,
    launches_by_name,
};