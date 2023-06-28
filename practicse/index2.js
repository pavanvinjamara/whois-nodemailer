const whoiser = require('whoiser');
const fs = require('fs');
const express = require("express");
const cron = require("node-cron");
const nodemailer = require("nodemailer");
const app = express();

(async () => {
  try {
    let domaininfo = whoiser.allTlds;
    let domaininfo2 = await whoiser.domain('blog.google.com', { host: 'whois.nic.google', follow: 1 });

    let data = await whoiser.allTlds();
    let csvDataArray = []; // Array to store the CSV data

    for (let domain of data) {
      try {
        let domainMetaData = await whoiser(domain);
        let csvData = `${domainMetaData.contacts.administrative.name},` +
          `${domainMetaData.contacts.administrative.organisation},` +
          `${domainMetaData.contacts.administrative['e-mail']},` +
          `${domainMetaData.contacts.administrative.phone}`;

        csvDataArray.push(csvData); // Add CSV data to the array

        cron.schedule("*/20 * * * * *", function () {
          mailService(csvDataArray);
        });

        function mailService(dataArray) {
          let mailTransporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "pavanvinjamara323@gmail.com",
              // use generated app password for gmail
              pass: "olttfcqrjqbkweum",
            },
          });

          // setting credentials
          let mailDetails = {
            from: "pavanvinjamara323@gmail.com",
            to: "sunkojusuryateja@gmail.com",
            subject: "Test Mail using Cron Job",
            html: generateHTMLTable(dataArray), // Use the generated HTML table
          };

          // sending email
          mailTransporter.sendMail(mailDetails, function (err, data) {
            if (err) {
              console.log("Error occurred:", err.message);
            } else {
              console.log("---------------------");
              console.log("Email sent successfully");
            }
          });
        }

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

function generateHTMLTable(dataArray) {
  let htmlTable = `<table style="border-collapse: collapse; width: 100%;">
                      <thead>
                          <tr>
                              <th>Name</th>
                              <th>Organisation</th>
                              <th>Email</th>
                              <th>Phone</th>
                          </tr>
                      </thead>
                      <tbody>`;

  for (let csvData of dataArray) {
    let [name, organisation, email, phone] = csvData.split(',');
    htmlTable += `<tr>
                      <td>${name}</td>
                      <td>${organisation}</td>
                      <td>${email}</td>
                      <td>${phone}</td>
                  </tr>`;
  }

  htmlTable += `</tbody></table>`;

  return `
    <html>
      <head>
        <style>
          table {
            border-collapse: collapse;
            width: 100%;
          }
          th, td {
            padding: 8px;
            text-align: left;
            border-bottom: 1px solid #ddd;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <h2>Domain Contacts Information</h2>
        ${htmlTable}
      </body>
    </html>
  `;
}

app.listen(3000, () => {
  console.log("Application listening.....");
});
