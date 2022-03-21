const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

// Start the webapp
const webApp = express();

// Webapp settings
webApp.use(bodyParser.urlencoded({
    extended: true
}));

webApp.use(bodyParser.json());

// Server Port
const PORT = process.env.PORT;

// Home route
webApp.get('/', (req, res) => {
    res.send('Hello World!');
});

const WA = require('./callback-messages/callback-message');
const about = require('./callback-messages/about');

// Route for WhatsApp
webApp.post('/whatsapp', async (req, res) => {
    let message = req.body;
    let senderID = req.body.From;

    console.log(message);

    // Write a function to send message back to WhatsApp
    if(message.Body.toLowerCase() === 'check'){
        await WA.sendMessage('__check', senderID);
    }
    else if(message.Body.toLowerCase() === 'about'){
        await about.aboutMessage(senderID);
    }
    else{
        await WA.sendMessage('Welcome to Email Alerts on WhatsApp, ' + 
        'Please send "check" to check your emails.', senderID);
    }

});

// Start the server
webApp.listen(PORT, () => {
    console.log(`Server is up and running at ${PORT}`);
});

