// sendEmail.js
import nodemailer from "nodemailer";
import { generateResetPasswordTemplate } from "./generateResetPasswordTemplate.js";
import { generateVerifyEmailTemplate } from "./generateVerifyEmailTemplate.js";
// import S3 from "aws-sdk/clients";
export const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  // 2) Define the email options
  const mailOptions = {
    from: "Jonas Schmedtmann<[email protected]>",
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };
  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};
