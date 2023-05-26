const messages = require('../models/messages.model');

function getMessages(req, res) {
    // res.send('<ul><li>Hello my friend</li></ul>');
    res.send(messages);
};

function postMessage(req, res) {
    console.log('Updating messages...');
    const newMessage = {
        message: req.body.message,
        id: messages.length,
    }
    messages.push(newMessage);
    res.json(newMessage);
}

module.exports = {
    getMessages,
    postMessage,
};