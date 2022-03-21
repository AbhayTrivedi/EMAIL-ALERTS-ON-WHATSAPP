const imaps = require('imap-simple');
const _ = require('lodash');

async function fetchMails() {
   const config = {
      imap: {
         user: process.env.email,
         password: process.env.password,
         host: 'imap.gmail.com',
         port: 993,
         tls: true,
         authTimeout: 10000,
         tlsOptions: { rejectUnauthorized: false }
      }
   };

   let display = "";

   await imaps.connect(config).then(function (connection) {
      return connection.openBox('INBOX').then(function () {
         const searchCriteria = ['UNSEEN'];
         const fetchOptions = {
            bodies: ['HEADER', 'TEXT'],
         };

         return connection.search(searchCriteria, fetchOptions).then(function (messages) {
            const subjects = messages.map(function (res) {
               return res.parts.filter(function (part) {
                  return part.which === 'HEADER';
               })[0].body.subject[0];
            });

            // console.log(subjects);

            const from = messages.map(function (res) {
               return res.parts.filter(function (part) {
                  return part.which === 'HEADER';
               })[0].body.from[0];
            });

            // console.log(from);

            const body = [];
            messages.forEach(function (item) {
               const all = _.find(item.parts, { "which": "TEXT" });
               // const html = (Buffer.from(all.body, 'base64').toString('ascii'));

               const needle = 'Content-Type: text/plain; charset="UTF-8"';
               const re = new RegExp(needle, 'gi');

               let result = 4;
               while (re.exec(all.body)) {
                  result += re.lastIndex;
               }
               body.push(all.body.substring(result, result + 50));
            });
            
            for (let i = 0; i < subjects.length; i++) {
               display += 'From: ' + from[i] + '\nSubject: ' + subjects[i] +
                  '\nMessage: ' + body[i] + '...\n\n';
            }

         });
      });
   });

   return display;
}


module.exports = fetchMails;
