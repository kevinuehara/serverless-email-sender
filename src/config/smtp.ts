import "dotenv/config";

export const smtpConfig = {
  host: "smtp.gmail.com",
  port: 587,
  user: "ueharaDev.kevin@gmail.com",
  pass: process.env.PASSWORD_EMAIL,
};
