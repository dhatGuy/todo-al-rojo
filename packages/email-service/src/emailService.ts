import { google } from "googleapis";
import nodemailer from "nodemailer";

const CLIENT_ID: string = process.env.GOOGLE_MAIL_CLIENT_ID as string;
const CLIENT_SECRET: string = process.env.GOOGLE_CLIENT_MAIL_SECRET as string;
const REDIRECT_URI: string = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN: string = process.env.GOOGLE_MAIL_REFRESH_TOKEN as string;
const SENDER_EMAIL: string = process.env.SENDER_EMAIL as string;

if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN || !SENDER_EMAIL) {
  console.error(
    "Missing one or more environment variables for email service. Please ensure GOOGLE_MAIL_CLIENT_ID, GOOGLE_CLIENT_MAIL_SECRET, GOOGLE_MAIL_REFRESH_TOKEN, and SENDER_EMAIL are set.",
  );
  // It's good practice to throw an error or handle this more gracefully in a real application
  // For now, we'll let it potentially fail at runtime if not set, but log a warning.
}

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

/**
 * Sends an email using Nodemailer with Google OAuth2.
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} htmlContent - The HTML content of the email body.
 * @returns {Promise<Object>} - A promise that resolves with the result of the email sending operation.
 * @throws {Error} If there's an issue obtaining the access token or sending the email.
 */
async function sendEmail(
  to: string,
  subject: string,
  htmlContent: string,
): Promise<nodemailer.SentMessageInfo> {
  try {
    const accessTokenResponse = await oAuth2Client.getAccessToken();
    const accessToken = accessTokenResponse.token;

    if (!accessToken) {
      throw new Error("Failed to retrieve access token from Google OAuth2.");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: SENDER_EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: `"${SENDER_EMAIL}" <${SENDER_EMAIL}>`,
      to: to,
      subject: subject,
      html: htmlContent,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", result.response);
    return result;
  } catch (error: any) {
    console.error("Error sending email:", error.message);
    console.error("Detailed error:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

/**
 * Sends a reset password email.
 * @param {string} to - The recipient's email address.
 * @param {string} resetLink - The URL for resetting the password.
 * @returns {Promise<nodemailer.SentMessageInfo>} - A promise that resolves with the result of the email sending operation.
 */
async function sendResetPasswordEmail(
  to: string,
  resetLink: string,
): Promise<nodemailer.SentMessageInfo> {
  const subject = "Password Reset Request";
  const htmlContent = `
        <p>You recently requested to reset your password for your account.</p>
        <p>Please click on the following link to reset your password:</p>
        <p><a href="${resetLink}">Reset your password</a></p>
        <p>If you did not request a password reset, please ignore this email.</p>
        <p>This link will expire in [X minutes/hours, specify as needed].</p>
    `;
  return sendEmail(to, subject, htmlContent);
}

/**
 * Sends a signup verification email.
 * @param {string} to - The recipient's email address.
 * @param {string} username - The username of the new user.
 * @param {string} verificationLink - The URL for verifying the account.
 * @returns {Promise<nodemailer.SentMessageInfo>} - A promise that resolves with the result of the email sending operation.
 */
async function sendSignupEmail(
  to: string,
  username: string,
  verificationLink: string,
): Promise<nodemailer.SentMessageInfo> {
  const subject = "Welcome to Todo-Rojo! Please Verify Your Email";
  const htmlContent = `
        <p>Hello ${username},</p>
        <p>Welcome to Todo-Rojo! We're excited to have you on board.</p>
        <p>Please verify your email address by clicking the link below:</p>
        <p><a href="${verificationLink}">Verify Your Email Address</a></p>
        <p>This link will expire in [X minutes/hours, specify as needed].</p>
        <p>Thank you!</p>
    `;
  return sendEmail(to, subject, htmlContent);
}

export { sendEmail, sendResetPasswordEmail, sendSignupEmail };
