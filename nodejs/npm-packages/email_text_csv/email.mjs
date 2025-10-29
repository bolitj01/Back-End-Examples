import { createTransport } from "nodemailer";

console.log(process.env.GMAIL_USER);
console.log(process.env.GMAIL_PASSWORD);

let service = "gmail";

const transporter = createTransport({
  service: service,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

transporter
  .verify()
  .then(() => console.log("✔ Email transporter ready"))
  .catch((err) => console.error("✖ Email transporter failed", err));

const mailOptions = {
  from: process.env.GMAIL_USER,
  to: "bolitj01@pfw.edu",
  subject: "Sending Email using Node.js",
  //text: 'That was easy!',
  html: "<h1>Wow</h1><p>That was easy!</p>",
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
