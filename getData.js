const whoiser = require('whoiser');
const fs = require('fs');

(async () => {
  try {
    let domaininfo = whoiser.allTlds;
    let domaininfo2 = await whoiser.domain('blog.google.com', { host: 'whois.nic.google', follow: 1 });

    let data = await whoiser.allTlds();
    for (let domain of data) {
      try {
        let domainMetaData = await whoiser(domain);
        let csvData = `${domainMetaData.contacts.administrative.name}, ` +
          `${domainMetaData.contacts.administrative.organisation}, ` +
          `${domainMetaData.contacts.administrative['e-mail']}, ` +
          `${domainMetaData.contacts.administrative.phone}.\n\n`;

        fs.appendFile('data.csv', csvData, (err) => {
          if (err) throw err;
          console.log('Data appended to data.csv');
        });

        console.log('===========================');
      } catch (err) {
        console.error('Error retrieving domain metadata:', err);
      }
    }

    console.log('======================');
    console.log('======================');
    console.log(domaininfo2);
  } catch (err) {
    console.error('Error:', err);
  }
})();
