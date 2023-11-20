import * as nodemailer from "nodemailer";
import { smtpConfig } from "../config/smtp";
import { Email } from "../types";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const SMTP_CONFIG = smtpConfig;

const transporter = nodemailer.createTransport({
  host: SMTP_CONFIG.host,
  port: SMTP_CONFIG.port,
  secure: false,
  auth: {
    user: SMTP_CONFIG.user,
    pass: SMTP_CONFIG.pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendEmail = async ({
  emailFrom,
  emailTo,
  subject,
  message,
}: Email): Promise<SMTPTransport.SentMessageInfo | null> => {
  try {
    const mailSent = await transporter.sendMail({
      text: message,
      from: emailFrom,
      to: emailTo,
      subject,
    });

    return mailSent;
  } catch (error) {
    console.error(error);
  }

  return null;
};
