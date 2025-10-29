/**
 * Example to send text messages via email-to-text gateways
 * using a CSV file with phone numbers and carriers.
 */
import { createTransport } from "nodemailer";
import { createReadStream } from "fs";
import { parse } from "csv-parse";

const inputFile = "phone_numbers.csv";
let toList = ""; // To build list of email addresses converted from phone numbers

const parser = parse({ delimiter: "," }, function (err, data) {
  let number, carrier, address, i;

  if (err) {
    console.log(err);
  } else {
    for (i = 0; i < data.length; i++) {
      number = data[i][1];
      carrier = data[i][2];
      address = "";

      if (carrier == "AT&T") address = number + "@txt.att.net";
      else if (carrier == "Sprint")
        address = number + "@messaging.sprintpcs.com";
      else if (carrier == "T-Mobile") address = number + "@tmomail.net";
      else if (carrier == "Verizon") address = number + "@vtext.com";
      else console.log("wrong carrier: " + carrier);

      if (address !== "") {
        if (toList === "") toList = address;
        else toList += ", " + address;
      }
    }
    console.log(toList);

    const transporter = createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: toList,
      subject: "", // Subject is usually ignored for texts
      text: 'Here is a text from my server!',
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Texts sent: " + info.response);
      }
    });
  }
});

createReadStream(inputFile).pipe(parser);
