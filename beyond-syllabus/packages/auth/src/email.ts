import nodemailer from "nodemailer";
import { readEnvironment } from "@beyond-syllabus/validation";
import { AccessError } from "./errors";

export async function sendVerificationEmail(email: string, token: string): Promise<void> {
  const env = readEnvironment();
  if (env.NODE_ENV === "production" && !env.SMTP_HOST) throw new AccessError("EMAIL_UNAVAILABLE", 503, "Email verification is temporarily unavailable. Please try again shortly.");
  const link = new URL("/verify-email", env.USERS_URL);
  link.searchParams.set("token", token);
  const transport = nodemailer.createTransport({
    host: env.SMTP_HOST || "127.0.0.1",
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE,
    ...(env.NODE_ENV === "production" && !env.SMTP_SECURE ? { requireTLS: true } : {}),
    ...(env.SMTP_USER && env.SMTP_PASSWORD ? { auth: { user: env.SMTP_USER, pass: env.SMTP_PASSWORD } } : {}),
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
    disableFileAccess: true,
    disableUrlAccess: true,
  });
  try {
    const receipt = await transport.sendMail({
      from: env.SMTP_FROM,
      to: email,
      subject: "Verify your Beyond Syllabus email",
      text: `Verify your email to start using Beyond Syllabus.\n\n${link.toString()}\n\nThis single-use link expires in 24 hours. If you did not request this account, ignore this email.\n\nBeyond Syllabus is an independent learning platform and is not an official institutional platform.`,
    });
    if (!receipt.accepted?.length) throw new Error("Recipient rejected");
  } catch {
    throw new AccessError("EMAIL_UNAVAILABLE", 503, "We could not send your verification email. Please try registering again shortly.");
  } finally { transport.close(); }
}
