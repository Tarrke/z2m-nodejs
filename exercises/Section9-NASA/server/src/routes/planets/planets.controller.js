const { getAllPlanets } = require('../../models/planets/planets.model');

const httpGetAllPlanets = function(req, res) {
    return res.status(200).json(getAllPlanets());
}

module.exports = {
    httpGetAllPlanets,
};