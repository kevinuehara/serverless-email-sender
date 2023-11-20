import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { prismaClientDatabase } from "./config/db";
import { Email } from "./types";
import { sendEmail } from "./email";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const email = JSON.parse(event.body!) as Email;

  const { emailFrom, emailTo, subject, message } = email;

  try {
    const emailResponse = await sendEmail(email);

    if (emailResponse) {
      const result = await prismaClientDatabase.email.create({
        data: {
          emailFrom,
          emailTo,
          subject,
          message,
        },
      });

      return {
        statusCode: 200,
        body: JSON.stringify(result),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error on Send Message",
        details: error,
      }),
    };
  }

  return {
    statusCode: 500,
    body: JSON.stringify({
      message: "Error on Send Message",
    }),
  };
};
