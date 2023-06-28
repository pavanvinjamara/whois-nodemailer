const express = require("express");
const cron = require("node-cron");
const nodemailer = require("nodemailer");
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
// use generated app password for gmail
      pass: "olttfcqrjqbkweum",
    },
  });

  // setting credentials
  let mailDetails = {
    from: "pavanvinjamara323@gmail.com",
    to: "vinjamaraharish323@gmail.com",
    subject: "Test Mail using Cron Job",
    text: "Node.js Cron Job Email Demo Test from Reflectoring Blog",
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

app.listen(3000, () => {
  console.log("application listening.....");
});
