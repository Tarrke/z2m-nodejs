const { launches_by_id } = require('../../models/launches/launches.model');

function getAllLaunches(req, res) {

    return res.status(200).json(Array.from(launches_by_id.values()));
}

module.exports = { 
    getAllLaunches, 
};