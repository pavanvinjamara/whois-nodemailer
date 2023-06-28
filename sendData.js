const express = require("express");
const cron = require("node-cron");
const nodemailer = require("nodemailer");
const fs = require("fs");
const app = express();

//send email after 1 minute
cron.schedule("*/15 * * * * *", function () {
  mailService();
});

function mailService() {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "pavanvinjamara323@gmail.com",
      pass: "olttfcqrjqbkweum",
    },
  });

  // setting credentials
  let mailDetails = {
    from: "pavanvinjamara323@gmail.com",
    to: "vinjamaraharish323@gmail.com",
    subject: "Test Mail using Cron Job and sending ",
    text: "Node.js Cron Job Email Demo Test from Reflectoring Blog",
    attachments: [
      {
        filename: "data.csv",
        path: "data.csv",
      },
    ]
  };

  // sending email
  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("error occurred", err.message);
    } else {
      console.log("---------------------");
      console.log("email sent successfully");
    }
  });
}

app.listen(5000, () => {
  console.log("application listening on port 5000.....");
});
