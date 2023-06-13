const express = require('express');

const {httpGetAllPlanets} = require('./planets.controller');

const planetsRouter = express.Router();

// This is after /planets

planetsRouter.get('/', httpGetAllPlanets);

module.exports = planetsRouter;