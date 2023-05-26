const express = require('express');
const friendsController = require('../controllers/friends.controller');

const friendsRouter = express.Router();

friendsRouter.use((req, res, next) => {
    console.log(`ip address: ${req.ip}`);
    next();
});

friendsRouter.get ('/:friendId', friendsController.getFriend);
friendsRouter.get ('/',          friendsController.getFriends);
friendsRouter.post('/',          friendsController.addFriend);

module.exports = friendsRouter;