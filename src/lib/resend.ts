import { Resend } from "resend";

interface Env {
  RESEND_API_KEY: string;
  SENDER_EMAIL: string;
  SENDER_NAME?: string;
}

/**
 * Initialize Resend client
 */
function getResendClient(env: Env): Resend {
  return new Resend(env.RESEND_API_KEY);
}

/**
 * Generic email sender using Resend SDK
 */
async function sendEmail(
  env: Env,
  to: string,
  subject: string,
  htmlContent: string,
): Promise<{ success: boolean; message: string; data?: any }> {
  try {
    const resend = getResendClient(env);

    const data = await resend.emails.send({
      from: `${env.SENDER_NAME || "TodoAl Rojo"} <${env.SENDER_EMAIL || "onboarding@resend.dev"}>`,
      to: [to],
      subject: subject,
      html: htmlContent,
    });

    return {
      success: true,
      message: "Email sent successfully",
      data: data,
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

/**
 * Send password reset email
 */
async function sendResetPasswordEmail(
  env: Env,
  to: string,
  resetLink: string,
): Promise<{ success: boolean; message: string; data?: any }> {
  const subject = "Password Reset Request";
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Password Reset</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .button {
          display: inline-block;
          background-color: #007cba;
          color: white;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 4px;
          margin: 20px 0;
        }
        .footer { margin-top: 30px; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Password Reset Request</h2>
        <p>You recently requested to reset your password for your Todo-Rojo account.</p>
        <p>Please click the button below to reset your password:</p>
        <a href="${resetLink}" class="button">Reset Your Password</a>
        <p>If the button doesn't work, copy and paste this link into your browser:</p>
        <p><a href="${resetLink}">${resetLink}</a></p>
        <p>If you did not request a password reset, please ignore this email.</p>
        <p><strong>This link will expire in 1 hour.</strong></p>
        <div class="footer">
          <p>This is an automated message from Todo-Rojo. Please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail(env, to, subject, htmlContent);
}

/**
 * Send signup verification email
 */
async function sendSignupEmail(
  env: Env,
  to: string,
  username: string,
  verificationLink: string,
): Promise<{ success: boolean; message: string; data?: any }> {
  const subject = "Welcome to Todo-Rojo! Please Verify Your Email";
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Welcome to Todo-Rojo</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .button {
          display: inline-block;
          background-color: #28a745;
          color: white;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 4px;
          margin: 20px 0;
        }
        .footer { margin-top: 30px; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Welcome to Todo-Rojo!</h2>
        <p>Hello ${username},</p>
        <p>Welcome to Todo-Rojo! We're excited to have you on board.</p>
        <p>Please verify your email address by clicking the button below:</p>
        <a href="${verificationLink}" class="button">Verify Your Email Address</a>
        <p>If the button doesn't work, copy and paste this link into your browser:</p>
        <p><a href="${verificationLink}">${verificationLink}</a></p>
        <p><strong>This link will expire in 24 hours.</strong></p>
        <p>Thank you for joining Todo-Rojo!</p>
        <div class="footer">
          <p>This is an automated message from Todo-Rojo. Please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail(env, to, subject, htmlContent);
}

/**
 * Send email with React components (optional - if you want to use React)
 */
async function sendEmailWithReact(
  env: Env,
  to: string,
  subject: string,
  reactElement: React.ReactElement,
): Promise<{ success: boolean; message: string; data?: any }> {
  try {
    const resend = getResendClient(env);

    const data = await resend.emails.send({
      from: `${env.SENDER_NAME || "Todo-Rojo"} <${env.SENDER_EMAIL}>`,
      to: [to],
      subject: subject,
      react: reactElement,
    });

    return {
      success: true,
      message: "Email sent successfully",
      data: data,
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

// Cloudflare Workers handler example
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    try {
      const { type, ...data } = (await request.json()) as any;

      let result;
      switch (type) {
        case "reset-password":
          result = await sendResetPasswordEmail(env, data.to, data.resetLink);
          break;
        case "signup":
          result = await sendSignupEmail(
            env,
            data.to,
            data.username,
            data.verificationLink,
          );
          break;
        case "custom":
          result = await sendEmail(
            env,
            data.to,
            data.subject,
            data.htmlContent,
          );
          break;
        default:
          return new Response("Invalid email type", { status: 400 });
      }

      return new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" },
        status: result.success ? 200 : 500,
      });
    } catch (error) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid request format",
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 400,
        },
      );
    }
  },
};

export {
  sendEmail,
  sendEmailWithReact,
  sendResetPasswordEmail,
  sendSignupEmail,
};
