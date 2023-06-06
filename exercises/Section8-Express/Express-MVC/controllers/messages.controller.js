const messages = require('../models/messages.model');
const path = require('path');

function getMessages(req, res) {
    // res.send('<ul><li>Hello my friend</li></ul>');
    res.render('messages', {
        title: 'Messages to my Friends',
        friend: 'Albert Einstein',
        message: 'What are your thoughs on blach holes?'
    });
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