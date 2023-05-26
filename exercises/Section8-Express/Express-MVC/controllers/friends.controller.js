const friendModel = require('../models/friends.model')
const views = require('../views/friends.view');

function addFriend(req, res) {
    if( ! req.body.name ) {
        return res.status(400).json({
            error: 400,
            label: 'The friend needs to have a name',
        });
    }

    const newFriend = {
        name: req.body.name,
        id: friendModel.length,
    };
    friendModel.push(newFriend);
    res.json(views.getFriendView(newFriend));
}

function getFriends(req, res) {
    res.json(friendModel);
}

function getFriend(req, res) {

    const friendId = Number(req.params.friendId);
    const friend = friendModel[friendId];
    if( friend ) {
        res.json(friendModel[friendId]);
    } else {
        res.status(404).json({
            error: 404,
            label: `Friend ${friendId} does not exists...`,
        });
    }
}

module.exports = {
    getFriend,
    getFriends,
    addFriend,
}