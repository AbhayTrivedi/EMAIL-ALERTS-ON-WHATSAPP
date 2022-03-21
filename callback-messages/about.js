var accountSid = process.env.ACCOUNT_SID;
var authToken = process.env.ACCOUNT_TOKEN;

const client = require('twilio')(accountSid, authToken, {
   lazyLoading: true
});

// Function to send message to WhatsApp
const aboutMessage = async (senderID) => {
      try {
         await client.messages.create({
            from: `whatsapp:+14155238886`,
            body: 'Hello there, welcome to Email alerts on Whatsapp.\n\n' + 
                  'This is a minor college project made by Abhay Trivedi (20001016002) and ' +
                  'Geetika Dua (20001016017) of B.tech Computer Engineering with Specialization ' +
                  'in Data Science (3rd Semester) under the guidance of Dr.Payal Gulati.\n' +
                  'Department of Computer Enginnering\nJ.C. Bose University of Science and ' +
                  'Technology, YMCA',
            to: senderID
         });
      } catch (error) {
         console.log(`Error at sendMessage --> ${error}`);
      }
};

module.exports = {
   aboutMessage
};
