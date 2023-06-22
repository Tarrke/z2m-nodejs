const { 
    getAllLaunches, 
    addNewLaunch, 
    abortLaunchById, 
    existsLaunchWithId 
} = require('../../models/launches/launches.model');

function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches());
}

function httpPostLaunch(req, res) {
    let launch = req.body;

    // check the inputs
    if( !launch.mission || !launch.rocket || !launch.launchDate || !launch.target ) {
        return res.status(400).json({
            error: 'Missing launch property'
        });
    }

    // change the date to a fucking date
    launch.launchDate = new Date(launch.launchDate)
    if( isNaN(launch.launchDate) ) {
        // This is not a date
        return res.status(400).json({
            error: 'Invalid Launch Date.'
        });
    }

    // Call the addNewLaunch function
    addNewLaunch(launch);
    return res.status(201).json(launch);
}

function httpDeleteLaunch(req, res) {
    const id = parseInt(req.params.id);

    if( isNaN(id) || id < 0 ) {
        return res.status(400).json({
            error: 'Passed id is not an id. Should be a postive number.'
        });
    }

    if( !existsLaunchWithId(id) ) {
        return res.status(404).json({
            error: `Flight with id ${id} not found.`
        });
    }

    const aborted = abortLaunchById(id);
    return res.status(200).json(aborted);
}

module.exports = { 
    httpGetAllLaunches,
    httpPostLaunch,
    httpDeleteLaunch,
};