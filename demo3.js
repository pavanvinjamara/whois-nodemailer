const express = require("express");
const cron = require("node-cron");
const nodemailer = require("nodemailer");
const fs = require("fs");
const app = express();

// send email after 1 minute
cron.schedule("1 * * * *", function () {
  mailService();
});

async function mailService() {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "pavanvinjamara323@gmail.com",
      // use generated app password for gmail
      pass: "olttfcqrjqbkweum",
    },
  });

  let mailDetails = {
    from: "pavanvinjamara323@gmail.com",
    to: "vinjamaraharish323@gmail.com",
    subject: "Test Mail using Cron Job",
    text: "Node.js Cron Job Email Demo Test from Reflectoring Blog",
    attachments: [
      {
        filename: "data.csv",
        path: "data.csv",
      },
    ],
  };

  try {
    await mailTransporter.sendMail(mailDetails);
    console.log("---------------------");
    console.log("Email sent successfully");
  } catch (err) {
    console.log("Error occurred while sending email:", err);
  }
}

app.listen(3000, () => {
  console.log("Application listening.....");
});
