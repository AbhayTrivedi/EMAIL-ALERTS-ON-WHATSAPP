const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.ACCOUNT_TOKEN;

const fetchMails = require('./mail');

const client = require('twilio')(accountSid, authToken, {
   lazyLoading: true
});

// Function to send message to WhatsApp
const sendMessage = async (message, senderID) => {
   console.log(message);
   if (message == '__check') {
      try {
         fetchMails().then(display => {
            client.messages.create({
               from: `whatsapp:+14155238886`,
               body: display,
               to: senderID
            });
         })
      } catch (error) {
         console.log(`Error at sendMessage --> ${error}`);
      }
   }
   else {
      try {
         await client.messages.create({
            from: `whatsapp:+14155238886`,
            body: message,
            to: senderID
         });
      } catch (error) {
         console.log(`Error at sendMessage --> ${error}`);
      }
   }
};

module.exports = {
   sendMessage
};
